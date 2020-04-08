import { NgModule } from '@angular/core';
import { ListQueryRoutingModule, routedComponents, entriedComponents } from './list-query-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { ListQueryService } from './list-query.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ListQueryRoutingModule,
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
        ListQueryService
    ]
})
export class ListQueryModule {}
