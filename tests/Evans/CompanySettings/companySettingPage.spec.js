import { test } from '../../../fixtures/sharedFixtures.js';
import EnterpriseCompanySettingPage, {
  EnterpriseCompanySettingLocators,
} from '../../../pageObjects/enterprise/companySetting/enterpriseCompanySetting.po.js';

test('Verify Company Setting Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const companySettingPage = new EnterpriseCompanySettingPage(page);

  // Step 1: Navigate to Company Settings page
  await companySettingPage.navigateToCompanySettings();

  // Step 2: Assert Accounting Logo card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.accountingLogoCard,
    EnterpriseCompanySettingLocators.accountingLogoHeader,
    'Accounting',
  );

   // Step 8: Assert Email Distribution card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.emailDistributionCard,
    EnterpriseCompanySettingLocators.emailDistributionHeader,
    'E-mail Distribution List',
  );

    // Step 16: Assert Standard Note card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.standardNoteCard,
    EnterpriseCompanySettingLocators.standardNoteHeader,
    'Standard Note',
  );

   // Step 13: Assert Notifications card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.notificationsCard,
    EnterpriseCompanySettingLocators.notificationsHeader,
    'Notifications',
  );

});
