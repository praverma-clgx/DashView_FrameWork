import { test, expect } from '../../../fixtures/sharedFixtures.js';
import jobNumberData from '../../../testData/evans/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { AccountDetailsPage } from '../../../pageObjects/enterprise/accountingInformation/AccountDetailsPage.po.js';

test.describe('Account Details Validation', () => {
  let accountDetailsPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    accountDetailsPage = new AccountDetailsPage(authenticatedPage);
    await searchJobNumber(page, jobNumberData.jobNumber);
    await accountDetailsPage.openAccountDetails();
  });

  test('1a. Job accounting summary validation', async () => {
    await accountDetailsPage.validateAccountingSummaryPage();
    const values = await accountDetailsPage.validateAccountingAmount();
    expect(values.finalEstimateAmount).not.toBeNull();
  });

  test('1b. Payments section validation', async () => {
    await accountDetailsPage.openPayments();
    await accountDetailsPage.validatePaymentsPage();

    await accountDetailsPage.payments.addButton.click();
    await expect(accountDetailsPage.payments.modeDropdown).toBeVisible({ timeout: 10000 });
    await expect(accountDetailsPage.payments.memoInput).toBeVisible();
    await expect(accountDetailsPage.payments.dateInput).toBeVisible();
    await expect(accountDetailsPage.payments.refInput).toBeVisible();
    await expect(accountDetailsPage.payments.amountInput).toBeVisible();
    await expect(accountDetailsPage.payments.discountInput).toBeVisible();
    await expect(accountDetailsPage.payments.saveButton).toBeVisible();
    await expect(accountDetailsPage.payments.cancelButton).toBeVisible();
    await accountDetailsPage.payments.cancelButton.click();
  });

  test('1c. Estimates section validation', async () => {
    await accountDetailsPage.openEstimates();
    await accountDetailsPage.validateEstimatesPage();
    await expect(accountDetailsPage.estimates.jobLabel).toBeVisible();
  });

  test('1e. Invoices section validation', async () => {
    await accountDetailsPage.openInvoices();
    await accountDetailsPage.validateInvoicesPage();
    await expect(accountDetailsPage.invoices.headerLabel).toBeVisible();
  });
});
