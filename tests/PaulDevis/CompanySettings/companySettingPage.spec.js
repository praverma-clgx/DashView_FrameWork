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

  // Step 3: Assert Change Logo card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.changeLogoCard,
    EnterpriseCompanySettingLocators.changeLogoHeader,
    'Change Logo',
  );

  // Step 4: Assert Company Display Name card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.companyDisplayNameCard,
    EnterpriseCompanySettingLocators.companyDisplayNameHeader,
    'Company Display Name',
  );

  // Step 5: Assert Compensation Plans card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.compensationPlansCard,
    EnterpriseCompanySettingLocators.compensationPlansHeader,
    'Compensation Plans',
  );

  // Step 6: Assert Create Survey card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.createSurveyCard,
    EnterpriseCompanySettingLocators.createSurveyHeader,
    'Create Survey',
  );

  // Step 7: Assert Data Import Tool card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.dataImportToolCard,
    EnterpriseCompanySettingLocators.dataImportToolHeader,
    'Data Import Tool',
  );

    // Step 13: Assert Notifications card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.notificationsCard,
    EnterpriseCompanySettingLocators.notificationsHeader,
    'Notifications',
  );
});
