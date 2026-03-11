import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { EquipmentPage } from '../../../pageObjects/enterprise/quickNotes/EquipmentPage.po.js';

test('Verify Equipment page from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const equipmentPage = new EquipmentPage(authenticatedPage);

  // Open Quick Notes and navigate to Create Equipment
  await equipmentPage.openQuickNotesCreateEquipment();

  // Verify key page elements are visible without creating or editing equipment
  await expect(authenticatedPage.locator(equipmentPage.equipmentNameInput)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.equipmentIdInput)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.barcodeInput)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.currentLocationArrow)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.statusArrow)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.equipmentTypeArrow)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.storageLocationArrow)).toBeVisible();
  await expect(authenticatedPage.locator(equipmentPage.saveButton)).toBeVisible();
});
