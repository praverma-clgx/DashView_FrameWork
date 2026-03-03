import { test, expect } from '../../../fixtures/sharedFixtures.js';
import DashboardDatesTabPage from '../../../pageObjects/enterprise/dashboardEvans/datesTab.po.js';
import jobNumberData from '../../../testData/servicemaster/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Dates Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardDatesTabPage = new DashboardDatesTabPage(page);

  // Search for job by number
  await searchJobNumber(page, jobNumberData.jobNumber);

  // Navigate to Dates tab
  await dashboardDatesTabPage.navigateToDatesTab();

  // Verify Date of Loss label is visible
  await expect(await dashboardDatesTabPage.verifyDateOfLossLabelVisible()).toBeVisible();

  // Verify Date Received label is visible
  await expect(await dashboardDatesTabPage.verifyDateReceivedLabelVisible()).toBeVisible();

  // Verify Date of Work Authorization label is visible
  await expect(
    await dashboardDatesTabPage.verifyDateOfWorkAuthorizationLabelVisible(),
  ).toBeVisible();

  // Verify Date Estimate Sent label is visible
  await expect(await dashboardDatesTabPage.verifyDateEstimateSentLabelVisible()).toBeVisible();

  // Verify Target Start Date label is visible
  await expect(await dashboardDatesTabPage.verifyTargetStartDateLabelVisible()).toBeVisible();

  // Verify Provider Reason for Closing label is visible
  await expect(
    await dashboardDatesTabPage.verifyProviderReasonForClosingLabelVisible(),
  ).toBeVisible();

  // Verify Put on Hold Job button is visible
  await expect(await dashboardDatesTabPage.verifyPutOnHoldJobButtonVisible()).toBeVisible();

  // Verify Into Production Date label is visible
  await expect(await dashboardDatesTabPage.verifyIntoProductionDateLabelVisible()).toBeVisible();

  // Verify Date Started label is visible
  await expect(await dashboardDatesTabPage.verifyDateStartedLabelVisible()).toBeVisible();

  // Verify Date of Majority Completed label is visible
  await expect(await dashboardDatesTabPage.verifyDateCompletedLabelVisible()).toBeVisible();

  // Verify Date Target label is visible
  await expect(await dashboardDatesTabPage.verifyDateTargetLabelVisible()).toBeVisible();

  // Verify Date Invoiced label is visible
  await expect(await dashboardDatesTabPage.verifyDateInvoicedLabelVisible()).toBeVisible();

  // Verify Date Paid label is visible
  await expect(await dashboardDatesTabPage.verifyDatePaidLabelVisible()).toBeVisible();

  // Verify Save button is visible
  const saveDatesButton = await dashboardDatesTabPage.verifySaveDatesButtonVisible();
  await expect(saveDatesButton).toBeVisible();

  // Verify Save button is button type
  await expect(saveDatesButton).toHaveAttribute('type', 'button');
});
