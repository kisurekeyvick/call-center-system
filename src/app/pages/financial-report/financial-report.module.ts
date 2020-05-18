import { NgModule } from '@angular/core';
import { FinancialReportRoutingModule, routedComponents, entriedComponents } from './financial-report-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { FinancialReportService } from './financial-report.service';

@NgModule({
    imports: [
        FinancialReportRoutingModule,
        AppShareModule,
        CommonModule
    ],
    declarations: [
        ...routedComponents
    ],
    exports: [

    ],
    entryComponents: [
        ...entriedComponents
    ],
    providers: [
        FinancialReportService
    ]
})
export class FinancialReportModule {}
