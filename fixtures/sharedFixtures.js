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
    
    console.log(`🔧 Using storage state: ${storageStatePath} for project: ${testInfo.project.name}`);

    // Navigate to base URL to activate the storage state session
    await page.goto(config.enterprise.baseUrl, { timeout: 500000 });
    await page.waitForLoadState('networkidle');

    // Check if we're on the actual login page (not post-login redirect)
    const currentUrl = page.url();
    const isOnLoginPage =
      currentUrl.includes('Login.aspx') && !currentUrl.includes('uPostLogin.aspx');

    if (isOnLoginPage) {
      console.log(`⚠ ${testInfo.project.name} session expired or invalid, re-authenticating...`);

      // Re-authenticate
      const enterpriseLoginPage = new EnterpriseLoginPage(page);
      await enterpriseLoginPage.login(
        config.enterprise.credentials.companyId,
        config.enterprise.credentials.username,
        config.enterprise.credentials.password,
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