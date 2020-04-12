import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
/** layout */
import { AppAdminLayoutComponent } from 'src/app/layout/admin/admin.component';
import { SalesmanOperationComponent } from 'src/app/layout/salesman-operation/salesman-operation.component';

const COMPONENTS = [
    AppAdminLayoutComponent,
    SalesmanOperationComponent
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        RouterModule,
        AppShareModule,
        CommonModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS,
        RouterModule,
        AppShareModule
    ]
})
export class AppLayoutModule {}
