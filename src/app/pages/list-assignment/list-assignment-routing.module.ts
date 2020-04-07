import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAssignmentComponent } from './list-assignment.component';
import { RuleFormModalComponent } from './modal/rule-form/rule-form-modal.component';

export const routedComponents = [
    ListAssignmentComponent,
    RuleFormModalComponent
];

export const entriedComponents = [
    RuleFormModalComponent
];

const routes: Routes = [
    { path: '', component: ListAssignmentComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListAssigmentRoutingModule {}
