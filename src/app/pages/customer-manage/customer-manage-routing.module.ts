import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerImportComponent } from './customer-import/customer-import.component';
import { AssignCustomerModalComponent } from './modal/assign-customer-modal/assign-customer-modal.component';
import { TransferCustomerModalComponent } from './modal/transfer-customer-modal/transfer-customer-modal.component';
import { TrackingCustomerModalComponent } from './modal/tracking-customer-modal/tracking-customer-modal.component';
import { CustomerImportModalComponent } from './modal/customer-import-modal/customer-import-modal.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DefeatSubmitModalComponent } from './modal/defeat-submit-modal/defeat-submit-modal.component';

export const routedComponents = [
    CustomerListComponent,
    AssignCustomerModalComponent,
    TransferCustomerModalComponent,
    TrackingCustomerModalComponent,
    CustomerImportComponent,
    CustomerImportModalComponent,
    CustomerDetailComponent,
    DefeatSubmitModalComponent
];

export const entriedComponents = [
    AssignCustomerModalComponent,
    TransferCustomerModalComponent,
    TrackingCustomerModalComponent,
    CustomerImportModalComponent,
    DefeatSubmitModalComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: CustomerListComponent,
        data: {
            title: '客户列表'
        }
    },
    {
        path: 'dataimport',
        component: CustomerImportComponent,
        data: {
            title: '数据导入'
        }
    },
    {
        path: 'list/detail',
        component: CustomerDetailComponent,
        data: {
            title: '客户详情'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
