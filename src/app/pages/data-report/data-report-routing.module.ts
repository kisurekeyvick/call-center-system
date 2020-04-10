import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefeatAnalysisReportComponent } from './defeat-analysis/defeat-analysis.component';
import { KpiAnalysisReportComponent } from './kpi-analysis/kpi-analysis.component';
import { StatisticWorkReportComponent } from './statistic-work/statistic-work.component';
import { SuccessSubmitAnalysisReportComponent } from './success-submit-analysis/success-submit-analysis.component';

export const routedComponents = [
    DefeatAnalysisReportComponent,
    KpiAnalysisReportComponent,
    StatisticWorkReportComponent,
    SuccessSubmitAnalysisReportComponent
];

export const entriedComponents = [
    
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'workStatistic',
        pathMatch: 'full'
    },
    {
        path: 'workStatistic', 
        component: StatisticWorkReportComponent 
    },
    { 
        path: 'defeat', 
        component: DefeatAnalysisReportComponent 
    },
    { 
        path: 'kpi', 
        component: KpiAnalysisReportComponent 
    },
    {
        path: 'successSubmit', 
        component: SuccessSubmitAnalysisReportComponent 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataReportRoutingModule {}
