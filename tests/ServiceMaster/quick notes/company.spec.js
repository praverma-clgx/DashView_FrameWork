import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { CompanyPage } from '../../../pageObjects/enterprise/quickNotes/CompanyPage.po.js';

test('Open Quick Notes Company and Verify Company Page', async ({ authenticatedPage }) => {
  // Initialize page objects
  const companyPage = new CompanyPage(authenticatedPage);

  // Open Quick Notes and navigate to Company creation
  await companyPage.openQuickNotesCreateCompany();

  // Wait for page to load
  await authenticatedPage.waitForLoadState('networkidle');
  await expect(authenticatedPage).toHaveURL(/AddCompany\.aspx/i);

  // --- Assert Company Creation Form Locators ---
  await expect(authenticatedPage.locator(companyPage.companyTypeDropdown)).toBeVisible({ timeout: 10000 });

  // Company Name Input
  await expect(authenticatedPage.locator(companyPage.companyNameInput)).toBeVisible({ timeout: 10000 });

  // Company Main Phone Input
  await expect(authenticatedPage.locator(companyPage.companyMainPhone)).toBeVisible({ timeout: 10000 });

  // Save and Back Button
  await expect(authenticatedPage.locator(companyPage.saveAndBackBtn)).toBeVisible({ timeout: 10000 });
});
