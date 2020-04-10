import { NgModule } from '@angular/core';
import { DataReportRoutingModule, routedComponents, entriedComponents } from './data-report-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { DataReportService } from './data-report.service';

@NgModule({
    imports: [
        DataReportRoutingModule,
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
        DataReportService
    ]
})
export class DataReportModule {}
