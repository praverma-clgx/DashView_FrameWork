import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { WorkflowPage } from '../../../pageObjects/enterprise/quickNotes/WorkflowPage.po.js';

test('Verify Workflow page elements from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const workflowPage = new WorkflowPage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Workflows
  await workflowPage.openQuickNotesCreateWorkflow();

  // Verify workflow grid and button elements
  await workflowPage.waitForGridVisible(30000);
  await expect(workflowPage.workflowGrid).toBeVisible();
  await expect(workflowPage.addWorkflowButton).toBeVisible();
  await expect(workflowPage.workflowGridRows.first()).toBeVisible();

  // Verify modal dialog title
  await expect(workflowPage.addNewWorkflowDialogTitle).toBeVisible();

  // Verify text input fields
  await expect(workflowPage.actionTitleInput).toBeVisible();
  await expect(workflowPage.descriptionInput).toBeVisible();
  await expect(workflowPage.assignmentDelayInput).toBeVisible();
  await expect(workflowPage.mustCompleteWithinInput).toBeVisible();

  // Verify dropdown fields
  await expect(workflowPage.assignTriggerDropdown).toBeVisible();
  await expect(workflowPage.actionEventDropdown).toBeVisible();
  await expect(workflowPage.resourceTypeDropdown).toBeVisible();
  await expect(workflowPage.delayUnitSelect).toBeVisible();
  await expect(workflowPage.completeUnitSelect).toBeVisible();
  await expect(workflowPage.requiredCompletionActionDropdown).toBeVisible();
  await expect(workflowPage.associatedCompletionDateDropdown).toBeVisible();

  // Verify checkbox sections for filters
  await expect(workflowPage.notificationTypesAllCheckbox).toBeVisible();
  await expect(workflowPage.divisionsAllCheckbox).toBeVisible();
  await expect(workflowPage.lossTypesAllCheckbox).toBeVisible();
  await expect(workflowPage.lossCategoriesAllCheckbox).toBeVisible();
  await expect(workflowPage.jobSizeAllCheckbox).toBeVisible();
  await expect(workflowPage.yearBuiltAllCheckbox).toBeVisible();

  // Verify action buttons
  await expect(workflowPage.saveButton).toBeVisible();
});
