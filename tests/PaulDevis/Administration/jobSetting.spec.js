import { test, expect } from '../../../fixtures/sharedFixtures.js';
import JobSettingPage from '../../../pageObjects/enterprise/administrationFG/jobSetting.po.js';

test('Job Settings Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const jobSettingPage = new JobSettingPage(page);

  // Navigate to Job Settings page from Administration menu
  await jobSettingPage.navigateToJobSettings();

  // Verify Catastrophe section header is visible
  await expect(await jobSettingPage.verifyCatastropheHeaderVisible()).toBeVisible();
});
