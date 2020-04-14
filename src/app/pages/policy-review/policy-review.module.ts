import { NgModule } from '@angular/core';
import { PolicyReviewRoutingModule, routedComponents, entriedComponents } from './policy-review-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { PolicyReviewService } from './policy-review.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        PolicyReviewRoutingModule,
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
        PolicyReviewService
    ]
})
export class PolicyReviewModule {}
