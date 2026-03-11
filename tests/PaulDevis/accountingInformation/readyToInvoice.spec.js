import { test, expect } from '../../../fixtures/sharedFixtures.js';
import jobNumberData from '../../../testData/pauldevis/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { ReadyToInvoicePage } from '../../../pageObjects/enterprise/accountingInformation/ReadyToInvoicePage.po.js';

test('Ready To Invoice validation', async ({ authenticatedPage }) => {
  const readyToInvoicePage = new ReadyToInvoicePage(authenticatedPage);

  await searchJobNumber(authenticatedPage, jobNumberData.jobNumber);
  await readyToInvoicePage.openReadyToInvoice();

  await expect(readyToInvoicePage.addNewRecordButton).toBeVisible();
  await readyToInvoicePage.clickAddNewRecord();

  await expect(readyToInvoicePage.iframe.locator('#DateOfInVoiceDateTimePicker_dateInput')).toBeVisible();
  await expect(readyToInvoicePage.iframe.locator('#BillToRadComboBox_Input')).toBeVisible();
  await expect(readyToInvoicePage.iframe.locator('#InvoiceAmountRadTextBox')).toBeVisible();
  await expect(readyToInvoicePage.iframe.locator('#InvoiceNumberRadTextBox')).toBeVisible();
  await expect(readyToInvoicePage.iframe.locator('#TermsRadTextBox')).toBeVisible();
  await expect(readyToInvoicePage.iframe.locator('#AssigneeRadComboBox_Input')).toBeVisible();
  await expect(readyToInvoicePage.iframe.locator('#SpecialInstructionsTextBox')).toBeVisible();
  await expect(
    readyToInvoicePage.iframe.locator('input[type="submit"][value="Save"], button:has-text("Save")'),
  ).toBeVisible();

  await authenticatedPage.locator('a.rwCloseButton[title="Close"]').first().click();
  await authenticatedPage
    .locator(readyToInvoicePage.modalIframeName)
    .waitFor({ state: 'hidden', timeout: 10000 });
});
