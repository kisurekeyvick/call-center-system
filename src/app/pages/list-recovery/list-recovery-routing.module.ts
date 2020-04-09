import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRecoveryComponent } from './list-recovery.component';

export const routedComponents = [
    ListRecoveryComponent
];

export const entriedComponents = [

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
