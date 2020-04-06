import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { tableConfig, IData, listValue, IMessage } from './customer-import.component.config';
import { CustomerImportModalComponent } from '../modal/customer-import-modal/customer-import-modal.component';

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
    ) {
        this.customerList = [];
        this.importMessage = {
            max: 1000,
            remain: 997
        };
        this.pageInfo = new PaginationService({
            total: 200,
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
     * @desc 加载员工列表
     */
    loadCustomerList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.customerList = (listValue()).map((list: IData) => {
                if (list.progress === 'Completed') {
                    list.progressShow = '已完成(100%)';
                } else if (list.progress === 'Executing') {
                    const value = String((list.totalCount - list.pending) / list.totalCount).split('.')[0];
                    list.progressShow = `已完成(${value}%)`;
                } else {
                    list.progressShow = '已完成(0%)';
                }
                return list;
            });
            this.isLoading = false;

            if (pageChangeType === 'pageSize') {
                this.pageInfo.pageIndex = 1;
            }
        }, 2000);
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
            // if (res === 'success') {
            //     this.message.create('success', `导入成功`);
            //     this.search();
            // }
        });
    }

    /**
     * @callback
     * @desc 重新查询
     * @param customer 
     */
    requeryCustomer(customer: IData) {

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
