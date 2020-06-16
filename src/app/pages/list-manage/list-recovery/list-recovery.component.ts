import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ISalesman, IAssignMember } from './list-recovery.component.config';
import { RuleFormModalComponent, IRuleFormCbVal, IDefaultRuleFormValueSourceItem } from '../modal/rule-form/rule-form-modal.component';
import { defaultRuleForm, IRuleForm } from '../modal/rule-form/rule-form-modal.component.config';
import { AssignFormModalComponent } from '../modal/assign-form/assign-form-modal.component';
import { ApiService } from 'src/app/api/api.service';
import { catchError, debounceTime } from 'rxjs/operators';
import { of, Subject, merge } from 'rxjs';
import { ListManageService } from '../list-manage.service';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'list-recovery-list',
    templateUrl: './list-recovery.component.html',
    styleUrls: ['./list-recovery.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class ListRecoveryComponent implements OnInit, OnDestroy {
    /** 业务员 */
    salesmanList: ISalesman[];
    /** 业务员详情信息 */
    assignMemberList: IAssignMember[];
    /** 当日业务员已分配的历史总数 */
    historyDistributionNum: number;
    /** 当前选中的业务员 */
    salesmenID: string;
    /** 名单数量 */
    listCount: number;
    /** 规则列表 */
    ruleList: Array<IDefaultRuleFormValueSourceItem>;
    /** 回收原始库弹窗 */
    confirmModal: NzModalRef;
    /** 规则设置，原数据 */
    ruleOriginValue: ICommon;
    /** 是否正在加载名单回收数 */
    isLoadingListCount: boolean;
    /** 关闭tag，进行规制查询 */
    closeTagLoadAssignNumber$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private apiService: ApiService,
        private listManageService: ListManageService
    ) {
        this.salesmanList = [];
        this.assignMemberList = [];
        this.listCount = 0;
        this.ruleList = [];
        this.isLoadingListCount = false;
    }

    ngOnInit() {
        this.loadSalesMember();
        this.loadSalesmenDistributionInfoList();
        merge(this.closeTagLoadAssignNumber$).pipe(
            debounceTime(1000)
        ).subscribe(res => {
            if (res) {
                this.loadRecoveryNumber();
            }
        });
    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesMember() {
        this.apiService.querySaleman().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.salesmanList = res.map(item => ({
                    ...item,
                    value: item.id
                }));
            }
        });
    }

    /**
     * @func
     * @desc 加载业务员贡献值信息
     */
    loadSalesmenDistributionInfoList() {
        this.listManageService.querySalesmenDistributionInfo().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.assignMemberList = res;
                this.historyDistributionNum = res.reduce((pre, cur) => {
                    pre = pre + cur.distributionNum;
                    return pre;
                }, 0);
            }
        });
    }

    /**
     * @callback
     * @desc 业务员发生更改
     */
    salesmamChange(value: string) {
        const target: ISalesman = this.salesmanList.find((salesman: ISalesman) => salesman.value === value);
        this.ruleOriginValue && this.loadRecoveryNumber();
    }

    /**
     * @callback
     * @desc 编辑规则
     */
    editRule() {
        const modal = this.modalService.create({
            nzTitle: '编辑提取规则',
            nzContent: RuleFormModalComponent,
            nzComponentParams: {
                ruleForm: this.formatRuleFormValue()
            },
            nzWidth: 930,
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: IRuleFormCbVal) => {
            const { type, value, originValue } = res;
            if (type === 'success') {
                this.message.create('success', `编辑成功`);
                this.ruleList = value;
                this.ruleOriginValue = originValue;
                this.loadRecoveryNumber();
            }
        });
    }

    /**
     * @func
     * @desc 加载名单回收数
     */
    loadRecoveryNumber() {
        if (!this.salesmenID) {
            this.message.warning('请选择业务员');
            return;
        }

        this.isLoadingListCount = true;
        const { firstRegisterDate: registerTime } = this.ruleOriginValue;
        const params: any = {
            ...this.ruleOriginValue,
            userId: this.salesmenID,
            startRegisterTime: registerTime[0] && new Date(registerTime[0]).getTime() || null,
            endRegisterTime: registerTime[1] && new Date(registerTime[1]).getTime() || null,
        };

        this.listManageService.queryTotalNumber(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.listCount = res;
            }

            this.isLoadingListCount = false;
        });
    }

    /**
     * @func
     * @desc format规则表单数据
     */
    formatRuleFormValue(): IRuleForm {
        const ruleForm: IRuleForm = defaultRuleForm();

        if (this.ruleList.length === 0) {
            return ruleForm;
        }

        this.ruleList.forEach((rule: IDefaultRuleFormValueSourceItem) => {
            if (rule.key === 'firstRegisterDate') {
                ruleForm.firstRegisterDateBegin = String(rule.value[0]);
                ruleForm.firstRegisterDateEnd = String(rule.value[1]);
            } else if (rule.key === 'insuranceDueDate') {
                ruleForm.insuranceDueDateBegin = String(rule.value[0]);
                ruleForm.insuranceDueDateEnd = String(rule.value[1]);
            } else if (rule.key === 'price') {
                ruleForm.priceBegin = String(rule.value[0]);
                ruleForm.priceEnd = String(rule.value[1]);
            } else {
                ruleForm[rule.key] = rule.value;
            }
        });

        return ruleForm;
    }

    /**
     * @callback
     * @desc 分配到原始库
     */
    recoveryToOriginDB() {
        if (!this.ruleOriginValue) {
            this.message.warning('请选择业务员,并设置回收规则，加载出回收名单数后才能进行回收');

            return;
        }

        this.confirmModal = this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '您确认回收原始库吗？',
            nzOnOk: () => {
                const params = {
                    customerQueryReqDto: {
                        ...this.ruleOriginValue,
                        userId: this.salesmenID
                    },
                    toOriginal: true,
                    distributionCustomerDtoList: []
                };

                this.listManageService.distributionCustomer(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    if (!(res instanceof TypeError)) {
                        this.message.success('回收成功');
                        this.loadSalesmenDistributionInfoList();
                    }
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消回收操作');
            }
        });
    }

    /**
     * @callback
     * @desc 分配给业务员
     */
    assignToSaleman() {
        if (!this.ruleOriginValue) {
            this.message.warning('请选择业务员,并设置回收规则，加载出回收名单数后才能进行分配');

            return;
        }

        const value = this.assignMemberList.map(item => ({
            ...item,
            todayNum: item.distributionNum,
            distributionNum: 0,
        }));

        const modal = this.modalService.create({
            nzTitle: '重新分配',
            nzContent: AssignFormModalComponent,
            nzComponentParams: {
                listCount: this.listCount,
                historyDistributionNum: value.reduce((pre, cur) => {
                    pre = pre + cur.todayNum;
                    return pre;
                }, 0),
                assignMemberList: value,
                historyAssignMemberList: value,
                customerQueryReqDto: {
                    ...this.ruleOriginValue, 
                    userId: this.salesmenID
                }
            },
            nzWidth: 900,
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `分配成功`);
                this.loadSalesmenDistributionInfoList();
            }
        });
    }

    /**
     * @callback
     * @desc 删除某个规则
     */
    deleteRuleItem(index: number) {
        this.ruleList.splice(index, 1);
        this.closeTagLoadAssignNumber$.next(true);
    }

    ngOnDestroy() {
        this.closeTagLoadAssignNumber$.unsubscribe();
    }
}
