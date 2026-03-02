import { test } from '../../../fixtures/sharedFixtures.js';
import RankMarketingPage from '../../../pageObjects/enterprise/Marketing/ranks.po.js';

test('Ranks Page validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const rankMarketingPage = new RankMarketingPage(page);

  // Navigate to Ranks page via menu
  await rankMarketingPage.navigateToRankMarketing();

  // Assertions using POM methods
  await rankMarketingPage.assertPageLabel();
  await rankMarketingPage.assertBackToDashboardButton();
  await rankMarketingPage.assertAddNewRecordButton();
  await rankMarketingPage.assertGridHeaders(['Rank', 'Rank Description', 'Delete']);
  await rankMarketingPage.assertExportToExcelButton();
  await rankMarketingPage.assertExportToPDFButton();
});
