import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyReviewListComponent } from './policy-review-list/policy-review-list.component';
import { PolicyReviewDetailComponent } from './policy-review-detail/policy-review-detail.component';
import { RegisterAgainModalComponent } from './modal/register-again/register-again-modal.component';
import { ConfirmOutDocModalComponent } from './modal/confirm-outDoc/confirm-outDoc-modal.component';

export const routedComponents = [
    PolicyReviewListComponent,
    PolicyReviewDetailComponent,
    RegisterAgainModalComponent,
    ConfirmOutDocModalComponent
];

export const entriedComponents = [
    RegisterAgainModalComponent,
    ConfirmOutDocModalComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: PolicyReviewListComponent,
        data: {
            title: '保单审核列表'
        }
    },
    {
        path: 'list/detail',
        component: PolicyReviewDetailComponent,
        data: {
            title: '保单审核详情'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PolicyReviewRoutingModule {}
