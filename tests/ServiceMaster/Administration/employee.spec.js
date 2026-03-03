import { test, expect } from '../../../fixtures/sharedFixtures.js';
import EmployeePage from '../../../pageObjects/enterprise/administrationFG/employee.po.js';
import employeeData from '../../../testData/enterprise/employeeData.json' with { type: 'json' };
import { getRandomNumber } from '../../../utils/randomNumber.js';

test('Employee Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const employeePage = new EmployeePage(page);

  // Navigate to Employee page from Administration menu
  await employeePage.navigateToEmployee();

  // Verify Employee Details text is visible
  await expect(await employeePage.verifyEmployeeDetailsText()).toBeVisible();

  // Verify Show Active Employees label is visible
  await expect(await employeePage.verifyShowActiveEmployeesCheckbox()).toBeVisible();

  // Verify Show Inactive Employees label is visible
  await expect(await employeePage.verifyShowInactiveEmployeesCheckbox()).toBeVisible();

  // Verify Show All Employees label is visible
  await expect(await employeePage.verifyShowAllEmployeesCheckbox()).toBeVisible();

  // Verify Name column header is hidden
  await expect(await employeePage.verifySecondNameHeader()).toBeHidden();

  // Verify User ID column header is visible
  await expect(await employeePage.verifyUserIdHeader()).toBeVisible();

  // Verify Address column header is visible
  await expect(await employeePage.verifyAddressHeader()).toBeVisible();

  // Verify Email column header is visible
  await expect(await employeePage.verifyEmailHeader()).toBeVisible();

  // Verify Status column header is visible
  await expect(await employeePage.verifyStatusHeader()).toBeVisible();

  // Verify Refresh button is visible
  await expect(await employeePage.verifyRefreshButton()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await employeePage.verifyExportToExcelButton()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await employeePage.verifyExportToPdfButton()).toBeVisible();

  // Verify Add New button is visible and has button type attribute
  await expect(await employeePage.verifyAddNewButton()).toBeVisible();
  await expect(await employeePage.verifyAddNewButton()).toHaveAttribute('type', 'button');

  // Click on Add New button to navigate to the Add Employee form
  await employeePage.clickAddNewButton();

  // Verify section headings are visible
  const headingSectionText = [
    'Employee Details',
    'Address Information',
    'Profile Details',
  ];

  for (const sectionText of headingSectionText) {
    await expect(await employeePage.verifySectionHeading(sectionText)).toBeVisible();
  }
});
