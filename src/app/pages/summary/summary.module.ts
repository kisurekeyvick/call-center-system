import { NgModule } from '@angular/core';
import { SummaryRoutingModule, routedComponents, entriedComponents } from './summary-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { SummaryService } from './summary.service';

@NgModule({
    imports: [
        SummaryRoutingModule,
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
        SummaryService
    ]
})
export class SummaryModule {}
