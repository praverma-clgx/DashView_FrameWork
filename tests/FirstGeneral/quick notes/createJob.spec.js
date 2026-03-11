import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { CreateJobPage } from '../../../pageObjects/enterprise/quickNotes/CreateJobPage.po.js';

test('Verify Job from Quick Notes', async ({ authenticatedPage }) => {
  const createJobPage = new CreateJobPage(authenticatedPage);

  // Navigate to Quick Notes Job option
  await createJobPage.openQuickNotesCreateJob();

  // Wait for page to load
  await authenticatedPage.waitForLoadState('networkidle');

  // --- Assert Navigation Locators ---
  await expect(createJobPage.quickNotesIcon).toHaveCount(1);
  await expect(createJobPage.quickNotesPanel).toHaveCount(1);
  await expect(createJobPage.createJobQuickLink).toHaveCount(1);

  // --- Assert General Info Locators ---
  await expect(createJobPage.officeArrow).toBeVisible({ timeout: 5000 });
  await expect(createJobPage.dateOfLossInput).toHaveCount(1);
  await expect(createJobPage.lossCategoryArrow).toBeVisible({ timeout: 5000 });
  await expect(createJobPage.priorityArrow).toBeVisible({ timeout: 5000 });

  // --- Assert Customer Info Locators ---
  await expect(createJobPage.customerArrow).toBeVisible({ timeout: 5000 });
  await expect(createJobPage.customerInput).toHaveCount(1);

  // --- Assert Job Settings Locators ---
  await expect(createJobPage.sameAsCustomerCheckbox).toHaveCount(1);

  // --- Assert Loss Details Locators ---
  await expect(createJobPage.lossDescriptionInput).toHaveCount(1);
  await expect(createJobPage.specialInstructionsInput).toHaveCount(1);
  await expect(createJobPage.sourceOfLossArrow).toBeVisible({ timeout: 5000 });

  // --- Assert Button Locators ---
  await expect(createJobPage.createJobButton).toBeVisible({ timeout: 5000 });

  const jobTitles = [
    'Customer Information',
    'Job Address Information',
    'Internal Participants',
    'External Participants',
    'Policy Information',
    'Division',
    'Payment Services',
    'Loss Description & Special Instruction',
  ];

  for (const jobTitle of jobTitles) {
    await expect(await createJobPage.verifySectionTitles(jobTitle)).toBeVisible();
  }

});
