import { NgModule } from '@angular/core';
import { InnerhtmlpipePipe } from './pipe/innerhtml.pipe';

const PIPES = [
    InnerhtmlpipePipe
];

@NgModule({
    imports: [],
    exports: [
        ...PIPES
    ],
    declarations: [
        ...PIPES
    ]
})
export class AppShareModule {}
