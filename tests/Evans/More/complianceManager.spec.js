import { test } from '../../../fixtures/sharedFixtures.js';
import { expect } from '@playwright/test';
import { ComplianceManagerPage } from '../../../pageObjects/enterprise/moreFg/complianceManager.po.js';

test('Compliance Manager Page in More...', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const complianceManagerPage = new ComplianceManagerPage(page);

  // Hover over More... menu
  const moreMenu = page.locator('span.rmText.rmExpandDown:has-text("More...")').first();
  await expect(moreMenu).toBeVisible({ timeout: 10000 });
  await moreMenu.hover();

  // Click first Compliance Manager link (menuSubHeader — the section header entry)
  const complianceManagerLink = page.locator('a.rmLink.menuSubHeader:has-text("Compliance Manager")').first();
  await expect(complianceManagerLink).toBeVisible({ timeout: 90000 });
  await complianceManagerLink.click();

  await page.waitForLoadState('networkidle');

  // Validate Page Title
  await complianceManagerPage.validatePageTitle();

  // Validate Labels
  await complianceManagerPage.validateLabels();

  // Validate Buttons
  await complianceManagerPage.validateButtons();

  // Define pending task labels
  const pendingTaskLabelText = ComplianceManagerPage.taskLabels.pending;

  // Validate Pending Task Labels
  await complianceManagerPage.validatePendingTaskLabels(pendingTaskLabelText);

  // Click Completed Task Radio Button
  await complianceManagerPage.clickCompletedTaskRadioButton();

  // Define completed task labels
  const completedTaskRowText = ComplianceManagerPage.taskLabels.completed;

  // Validate Completed Task Labels
  await complianceManagerPage.validateCompletedTaskLabels(completedTaskRowText);
});
