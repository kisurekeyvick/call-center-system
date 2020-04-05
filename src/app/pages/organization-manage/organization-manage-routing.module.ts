import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { EmployeeFormComponent } from './modal/employee-form/employee-form-modal.component';

export const routedComponents = [
    EmployeesListComponent,
    RoleListComponent,
    EmployeeFormComponent
];

export const entriedComponents = [
    EmployeeFormComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full'
    },
    { 
        path: 'employees', 
        component: EmployeesListComponent 
    },
    {
        path: 'role',
        component: RoleListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationRoutingModule {}
