import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { MarketingNotesPage } from '../../../pageObjects/enterprise/journalNotes/MarketingNotesPage.po.js';

  test('Verify Marketing Notes UI and modal elements', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const marketingNotesPage = new MarketingNotesPage(page);

    await marketingNotesPage.navigateTo('Journal Notes', 'Marketing Notes');

    await expect(marketingNotesPage.addIndividualNoteBtn).toBeVisible();
    await expect(marketingNotesPage.grid).toBeVisible();

    // Individual modal UI
    await marketingNotesPage.clickAddNewRecord();
    await expect(marketingNotesPage.contactSelectInput).toBeVisible();
    await expect(marketingNotesPage.noteTextBox).toBeVisible();
    await expect(marketingNotesPage.saveButton).toBeVisible();
    await page.locator('a.rwCloseButton[title="Close"]').first().click();

    // Company modal UI
    await marketingNotesPage.clickCompanyNotesTab();
    await expect(marketingNotesPage.grid).toBeVisible();
    
    await marketingNotesPage.clickAddCompanyRecord();
    await expect(marketingNotesPage.contactSelectInput).toBeVisible();
    await expect(marketingNotesPage.noteTextBox).toBeVisible();
    await expect(marketingNotesPage.saveButton).toBeVisible();
    await page.locator('a.rwCloseButton[title="Close"]').first().click();
  });
