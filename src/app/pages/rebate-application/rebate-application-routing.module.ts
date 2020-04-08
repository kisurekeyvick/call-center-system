import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RebateApplicationComponent } from './rebate-application.component';

export const routedComponents = [
    RebateApplicationComponent
];

export const entriedComponents = [
];

const routes: Routes = [
    { path: '', component: RebateApplicationComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RebateApplicationRoutingModule {}
