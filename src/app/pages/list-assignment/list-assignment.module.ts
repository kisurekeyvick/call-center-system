import { NgModule } from '@angular/core';
import { ListAssigmentRoutingModule, routedComponents, entriedComponents } from './list-assignment-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { ListAssigmentService } from './list-assignment.service';

@NgModule({
    imports: [
        ListAssigmentRoutingModule,
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
        ListAssigmentService
    ]
})
export class ListAssignMentModule {}
