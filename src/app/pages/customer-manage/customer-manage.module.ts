import { NgModule } from '@angular/core';
import { CustomerRoutingModule, routedComponents, entriedComponents } from './customer-manage-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CustomerService } from './customer-manage.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CustomerRoutingModule,
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
        CustomerService
    ]
})
export class CustomerModule {}
