import { test as base } from '@playwright/test';
import { config } from '../config/environment.config.js';
import EnterpriseLoginPage from '../pageObjects/enterprise/loginPage/enterpriseLoginPage.po.js';
import { setupWalkMeRemoval, setupNavigationWalkMeRemoval } from '../utils/walkmeRemover.js';

/**
 * Shared fixture for All Environments - Provides an authenticated page context
 * Automatically determines storage state based on test project name
 * PARALLEL-SAFE: Each worker gets isolated notification handling
 */
export const test = base.extend({
  authenticatedPage: async ({ page }, use, testInfo) => {
    // Determine storage state path based on project name
    const projectName = testInfo.project.name.toLowerCase();
    const storageStatePath = `.auth/${projectName}.json`;
    const projectToConfigKey = {
      servicemaster: 'service_master',
      firstgeneral: 'first_general',
      pauldevis: 'paul_devis',
      evans: 'evans',
    };
    const configKey = projectToConfigKey[projectName];
    const envConfig = configKey
      ? config.environments[configKey]
      : { enterprise: config.enterprise };

    console.log(
      `🔧 Using storage state: ${storageStatePath} for project: ${testInfo.project.name}`,
    );

    // Navigate to base URL to activate the storage state session
    await page.goto(envConfig.enterprise.baseUrl, { timeout: 500000 });
    await page.waitForLoadState('networkidle');

    // Check if we're on login page (case-insensitive, with URL + form-field fallback)
    const currentUrl = page.url();
    const isLoginUrl = /login\.aspx/i.test(currentUrl);
    const isPostLoginUrl = /upostlogin\.aspx/i.test(currentUrl);
    const hasLoginForm = await page
      .locator('#txtDashId, #txtUserName, #txtPassword, #btnLogIn')
      .first()
      .isVisible()
      .catch(() => false);
    const isOnLoginPage = (isLoginUrl && !isPostLoginUrl) || hasLoginForm;

    if (isOnLoginPage) {
      console.log(`⚠ ${testInfo.project.name} session expired or invalid, re-authenticating...`);

      // Re-authenticate
      const enterpriseLoginPage = new EnterpriseLoginPage(page, envConfig.enterprise);
      await enterpriseLoginPage.login(
        envConfig.enterprise.credentials.companyId,
        envConfig.enterprise.credentials.username,
        envConfig.enterprise.credentials.password,
      );

      // Save new auth state to project-specific file
      await page.context().storageState({ path: storageStatePath });
      console.log(`✓ ${testInfo.project.name} re-authentication successful`);
    }

    // 🔧 Remove WalkMe overlays with continuous monitoring
    await setupWalkMeRemoval(page);
    setupNavigationWalkMeRemoval(page);

    // Now page is authenticated and ready to use
    await use(page);
  },
});

export { expect } from '@playwright/test';
