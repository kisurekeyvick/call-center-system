import { NgModule } from '@angular/core';
import { SystemRoutingModule, routedComponents, entriedComponents } from './system-manage-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { SystemManageService } from './system-manage.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SystemRoutingModule,
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
        SystemManageService
    ]
})
export class SystemManageModule {}
