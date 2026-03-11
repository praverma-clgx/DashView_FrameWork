import { test, expect } from '../../../fixtures/sharedFixtures.js';
import jobNumberData from '../../../testData/evans/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { AddEstimatesPage } from '../../../pageObjects/enterprise/accountingInformation/AddEstimatesPage.po.js';
import { UploadEstimatePage } from '../../../pageObjects/enterprise/accountingInformation/UploadEstimatePage.po.js';
import { EstimateTrackerPage } from '../../../pageObjects/enterprise/accountingInformation/EstimateTrackerPage.po.js';

  test('Add Estimate validation', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const addEstimatesPage = new AddEstimatesPage(page);

    await searchJobNumber(page, jobNumberData.jobNumber);
    await addEstimatesPage.openAddEstimateModal();

    await expect(addEstimatesPage.originalEstimateRadio).toBeVisible();
    await expect(addEstimatesPage.typeArrow).toBeVisible();
    await expect(addEstimatesPage.amountInput).toBeVisible();
    await expect(addEstimatesPage.descriptionInput).toBeVisible();
    await expect(addEstimatesPage.fileInput).toBeVisible();
    await expect(addEstimatesPage.submitButton).toBeVisible();

    await page.locator('a.rwCloseButton[title="Close"]').first().click();
    await page.locator(addEstimatesPage.modalIframeName).waitFor({ state: 'hidden', timeout: 10000 });
  });

  test('Estimate Tracker validation', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const estimateTrackerPage = new EstimateTrackerPage(page);

    await searchJobNumber(page, jobNumberData.jobNumber);
    await estimateTrackerPage.openEstimateTracker();

    await expect(estimateTrackerPage.uploadedOnlyTab).toBeVisible();
    await expect(estimateTrackerPage.notUploadedTab).toBeVisible();
    await expect(estimateTrackerPage.showAllTab).toBeVisible();

    for (const tabName of ['Uploaded Only', 'Not Uploaded Only', 'Show All']) {
      await estimateTrackerPage.clickTab(tabName);
      await estimateTrackerPage.checkTabData(expect);
    }

    await estimateTrackerPage.validateButtons(expect);
    await expect(estimateTrackerPage.jobNumberText).toBeVisible();
  });

