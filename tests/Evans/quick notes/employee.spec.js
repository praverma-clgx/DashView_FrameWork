import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { EmployeePage } from '../../../pageObjects/enterprise/quickNotes/EmployeePage.po.js';

test('Verify Employee Form Quick Notes', async ({
  authenticatedPage,
}) => {
  // Initialize page objects
  const employeePage = new EmployeePage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Employee
  await employeePage.openQuickNotesCreateEmployee();

  // Wait for page to load
  await authenticatedPage.waitForLoadState('networkidle');

  // --- Assert Employee Creation Form Locators ---
  // Personal Information Fields
  await expect(employeePage.firstNameInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.lastNameInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.userNameInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.passwordInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.emailInput).toBeVisible({ timeout: 10000 });

  // Job Information Fields
  await expect(employeePage.jobTitleInput).toBeVisible({ timeout: 10000 });

  // Address Information Fields
  await expect(employeePage.addressInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.zipCodeInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.cityInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.stateInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.countryInput).toBeVisible({ timeout: 10000 });
  await expect(employeePage.countyInput).toBeVisible({ timeout: 10000 });

  // Action Buttons
  await expect(employeePage.saveButton).toBeVisible({ timeout: 10000 });
  await expect(employeePage.deactivateEmployeeCheckbox).toBeVisible({ timeout: 10000 });

    // Verify section headings are visible
  const headingSectionText = [
    'Employee Details',
    'Address Information',
    'Payroll Details',
    'Profile Details',
  ];

  for (const sectionText of headingSectionText) {
    await expect(await employeePage.verifySectionHeading(sectionText)).toBeVisible();
  }
});
