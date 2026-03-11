import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { MyNotesPage } from '../../../pageObjects/enterprise/journalNotes/MyNotesPage.po.js';

test('Verify My Notes page elements and grid', async ({ authenticatedPage }) => {
  const myNotesPage = new MyNotesPage(authenticatedPage);

  await myNotesPage.navigateTo('Journal Notes', 'My Notes');
  await myNotesPage.waitForGridToLoad();

  await test.step('Verify grid headers', async () => {
    // Loop through the header object from POM
    for (const [name, locator] of Object.entries(myNotesPage.headers)) {
      await expect.soft(locator, `${name} header should be visible`).toBeVisible();
    }
  });

  await test.step('Verify action buttons', async () => {
    for (const [name, locator] of Object.entries(myNotesPage.buttons)) {
      await expect.soft(locator, `${name} button should be visible`).toBeVisible();
    }
  });

  await test.step('Verify grid container', async () => {
    await expect(myNotesPage.grid).toBeVisible();
    await expect(myNotesPage.gridContent).toBeVisible();
  });
});
