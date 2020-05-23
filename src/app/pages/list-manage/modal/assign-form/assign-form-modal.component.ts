import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { tableConifg, ISalesman } from './assign-form-modal.component.config';
import { IAssignMember } from '../../list-recovery/list-recovery.component.config';
import { ListManageService } from '../../list-manage.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

type ITableCfg = typeof tableConifg;

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'assign-form-modal',
    templateUrl: './assign-form-modal.component.html',
    styleUrls: ['./assign-form-modal.component.scss']
})
export class AssignFormModalComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 可分配总数 */
    totalNumber = 0;
    /** 剩余可分配的总数 */
    lastAssignNumber: number;

    @Input() listCount = 0;
    /** 业务员列表 */
    @Input() assignMemberList: IAssignMember[] = [];
    /** 历史业务员列表 */
    @Input() historyAssignMemberList: IAssignMember[] = [];
    /** 规则设置缓存 */
    @Input() customerQueryReqDto: ICommon;
    /** 当日业务员已分配的历史总数 */
    @Input() historyDistributionNum: number;

    constructor(
        private modal: NzModalRef,
        private listManageService: ListManageService,
        private message: NzMessageService
    ) {
        this.isLoading = false;
    }

    ngOnInit() {
        this.totalNumber = this.listCount;
    }

    /**
     * @callback
     * @desc 分配发生改变
     * @param assignMember 
     */
    distributionNumChange(assignMember: IAssignMember) {
        /** 当次分配总量 = 数据总分配 - 今日历史已分配 */
        const totalNumber = this.assignMemberList.reduce((pre: number, next: IAssignMember) => {
            pre = pre + (next.distributionNum || 0) + (next.todayNum || 0);
            return pre;
        }, 0) - this.historyDistributionNum;

        if (totalNumber > this.totalNumber) {
            this.message.error('已超过可配置数额').onClose.subscribe(() => {
                assignMember.distributionNum = 0;
            });
        } else if (totalNumber <= this.totalNumber) {
            this.lastAssignNumber = this.totalNumber - totalNumber;
        }
    }

    /**
     * @callback
     * @desc 取消
     */
    cancel() {
        this.modal.destroy('cancel');
    }

    /**
     * @callback
     * @desc 保存
     */
    save() {
        this.isLoading = true;

        const distributionCustomerDtoList = this.assignMemberList.map(member => {
            return {
                number: member.distributionNum,
                userId: member.userId
            };
        });

        const params = {
            customerQueryReqDto: {
                ...this.customerQueryReqDto
            },
            distributionCustomerDtoList
        };

        this.listManageService.distributionCustomer(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.modal.destroy('success');
            }

            this.isLoading = false;
        });
    }

    ngOnDestroy() {}
}
