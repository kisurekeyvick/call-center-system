import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessSubmitComponent } from './success-submit.component';
import { ChangeBelongModalComponent } from './modal/change-belong/change-belong-modal.component';

export const routedComponents = [
    SuccessSubmitComponent,
    ChangeBelongModalComponent
];

export const entriedComponents = [
    ChangeBelongModalComponent
];

const routes: Routes = [
    { path: '', component: SuccessSubmitComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuccessSubmitRoutingModule {}

