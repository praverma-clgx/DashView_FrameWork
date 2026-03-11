import { test, expect } from '../../../fixtures/sharedFixtures.js';
import jobNumberData from '../../../testData/pauldevis/commonJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';

  test('Validate Work Order & Purchase Order', async ({ authenticatedPage }) => {
    const jobNumber = jobNumberData.jobNumber;
    const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
    expect(jobNumber).toBeTruthy();

    await searchJobNumber(authenticatedPage, jobNumber);
    await workOrderPage.openWorkOrderPurchaseOrder();
    await workOrderPage.validateWorkOrder(expect);
  });

