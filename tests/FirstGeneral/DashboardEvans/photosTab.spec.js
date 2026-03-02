import { test, expect } from '../../../fixtures/sharedFixtures.js';
import DashboardPhotosTabPage from '../../../pageObjects/enterprise/dashboardEvans/photosTab.po.js';
import jobNumberData from '../../../testData/firstgeneral/commonJobNumber.json' with { type: 'json' };
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

  // Verify 3D Room Models button is visible
  await expect(await photosTabPage.verifyRoomModelsButtonVisible()).toBeVisible();
  
  // Click on 3D Room Models button
  await photosTabPage.click3DRoomModelsButton();

  // Wait for the popup div to be visible
  await photosTabPage.waitForLinksPopupVisible();

  // Verify header text inside iframe
  await photosTabPage.verifyLinksIframeHeaderText('3D Room Models');

  // Verify cancel image is visible inside iframe
  await expect(await photosTabPage.verifyLinksIframeCancelImgVisible()).toBeVisible();

  // Verify all three buttons are visible inside the iframe
  await expect(await photosTabPage.verifyDocusketchButtonVisible()).toBeVisible();
  await expect(await photosTabPage.verifyMatterportButtonVisible()).toBeVisible();

  // Click cancel image inside iframe to close popup
  await photosTabPage.clickLinksIframeCancelImg();

  // Verify popup is hidden
  await photosTabPage.verifyLinksPopupHidden();

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

  // Verify Copy Photo button is initially disabled
  await photosTabPage.verifyCopyPhotoButtonDisabled();

  // Verify sort photos label is visible in manage photos and albums page
  await expect(await photosTabPage.verifySortPhotosLabelVisible()).toBeVisible();
});
