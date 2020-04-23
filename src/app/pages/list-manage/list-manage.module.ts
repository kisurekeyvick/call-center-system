import { NgModule } from '@angular/core';
import { ListManageRoutingModule, routedComponents, entriedComponents } from './list-manage-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { ListManageService } from './list-manage.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ListManageRoutingModule,
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
        ListManageService
    ]
})
export class ListManageModule {}
