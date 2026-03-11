import { test, expect } from '../../../fixtures/sharedFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/servicemaster/commonJobNumber.json' with { type: 'json' };

test('Action FG', async ({ authenticatedPage }) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;
  expect(jobNumber).toBeTruthy();

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  //verify compose email button
  await jobSlideboardPage.verifyComposeEmail();

  //verify email link for job button
  await jobSlideboardPage.verifyEmailLinkForJob();

  //verify close job button
  await jobSlideboardPage.verifyCloseJob();

  //verify delete job button
  await jobSlideboardPage.verifyDeleteJob();

});