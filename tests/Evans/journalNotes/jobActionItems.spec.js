import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';
import { JobActionItemsPage } from '../../../pageObjects/enterprise/journalNotes/JobActionItems.po.js';

test('Verify Job Action Items UI and modal elements', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const taskPage = new TaskPage(page);
  const jobActionItemsPage = new JobActionItemsPage(page);

  // Navigate to Journal Notes > Job Action Items
  await jobActionItemsPage.navigateTo('Journal Notes', 'Job Action Items');

  await expect(jobActionItemsPage.addNewRecordBtn).toBeVisible();
  await expect(jobActionItemsPage.gridContainer).toBeVisible();
  await expect(jobActionItemsPage.taskFilterInput).toBeVisible();

  // Add New (read-only)
  await jobActionItemsPage.clickAddNewRecord();
  await expect(taskPage.modalContent).toBeVisible();
  await expect(taskPage.jobNumberInput).toBeVisible();
  await expect(taskPage.taskDescriptionInput).toBeVisible();
  await expect(taskPage.startDateInput).toBeVisible();
  await expect(taskPage.endDateInput).toBeVisible();
  await expect(taskPage.assignResourceButton).toBeVisible();
  await expect(taskPage.modalSaveButton).toBeVisible();

  await page.locator('i.fa.fa-times-circle').first().click();
  await expect(jobActionItemsPage.gridContainer).toBeVisible({ timeout: 10000 });
});
