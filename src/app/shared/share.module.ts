import { NgModule } from '@angular/core';
import { InnerhtmlpipePipe } from './pipe/innerhtml.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

const PIPES = [
    InnerhtmlpipePipe
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        FormsModule
    ],
    exports: [
        ...PIPES,
        NgZorroAntdModule,
        FormsModule
    ],
    declarations: [
        ...PIPES
    ]
})
export class AppShareModule {}
