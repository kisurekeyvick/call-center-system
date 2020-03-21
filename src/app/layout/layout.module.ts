import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AppShareModule } from 'src/app/shared/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
/** layout */
import { AppAdminLayoutComponent } from 'src/app/layout/admin/admin.component';

const COMPONENTS = [
    AppAdminLayoutComponent
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        RouterModule,
        AppShareModule,
        BrowserModule,
        CommonModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS,
        RouterModule,
        AppShareModule,
        BrowserModule
    ]
})
export class AppLayoutModule {}
