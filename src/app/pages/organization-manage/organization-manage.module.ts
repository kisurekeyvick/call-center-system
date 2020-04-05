import { NgModule } from '@angular/core';
import { OrganizationRoutingModule, routedComponents, entriedComponents } from './organization-manage-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { OrganizationService } from './organization-manage.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        OrganizationRoutingModule,
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
        OrganizationService
    ]
})
export class OrganizationModule {}
