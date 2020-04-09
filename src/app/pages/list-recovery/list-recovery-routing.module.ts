import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRecoveryComponent } from './list-recovery.component';
import { RuleFormModalComponent } from './modal/rule-form/rule-form-modal.component';
import { AssignFormModalComponent } from './modal/assign-form/assign-form-modal.component';

export const routedComponents = [
    ListRecoveryComponent,
    RuleFormModalComponent,
    AssignFormModalComponent
];

export const entriedComponents = [
    RuleFormModalComponent,
    AssignFormModalComponent
];

const routes: Routes = [
    { 
        path: '', 
        component: ListRecoveryComponent 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRecoveryRoutingModule {}
