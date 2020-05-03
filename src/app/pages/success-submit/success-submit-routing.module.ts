import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessSubmitComponent } from './success-submit.component';
import { ChangeBelongModalComponent } from './modal/change-belong/change-belong-modal.component';
import { SuccessSubmitDetailComponent } from './success-submit-detail/success-submit-detail.component';

export const routedComponents = [
    SuccessSubmitComponent,
    ChangeBelongModalComponent,
    SuccessSubmitDetailComponent
];

export const entriedComponents = [
    ChangeBelongModalComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    { 
        path: 'list', 
        component: SuccessSubmitComponent,
        data: {
            title: '保单查询列表'
        }
    },
    {
        path: 'list/detail',
        component: SuccessSubmitDetailComponent,
        data: {
            title: '保单详情'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuccessSubmitRoutingModule {}

