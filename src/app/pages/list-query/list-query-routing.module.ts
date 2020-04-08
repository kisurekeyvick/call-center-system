import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListQueryComponent } from './list-query.component';

export const routedComponents = [
    ListQueryComponent
];

export const entriedComponents = [

];

const routes: Routes = [
    { 
        path: '', 
        component: ListQueryComponent 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListQueryRoutingModule {}
