import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { IndividualPage } from '../../../pageObjects/enterprise/quickNotes/IndividualPage.po.js';

test('Verify Individual page from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const individualPage = new IndividualPage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Individual
  await individualPage.quickNotesIcon.click();
  await individualPage.createIndividualQuickLink.waitFor({ state: 'visible', timeout: 5000 });
  await individualPage.createIndividualQuickLink.click();
  await authenticatedPage.waitForLoadState('networkidle');

  // Verify key page elements are visible without creating or editing individuals
  await expect(authenticatedPage).toHaveURL(/Marketing\/AddIndividual\.aspx/);
  await expect(individualPage.firstNameInput).toBeVisible();
  await expect(individualPage.lastNameInput).toBeVisible();
  await expect(individualPage.mainPhoneInput).toBeVisible();
  await expect(individualPage.companyInput).toBeVisible();
  await expect(individualPage.contactTypeDropdown).toBeVisible();
  await expect(individualPage.addressInput).toBeVisible();
  await expect(individualPage.emailInput).toBeVisible();
  await expect(individualPage.referralTypeDropdown).toBeVisible();
  await expect(individualPage.rankDropdown).toBeVisible();
  await expect(individualPage.saveButton).toBeVisible();
});
