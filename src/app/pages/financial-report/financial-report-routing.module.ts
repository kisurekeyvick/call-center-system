import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialReportComponent } from './financial-report.component';
import { SetOrderFinanceFormModalComponent } from './modal/set-order-finance/set-order-finance.component';

export const routedComponents = [
    FinancialReportComponent,
    SetOrderFinanceFormModalComponent
];

export const entriedComponents = [
    SetOrderFinanceFormModalComponent
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
