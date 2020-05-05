import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListQueryComponent } from './list-query/list-query.component';
import { ListRecoveryComponent } from './list-recovery/list-recovery.component';
import { AssignFormModalComponent } from './modal/assign-form/assign-form-modal.component';
import { RuleFormModalComponent } from './modal/rule-form/rule-form-modal.component';
import { ListAssignmentComponent } from './list-assignment/list-assignment.component';
import { CustomerDetailComponent } from './list-query/customer-detail/customer-detail.component';
import { CustomerDetailInsuranceComponent } from './list-query/customer-detail-insurance/customer-detail-insurance.component';
import { DefeatSubmitModalComponent } from './modal/defeat-submit-modal/defeat-submit-modal.component';
import { TrackingSubmitModalComponent } from './modal/tracking-submit-modal/tracking-submit-modal.component';

export const routedComponents = [
    ListQueryComponent,
    ListRecoveryComponent,
    AssignFormModalComponent,
    RuleFormModalComponent,
    ListAssignmentComponent,
    CustomerDetailComponent,
    CustomerDetailInsuranceComponent,
    DefeatSubmitModalComponent,
    TrackingSubmitModalComponent
];

export const entriedComponents = [
    AssignFormModalComponent,
    RuleFormModalComponent,
    CustomerDetailInsuranceComponent,
    DefeatSubmitModalComponent,
    TrackingSubmitModalComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'assignment',
        pathMatch: 'full'
    },
    {
        path: 'assignment',
        component: ListAssignmentComponent,
        data: {
            title: '名单分配'
        }
    },
    {
        path: 'query',
        component: ListQueryComponent,
        data: {
            title: '名单查询'
        }
    },
    {
        path: 'recovery',
        component: ListRecoveryComponent,
        data: {
            title: '名单回收'
        }
    },
    {
        path: 'query/:type',
        component: CustomerDetailComponent,
        data: {
            title: '名单操作'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListManageRoutingModule {}
