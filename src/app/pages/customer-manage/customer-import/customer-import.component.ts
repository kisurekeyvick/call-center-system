import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { tableConfig, IData, listValue, IMessage } from './customer-import.component.config';
import { CustomerImportModalComponent } from '../modal/customer-import-modal/customer-import-modal.component';
import { CustomerService } from '../customer-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

type ITableCfg = typeof tableConfig;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'customer-import',
    templateUrl: './customer-import.component.html',
    styleUrls: ['./customer-import.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class CustomerImportComponent implements OnInit, OnDestroy {
    /** 客户列表table展示数据 */
    customerList: IData[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 提示语 */
    importMessage: IMessage;
    /** 删除model */
    deleteConfirmModal: NzModalRef;
    
    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private customerService: CustomerService
    ) {
        this.customerList = [];
        this.importMessage = {
            max: 1000,
            remain: 997
        };
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
        this.isLoading = true;
    }

    ngOnInit() {
        this.search();
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        this.loadCustomerList({});
    }

    /**
     * @func
     * @desc 加载导入数据情况
     */
    loadCustomerList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam = {
            ...params,
            basePageInfo: {
                pageNum: pageIndex,
                pageSize
            }
        };

        this.customerService.queryImportList(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                const { list, total } = res;
                this.customerList = list;
                this.pageInfo.total = total;
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            }
        });
    }

    /**
     * @callback
     * @desc 导入数据
     */
    importCustomer() {
        const modal = this.modalService.create({
            nzTitle: '导入数据',
            nzContent: CustomerImportModalComponent,
            nzComponentParams: {},
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `导入成功`);
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 查看详情
     * @param customer 
     */
    customerDetail(customer: IData) {
        this.router.navigate(['customer/list']);
    }

    /**
     * @callback
     * @desc 下载客户数据excel
     * @param customer 
     */
    downloadCustomer(customer: IData) {
        
    }

    /**
     * @callback
     * @desc 删除客户数据
     * @param customer 
     */
    deleteCustomer(customer: IData) {
        this.deleteConfirmModal = this.modalService.confirm({
            nzTitle: '删除批续',
            nzContent: '删除后，此文件中的数据不会同步删除，但会停止执行续保查询，是否继续？',
            nzOnOk: () => {
                this.message.create('success', '删除成功');
            }
        });
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        this.loadCustomerList({}, property);
    }

    ngOnDestroy() {}
} 
