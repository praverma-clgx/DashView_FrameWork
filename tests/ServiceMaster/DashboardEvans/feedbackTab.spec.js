import { test } from '../../../fixtures/sharedFixtures.js';
import FeedbackTabPage from '../../../pageObjects/enterprise/dashboardEvans/feedbackTab.po.js';
import jobNumberData from '../../../testData/servicemaster/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Feedback Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const feedbackTabPage = new FeedbackTabPage(page);

  // Search for job by number
  await searchJobNumber(page, jobNumberData.jobNumber);

  // Navigate to Feedback tab
  await feedbackTabPage.navigateToFeedbackTab();

  // Array of Feedback grid headers
  const feedbackGridHeaders = [
    'Name',
    'Appointment Start',
    'Appointment Complete',
    'Rating',
    'Feedback',
    'Feedback Time',
  ];

  // Validate each header in the Feedback grid
  await feedbackTabPage.assertGridHeaders(feedbackGridHeaders);
});
