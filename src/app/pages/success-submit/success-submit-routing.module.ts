import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessSubmitComponent } from './success-submit.component';

export const routedComponents = [
    SuccessSubmitComponent
];

export const entriedComponents = [
    
];

const routes: Routes = [
    { path: '', component: SuccessSubmitComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuccessSubmitRoutingModule {}
