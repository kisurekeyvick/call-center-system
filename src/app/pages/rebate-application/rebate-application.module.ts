import { NgModule } from '@angular/core';
import { RebateApplicationRoutingModule, routedComponents, entriedComponents } from './rebate-application-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { RebateApplicationService } from './rebate-application.service';

@NgModule({
    imports: [
        RebateApplicationRoutingModule,
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
        RebateApplicationService
    ]
})
export class RebateApplicationModule {}
