import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';
import { MarketingActionItemsPage } from '../../../pageObjects/enterprise/journalNotes/MarketingActionItems.po.js';

test('Verify Marketing Action Items UI and modal elements', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const taskPage = new TaskPage(page);
  const marketingActionItem = new MarketingActionItemsPage(page);

  // Navigate to Journal Notes > Marketing Action Items
  await marketingActionItem.navigateTo('Journal Notes', 'Marketing Action Items');

  await expect(marketingActionItem.addNewRecordBtn).toBeVisible();
  await expect(marketingActionItem.gridContainer).toBeVisible();
  await expect(marketingActionItem.actionItemFilterInput).toBeVisible();

  // Open Modal (read-only)
  await marketingActionItem.clickAddNewRecord();
  await expect(taskPage.modalContent).toBeVisible();
  await expect(taskPage.companyInput).toBeVisible();
  await expect(taskPage.taskDescriptionInput).toBeVisible();
  await expect(taskPage.activitySelect).toBeVisible();
  await expect(taskPage.amountInput).toBeVisible();
  await expect(taskPage.startDateInput).toBeVisible();
  await expect(taskPage.endDateInput).toBeVisible();
  await expect(taskPage.assignResourceButton).toBeVisible();
  await expect(taskPage.modalSaveButton).toBeVisible();

  await page.locator('i.fa.fa-times-circle').first().click();
  await expect(marketingActionItem.gridContainer).toBeVisible({ timeout: 10000 });
});
