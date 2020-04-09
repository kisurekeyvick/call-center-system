import { NgModule } from '@angular/core';
import { ListRecoveryRoutingModule, routedComponents, entriedComponents } from './list-recovery-routing.module';
import { AppShareModule } from 'src/app/shared/share.module';
import { ListRecoveryService } from './list-recovery.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ListRecoveryRoutingModule,
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
        ListRecoveryService
    ]
})
export class ListRecoveryModule {}
