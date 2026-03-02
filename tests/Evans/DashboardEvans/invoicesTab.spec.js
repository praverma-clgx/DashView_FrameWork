import { test, expect } from '../../../fixtures/sharedFixtures.js';
import DashboardInvoicesTabPage from '../../../pageObjects/enterprise/dashboardEvans/invoicesTab.po.js';
import jobNumberData from '../../../testData/evans/commonJobNumber.json' with { type: 'json' };
import { getRandomNumber } from '../../../utils/randomNumber.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

let randomNumber = getRandomNumber(1, 10000);

test('Invoices Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardInvoicesTabPage = new DashboardInvoicesTabPage(page);

  // Search for job by number
  await searchJobNumber(page, jobNumberData.jobNumber);

  // Navigate to Invoices tab
  await dashboardInvoicesTabPage.navigateToInvoicesTab();

  // Verify Add New button is visible
  await expect(await dashboardInvoicesTabPage.verifyAddNewButtonVisible()).toBeVisible();

  // Verify Refresh button is visible
  await expect(await dashboardInvoicesTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await dashboardInvoicesTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await dashboardInvoicesTabPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Verify Invoice PDF column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoicePDFColumnHeaderVisible()).toBeVisible();

  // Verify Invoice No. column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceNoColumnHeaderVisible()).toBeVisible();

  // Verify Note column header is visible
  await expect(await dashboardInvoicesTabPage.verifyNoteColumnHeaderVisible()).toBeVisible();

  // Verify Customer column header is visible
  await expect(await dashboardInvoicesTabPage.verifyCustomerColumnHeaderVisible()).toBeVisible();

  // Verify Invoice Date column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceDateColumnHeaderVisible()).toBeVisible();

  // Verify Amount column header is visible
  await expect(await dashboardInvoicesTabPage.verifyAmountColumnHeaderVisible()).toBeVisible();

  // Verify Tax Included column header is visible
  await expect(await dashboardInvoicesTabPage.verifyTaxIncludedColumnHeaderVisible()).toBeVisible();

  // Click Add New button to navigate to Invoice detail page
  await dashboardInvoicesTabPage.clickAddNewButton();

  // Verify Invoice detail page is visible and has correct text
  const invoiceDetailPage = await dashboardInvoicesTabPage.verifyInvoiceDetailPageVisible();
  await expect(invoiceDetailPage).toBeVisible();
  await expect(invoiceDetailPage).toHaveText(dashboardInvoicesTabPage.getExpectedInvoiceDetail());

  // Verify Invoice detail page Add New button is visible
  await expect(
    await dashboardInvoicesTabPage.verifyInvoiceDetailAddNewButtonVisible(),
  ).toBeVisible();

  // Verify Invoice detail page Refresh button is visible
  await expect(
    await dashboardInvoicesTabPage.verifyInvoiceDetailRefreshButtonVisible(),
  ).toBeVisible();

  // Verify Job Number column header is visible
  await expect(await dashboardInvoicesTabPage.verifyJobNumberColumnHeaderVisible()).toBeVisible();

  // Verify Invoice Memo column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceMemoColumnHeaderVisible()).toBeVisible();

  // Click Invoice Detail Add New button
  await dashboardInvoicesTabPage.clickInvoiceDetailAddNewButton();
});
