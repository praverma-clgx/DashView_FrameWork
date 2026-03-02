import { test, expect } from '../../../fixtures/sharedFixtures.js';
import DashboardEquipmentTabPage from '../../../pageObjects/enterprise/dashboardEvans/equipmentTab.po.js';
import jobNumberData from '../../../testData/servicemaster/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Equipment Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardEquipmentTabPage = new DashboardEquipmentTabPage(page);

  // Search for job by number
  await searchJobNumber(page, jobNumberData.jobNumber);

  // Navigate to Equipment tab
  await dashboardEquipmentTabPage.navigateToEquipmentTab();

  // Verify Refresh button is visible
  await expect(await dashboardEquipmentTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await dashboardEquipmentTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await dashboardEquipmentTabPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Verify Equipment Name column header is visible
  await expect(
    await dashboardEquipmentTabPage.verifyEquipmentNameColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Equipment Type column header is visible
  await expect(
    await dashboardEquipmentTabPage.verifyEquipmentTypeColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Barcode Text column header is visible
  await expect(
    await dashboardEquipmentTabPage.verifyBarcodeTextColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Start Date column header is visible
  await expect(await dashboardEquipmentTabPage.verifyStartDateColumnHeaderVisible()).toBeVisible();

  // Verify End Date column header is visible
  await expect(await dashboardEquipmentTabPage.verifyEndDateColumnHeaderVisible()).toBeVisible();

  // Verify Days on Job column header is visible
  await expect(await dashboardEquipmentTabPage.verifyDaysOnJobColumnHeaderVisible()).toBeVisible();
});
