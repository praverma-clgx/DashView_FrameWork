import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { EquipmentPage } from '../../../pageObjects/enterprise/moreFg/equipment.po.js';

test('Equipment Page in More FG', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const equipmentPage = new EquipmentPage(page);

  // Navigate to Equipment
  await equipmentPage.navigateToEquipment();

  // Validate Page Title
  await equipmentPage.validatePageTitle();

  // Validate Back Button
  await equipmentPage.validateBackButton();

  // Validate Move Date Label
  await equipmentPage.validateMoveDateLabel();

  // Define grid headers
  const expectedHeaders = [
    'Equipment Name',
    'Equipment Type',
    'Barcode Text',
    'Secondary Equipment Type',
    'Current Location',
    'Job Number',
    'Vendors',
    'Serial Number',
    'Model',
    'Manufacturer',
    'Description',
    'Storage Location',
    'Purchase Amount',
    'Status',
    'Last Moved Date',
  ];

  // Validate Grid Headers
  await equipmentPage.validateGridHeaders(expectedHeaders);

   // Validate Export Buttons
  await equipmentPage.validateExportButtons();

  // Validate Add New Equipment Button
  await equipmentPage.validateAddNewEquipmentButton();

  // Click on Add New Equipment Button and validate navigation
  await equipmentPage.addNewEquipmentButton.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/.*eEditEquipment\.aspx.*/);

  // Details in Equipment Edit Page
  await expect(page.locator('span.rtsTxt', { hasText: 'Details' })).toBeVisible();

  // Equipment Name input field
  const equipmentNameInput = page.locator('#ctl00_ContentPlaceHolder1_txtEquipmentName');
  await expect(equipmentNameInput).toBeVisible();


  // Equipment Id input field
  const equipmentIdInput = page.locator('#ctl00_ContentPlaceHolder1_txtEquipmentCodeId');
  await expect(equipmentIdInput).toBeVisible();


  // Current Location Dropdown Arrow
  const currentLocationDropdown = page.locator(
    '#ctl00_ContentPlaceHolder1_ddlCurrentLocation_Arrow',
  );
  await expect(currentLocationDropdown).toBeVisible();
  await currentLocationDropdown.click();

  // Select Second option from Current Location dropdown
  const secondLocationOption = page
    .locator('#ctl00_ContentPlaceHolder1_ddlCurrentLocation_DropDown ul li')
    .nth(1);
  await expect(secondLocationOption).toBeVisible();
  await secondLocationOption.click();

  // Click on Status drop down arrow
  const statusDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlStatus_Arrow');
  await expect(statusDropdown).toBeVisible();
  await statusDropdown.click();
  // Select Third option from Status dropdown
  const thirdStatusOption = page
    .locator('#ctl00_ContentPlaceHolder1_ddlStatus_DropDown ul li')
    .nth(2);
  await expect(thirdStatusOption).toBeVisible();
  await thirdStatusOption.click();

  // Click on Equipment Type drop down arrow
  const equipmentTypeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlEquipmentType_Arrow');
  await expect(equipmentTypeDropdown).toBeVisible();
  await equipmentTypeDropdown.click();

  // Select Second option from Equipment Type dropdown
  const secondEquipmentTypeOption = page
    .locator('#ctl00_ContentPlaceHolder1_ddlEquipmentType_DropDown ul li')
    .nth(1);
  await expect(secondEquipmentTypeOption).toBeVisible();
  await secondEquipmentTypeOption.click();

  // Select the secondary Type drop down arrow
  const secondaryTypeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlSecondryType_Arrow');
  await expect(secondaryTypeDropdown).toBeVisible();
  await secondaryTypeDropdown.click();

  // Select Second option from Secondary Equipment Type dropdown
  const secondSecondaryTypeOption = page
    .locator('#ctl00_ContentPlaceHolder1_ddlSecondryType_DropDown ul li')
    .nth(1);
  await expect(secondSecondaryTypeOption).toBeVisible();
  await secondSecondaryTypeOption.click();

  // Barcode input field
  const barcodeInput = page.locator('#ctl00_ContentPlaceHolder1_txtBarCodeText');
  await expect(barcodeInput).toBeVisible();
});
