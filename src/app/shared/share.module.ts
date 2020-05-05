import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/** 公共组件 */
import { SearchListComponent } from 'src/app/shared/component/search-list/search-list.component';
import { SearchListPaginationComponent } from 'src/app/shared/component/search-list-pagination/search-list-pagination.component';
import { WordHelpComponent } from 'src/app/shared/component/word-help/word-help.component';
import { CustomerDetailInsuranceComponent } from 'src/app/shared/component/customer-detail-insurance/customer-detail-insurance.component';

/** 管道 */
import { InnerhtmlpipePipe } from './pipe/innerhtml.pipe';

const PIPES = [
    InnerhtmlpipePipe
];

const COMPONENT = [
    SearchListComponent,
    SearchListPaginationComponent,
    WordHelpComponent,
    CustomerDetailInsuranceComponent
];

const SERVICE = [
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        ...PIPES,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        ...COMPONENT,
        CommonModule
    ],
    declarations: [
        ...PIPES,
        ...COMPONENT
    ],
    providers: [
        ...SERVICE
    ]
})
export class AppShareModule {}
