import { test, expect } from '../../../fixtures/sharedFixtures.js';
import DashboardPhotosTabPage from '../../../pageObjects/enterprise/dashboardEvans/photosTab.po.js';
import jobNumberData from '../../../testData/servicemaster/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Photos Tab', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const photosTabPage = new DashboardPhotosTabPage(page);

  // Search for job by number
  await searchJobNumber(page, jobNumberData.jobNumber);

  // Navigate to Photos tab
  await photosTabPage.navigateToPhotosTab();

  // Verify Add Album button is visible
  await expect(await photosTabPage.verifyAddAlbumButtonVisible()).toBeVisible();

  // Verify Upload Photo button is visible
  await expect(await photosTabPage.verifyUploadPhotoButtonVisible()).toBeVisible();

  // Verify Manage Photos and Albums button is visible
  await expect(await photosTabPage.verifyManagePhotosAndAlbumsButtonVisible()).toBeVisible();

  // Verify Export Photos for Linked Jobs to PDF button is visible
  await expect(await photosTabPage.verifyExportPhotosToPDFButtonVisible()).toBeVisible();

  // Verify Sort Albums label is visible
  await expect(await photosTabPage.verifySortAlbumsLabelVisible()).toBeVisible();

  // Verify Date Created dropdown is visible
  await expect(await photosTabPage.verifyDateCreatedDropdownVisible()).toBeVisible();

  await photosTabPage.navigateToManagePhotosAndAlbums();

  await page.reload();
  await page.waitForLoadState('networkidle');

  // Verify All button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectAllButtonVisible()).toBeVisible();

  // Verify All Dry Track button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectAllDryTrackButtonVisible()).toBeVisible();

  // Verify All Xactware/Claims Workspace button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectAllXactwareButtonVisible()).toBeVisible();

  // Verify None button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectNoneButtonVisible()).toBeVisible();

  // Verify Update Album button is visible in manage photos and albums page
  await expect(await photosTabPage.verifyUpdateAlbumButtonVisible()).toBeVisible();

  // Verify Delete Album button is visible in manage photos and albums page
  await expect(await photosTabPage.verifyDeleteAlbumButtonVisible()).toBeVisible();

  // Verify Download Photos button is initially disabled
  await photosTabPage.verifyDownloadPhotosButtonDisabled();

  // Verify Move Photo button is initially disabled
  await photosTabPage.verifyMovePhotoButtonDisabled();

  // Verify sort photos label is visible in manage photos and albums page
  await expect(await photosTabPage.verifySortPhotosLabelVisible()).toBeVisible();
});
