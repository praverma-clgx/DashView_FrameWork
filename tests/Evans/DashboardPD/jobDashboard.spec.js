import { test, expect } from '../../../fixtures/sharedFixtures.js';
import JobDashboardPage from '../../../pageObjects/enterprise/dashboardPD/jobDashboard.po.js';

test('Job Dashboard Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const jobDashboardPage = new JobDashboardPage(page);

  // Navigate to Job Dashboard page
  await jobDashboardPage.navigateToJobDashboard();

  // Assert page heading
  await jobDashboardPage.assertPageHeading();

  // Click on each tile and verify navigation
  await jobDashboardPage.clickOpenJobsTile();
  await jobDashboardPage.clickPendingSalesTile();
  await jobDashboardPage.clickPreProductionTile();
  await jobDashboardPage.clickWorkInProgressTile();
  await jobDashboardPage.clickCompletedWithoutPaperworkTile();
  await jobDashboardPage.clickInvoicePendingTile();
  await jobDashboardPage.clickAccountsReceivableTile();
  await jobDashboardPage.clickWaitingForFinalClosureTile();

  // Assert filter labels are visible
  await jobDashboardPage.assertFilterLabelsVisible();
});
