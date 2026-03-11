import { test, expect } from '../../../fixtures/sharedFixtures.js';
import jobNumberData from '../../../testData/servicemaster/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { ImportEstimatePage } from '../../../pageObjects/enterprise/accountingInformation/ImportEstimatePage.po.js';

test('Import Estimate validation', async ({ authenticatedPage }) => {
  const importEstimatePage = new ImportEstimatePage(authenticatedPage);

  await searchJobNumber(authenticatedPage, jobNumberData.jobNumber);
  await importEstimatePage.openImportEstimateModal();

  await expect(importEstimatePage.modalWrapper).toBeVisible();
  await expect(importEstimatePage.iframe.locator('body')).toBeVisible();
  await expect(importEstimatePage.iframe.locator('input[type="file"]').first()).toBeVisible();

  await importEstimatePage.closeModal();
  await expect(importEstimatePage.modalWrapper).toBeHidden();
});
