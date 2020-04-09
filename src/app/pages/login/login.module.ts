import { NgModule } from '@angular/core';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';

const COMPONENTS = [
    LoginComponent
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        AppShareModule,
        CommonModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS,
        AppShareModule
    ],
    entryComponents: [
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}
