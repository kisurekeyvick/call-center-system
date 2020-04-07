import { NgModule } from '@angular/core';
import { GiftRoutingModule, routedComponents, entriedComponents } from './gift-manage-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { GiftService } from './gift-manage.service';

@NgModule({
    imports: [
        GiftRoutingModule,
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
        GiftService
    ]
})
export class GiftModule {}
