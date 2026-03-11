import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';

test('Verify Task page elements from Quick Notes', async ({ authenticatedPage }) => {
  const taskPage = new TaskPage(authenticatedPage);

  // Navigate to Quick Notes Create Task
  await taskPage.openQuickNotesCreateTask();

  // Open Create Task modal
  await taskPage.openCreateTaskModal();

  // Verify key task modal elements are visible without creating or editing tasks
  await expect(taskPage.modalContent).toBeVisible();
  await expect(taskPage.jobNumberInput).toBeVisible();
  await expect(taskPage.taskDescriptionInput).toBeVisible();
  await expect(taskPage.startDateInput).toBeVisible();
  await expect(taskPage.endDateInput).toBeVisible();
  await expect(taskPage.assignResourceButton).toBeVisible();
  await expect(taskPage.modalSaveButton).toBeVisible();
});
