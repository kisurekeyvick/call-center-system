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
        component: StatisticWorkReportComponent,
        data: {
            title: '客户分布统计'
        }
    },
    { 
        path: 'defeat', 
        component: DefeatAnalysisReportComponent,
        data: {
            title: '战败分析'
        }
    },
    { 
        path: 'kpi', 
        component: KpiAnalysisReportComponent,
        data: {
            title: '战报'
        }
    },
    {
        path: 'successSubmit', 
        component: SuccessSubmitAnalysisReportComponent,
        data: {
            title: '业务员排名'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataReportRoutingModule {}
