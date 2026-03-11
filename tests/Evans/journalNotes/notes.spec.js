import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { NotesPage } from '../../../pageObjects/enterprise/journalNotes/notesPage.po.js';

test('Verify Notes page elements and grid', async ({ authenticatedPage }) => {
  const notesPage = new NotesPage(authenticatedPage);

  await notesPage.navigateTo('Journal Notes', 'Notes');
  await notesPage.waitForGridToLoad();

  await test.step('Verify grid headers', async () => {
    for (const locator of Object.values(notesPage.headers)) {
      await expect.soft(locator).toBeVisible();
    }
  });

  await test.step('Verify action buttons', async () => {
    for (const locator of Object.values(notesPage.buttons)) {
      await expect.soft(locator).toBeVisible();
    }
  });

  await test.step('Verify grid container', async () => {
    await expect(notesPage.grid).toBeVisible();
    await expect(notesPage.gridContent).toBeVisible();
  });
});
