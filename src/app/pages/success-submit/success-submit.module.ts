import { NgModule } from '@angular/core';
import { SuccessSubmitRoutingModule, routedComponents, entriedComponents } from './success-submit-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { SuccessSubmitService } from './success-submit.service';

@NgModule({
    imports: [
        SuccessSubmitRoutingModule,
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
        SuccessSubmitService
    ]
})
export class SuccessSubmitModule {}
