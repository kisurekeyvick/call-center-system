import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialReportComponent } from './financial-report.component';

export const routedComponents = [
    FinancialReportComponent
];

export const entriedComponents = [

];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: FinancialReportComponent,
        data: {
            title: '财务报表'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialReportRoutingModule {}
