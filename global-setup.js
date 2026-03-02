import { chromium } from '@playwright/test';
import { config } from './config/environment.config.js';
import { browserConfig } from './config/browser.config.js';
import EnterpriseLoginPage from './pageObjects/enterprise/loginPage/enterpriseLoginPage.po.js';
import fs from 'fs';

// Define the authentication configurations for all environments
const allAuthConfigs = [
  {
    name: 'ServiceMaster',
    authPath: '.auth/servicemaster.json',
    configKey: 'service_master'
  },
  {
    name: 'FirstGeneral',
    authPath: '.auth/firstgeneral.json',
    configKey: 'first_general'
  },
  {
    name: 'PaulDevis',
    authPath: '.auth/pauldevis.json',
    configKey: 'paul_devis'
  },
  {
    name: 'Evans',
    authPath: '.auth/evans.json',
    configKey: 'evans'
  }
];

/**
 * Determine which projects are being run based on command line arguments and environment variables
 * @returns {Array} Array of project names being executed
 */
function getActiveProjects() {
  // First check for explicit project environment variables (highest priority)
  const explicitProjects = process.env.PLAYWRIGHT_PROJECTS;
  if (explicitProjects) {
    const projects = explicitProjects.split(',').map(p => p.trim());
    console.log(`🎯 Using PLAYWRIGHT_PROJECTS env var: ${projects.join(', ')}`);
    return projects;
  }

  // Check for single project environment variable
  const singleProject = process.env.PLAYWRIGHT_PROJECT;
  if (singleProject) {
    console.log(`🎯 Using PLAYWRIGHT_PROJECT env var: ${singleProject}`);
    return [singleProject];
  }

  // Check TEST_ENV and map it to the corresponding project (second priority)
  const testEnv = process.env.TEST_ENV;
  if (testEnv) {
    const envToProjectMap = {
      'first_general': 'FirstGeneral',
      'paul_devis': 'PaulDevis', 
      'service_master': 'ServiceMaster',
      'evans': 'Evans'
    };
    
    const mappedProject = envToProjectMap[testEnv];
    if (mappedProject) {
      console.log(`🎯 Using TEST_ENV (${testEnv}) mapped to project: ${mappedProject}`);
      return [mappedProject];
    }
  }

  // Parse command line arguments more carefully (third priority)
  const args = process.argv;
  const projects = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    // Handle --project=ProjectName
    if (arg.startsWith('--project=')) {
      const projectName = arg.split('=')[1];
      if (projectName && !projects.includes(projectName)) {
        projects.push(projectName);
      }
    }
    
    // Handle --project ProjectName
    if (arg === '--project' && i + 1 < args.length) {
      const projectName = args[i + 1];
      if (projectName && !projectName.startsWith('-') && !projects.includes(projectName)) {
        projects.push(projectName);
      }
    }
  }

  // If specific projects found, return them
  if (projects.length > 0) {
    console.log(`🎯 Parsed projects from command line: ${projects.join(', ')}`);
    return projects;
  }

  // Check if we're in a test-specific run (look for test file patterns)
  const testFileArgs = args.filter(arg => 
    arg.includes('.spec.js') || 
    arg.includes('/tests/') ||
    allAuthConfigs.some(config => arg.includes(config.name))
  );

  if (testFileArgs.length > 0) {
    // Try to infer project from test file paths
    const inferredProjects = [];
    testFileArgs.forEach(testArg => {
      allAuthConfigs.forEach(config => {
        if (testArg.includes(config.name) && !inferredProjects.includes(config.name)) {
          inferredProjects.push(config.name);
        }
      });
    });
    
    if (inferredProjects.length > 0) {
      console.log(`🎯 Inferred projects from test paths: ${inferredProjects.join(', ')}`);
      return inferredProjects;
    }
  }

  // Last resort: setup auth for all projects (but warn user)
  console.log(`⚠ No specific project detected from TEST_ENV, PLAYWRIGHT_PROJECT, or command line`);
  console.log(`💡 Set TEST_ENV to one of: first_general, paul_devis, service_master, evans`);
  console.log(`💡 Or set PLAYWRIGHT_PROJECT=ProjectName for explicit control`);
  return allAuthConfigs.map(config => config.name);
}

/**
 * Get auth configs for active projects only
 * @returns {Array} Filtered array of auth configurations
 */
function getAuthConfigs() {
  const activeProjects = getActiveProjects();
  console.log(`🎯 Detected active projects: ${activeProjects.join(', ')}`);
  
  return allAuthConfigs.filter(config => activeProjects.includes(config.name));
}

/**
 * Check if existing auth files are still valid
 * @param {string} authPath - Path to the auth file
 * @param {Object} envConfig - Environment configuration
 * @returns {Promise<boolean>} true if auth should be recreated, false if existing auth is valid
 */
async function shouldRecreateAuthFile(authPath, envConfig) {
  // If the file doesn't exist, recreate
  if (!fs.existsSync(authPath)) {
    return true;
  }

  // Validate auth file
  try {
    const testBrowser = await chromium.launch({ headless: true });
    const testContext = await testBrowser.newContext({
      storageState: authPath,
      ...browserConfig,
    });
    const testPage = await testContext.newPage();

    // Try to navigate to protected page
    await testPage.goto(envConfig.enterprise.baseUrl, { timeout: 15000 });

    // Check if we're still logged in (not redirected to login page)
    const currentUrl = testPage.url();
    const isLoggedIn = !currentUrl.includes('Login.aspx') && !currentUrl.includes('login');

    await testBrowser.close();

    // If not logged in, auth files are stale
    return !isLoggedIn;
  } catch (error) {
    // If validation fails, recreate auth
    console.log(`⚠ Auth validation failed for ${authPath}, recreating...`);
    return true;
  }
}

/**
 * Check if all existing auth files are still valid
 * @returns {Promise<Object>} Object with authPath as key and boolean as value indicating if recreation is needed
 */
async function shouldRecreateAuthFiles() {
  const results = {};
  const authConfigs = getAuthConfigs();
  
  for (const authConfig of authConfigs) {
    try {
      const envConfig = config.environments[authConfig.configKey];
      results[authConfig.authPath] = await shouldRecreateAuthFile(authConfig.authPath, envConfig);
    } catch (error) {
      console.log(`⚠ Error checking auth for ${authConfig.name}: ${error.message}`);
      results[authConfig.authPath] = true; // Recreate on error
    }
  }
  
  return results;
}

async function globalSetup() {
  const authConfigs = getAuthConfigs();
  
  if (authConfigs.length === 0) {
    console.log('⚠ No projects detected for authentication setup');
    return;
  }

  console.log(`🔐 Setting up authentication for: ${authConfigs.map(c => c.name).join(', ')}`);

  const authDir = '.auth';
  fs.mkdirSync(authDir, { recursive: true });

  // Check if existing auth files are valid
  const authRecreationNeeds = await shouldRecreateAuthFiles();

  for (const authConfig of authConfigs) {
    const shouldRecreate = authRecreationNeeds[authConfig.authPath];

    if (shouldRecreate) {
      console.log(`✓ Creating fresh authentication for ${authConfig.name}`);

      try {
        // Get environment-specific configuration
        const envConfig = config.environments[authConfig.configKey];
        
        // Setup authentication for this environment
        const browser = await chromium.launch();
        const context = await browser.newContext({
          ...browserConfig,
          storageState: undefined,
        });
        const page = await context.newPage();

        // Navigate directly to the environment-specific URL
        await page.goto(envConfig.enterprise.baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Use EnterpriseLoginPage for login functionality (it will use the already loaded page)
        const loginPage = new EnterpriseLoginPage(page);
        await loginPage.login(
          envConfig.enterprise.credentials.companyId,
          envConfig.enterprise.credentials.username,
          envConfig.enterprise.credentials.password,
        );

        // Login successful, save authentication state
        await context.storageState({ path: authConfig.authPath });
        await browser.close();

        console.log(`✓ ${authConfig.name} authentication saved to ${authConfig.authPath}`);
      } catch (error) {
        console.error(`❌ Failed to setup authentication for ${authConfig.name}: ${error.message}`);
        // Continue with other environments even if one fails
      }
    } else {
      console.log(`✓ Using existing valid authentication for ${authConfig.name}`);
    }
  }
  
  console.log(`✅ Authentication setup complete for ${authConfigs.length} project(s)`);
}

export default globalSetup;
