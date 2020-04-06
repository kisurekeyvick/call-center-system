import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerImportComponent } from './customer-import/customer-import.component';
import { AssignCustomerModalComponent } from './modal/assign-customer-modal/assign-customer-modal.component';
import { TransferCustomerModalComponent } from './modal/transfer-customer-modal/transfer-customer-modal.component';
import { TrackingCustomerModalComponent } from './modal/tracking-customer-modal/tracking-customer-modal.component';
import { CustomerImportModalComponent } from './modal/customer-import-modal/customer-import-modal.component';

export const routedComponents = [
    CustomerListComponent,
    AssignCustomerModalComponent,
    TransferCustomerModalComponent,
    TrackingCustomerModalComponent,
    CustomerImportComponent,
    CustomerImportModalComponent
];

export const entriedComponents = [
    AssignCustomerModalComponent,
    TransferCustomerModalComponent,
    TrackingCustomerModalComponent,
    CustomerImportModalComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: CustomerListComponent
    },
    {
        path: 'dataimport',
        component: CustomerImportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
