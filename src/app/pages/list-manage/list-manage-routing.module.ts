import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListQueryComponent } from './list-query/list-query.component';
import { ListRecoveryComponent } from './list-recovery/list-recovery.component';
import { AssignFormModalComponent } from './modal/assign-form/assign-form-modal.component';
import { RuleFormModalComponent } from './modal/rule-form/rule-form-modal.component';
import { ListAssignmentComponent } from './list-assignment/list-assignment.component';

export const routedComponents = [
    ListQueryComponent,
    ListRecoveryComponent,
    AssignFormModalComponent,
    RuleFormModalComponent,
    ListAssignmentComponent
];

export const entriedComponents = [
    AssignFormModalComponent,
    RuleFormModalComponent
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListManageRoutingModule {}