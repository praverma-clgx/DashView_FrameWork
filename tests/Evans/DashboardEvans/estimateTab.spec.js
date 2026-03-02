import { test, expect } from '../../../fixtures/sharedFixtures.js';
import DashboardEstimateTabPage from '../../../pageObjects/enterprise/dashboardEvans/estimateTab.po.js';
import jobNumberData from '../../../testData/evans/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Estimate Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardEstimateTabPage = new DashboardEstimateTabPage(page);

  // Search for job by number
  await searchJobNumber(page, jobNumberData.jobNumber);

  // Navigate to Estimate tab
  await dashboardEstimateTabPage.navigateToEstimateTab();

  // Verify Refresh button is visible
  await expect(await dashboardEstimateTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await dashboardEstimateTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Estimate Number column header is visible
  await expect(
    await dashboardEstimateTabPage.verifyEstimateNumberColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Added By column header is visible
  await expect(await dashboardEstimateTabPage.verifyAddedByColumnHeaderVisible()).toBeVisible();

  // Verify Source column header is visible
  await expect(await dashboardEstimateTabPage.verifySourceColumnHeaderVisible()).toBeVisible();

  // Verify Profit column header is visible
  await expect(await dashboardEstimateTabPage.verifyProfitColumnHeaderVisible()).toBeVisible();
});
