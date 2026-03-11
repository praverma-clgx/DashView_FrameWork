import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { NotesPage } from '../../../pageObjects/enterprise/quickNotes/NotesPage.po.js';

test('Verify Notes page from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const notesPage = new NotesPage(authenticatedPage);

  // Navigate to Create Notes
  await notesPage.openQuickNotesCreateNotes();

  // Verify all key modal/frame elements are visible 
  await expect(notesPage.jobNumberArrow).toBeVisible();
  await expect(notesPage.saveButton).toBeVisible();
  
  // Verify System Participants - Individual Contacts checkboxes
  await expect(notesPage.individualContactsCheckboxes.first()).toBeVisible();
  
  // Verify System Participants - Company Contacts checkboxes
  await expect(notesPage.companyContactsCheckboxes.first()).toBeVisible();

});
