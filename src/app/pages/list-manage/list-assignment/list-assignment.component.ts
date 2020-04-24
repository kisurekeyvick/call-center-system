import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { tableConifg, IAssignMember, listValue } from './list-assignment.component.config';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RuleFormModalComponent, IRuleFormCbVal, IDefaultRuleFormValueSourceItem } from '../modal/rule-form/rule-form-modal.component';
import { defaultRuleForm, IRuleForm } from '../modal/rule-form/rule-form-modal.component.config';
import { ApiService } from 'src/app/api/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListManageService } from '../list-manage.service';

type ITableCfg = typeof tableConifg;

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'list-assigment-list',
    templateUrl: './list-assignment.component.html',
    styleUrls: ['./list-assignment.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class ListAssignmentComponent implements OnInit, OnDestroy {
    /** 分配人员列表 */
    assignMemberList: IAssignMember[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 是否处于编辑状态 */
    isEditing: boolean;
    /** 当月名单总数 */
    currentMounthTotalAccount: number;
    /** 提取名单数 */
    extractionListAccount: number;
    /** 提取规则展示 */
    ruleList: Array<IDefaultRuleFormValueSourceItem>;
    /** 可分配总数 */
    totalNumber: number;
    /** 剩余可分配的总数 */
    lastAssignNumber: number;
    /** 规则设置缓存 */
    customerQueryReqDto: ICommon;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private apiService: ApiService,
        private listManageService: ListManageService
    ) {
        this.isEditing = false;
        this.currentMounthTotalAccount = 81576;
        this.extractionListAccount = 0;
        this.ruleList = [];
        this.totalNumber = 0;
        this.lastAssignNumber = 0;
    }

    ngOnInit() {
        this.loadAssignmentList();
    }

    loadAssignmentList() {
        this.isLoading = true;

        this.apiService.querySaleman().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.assignMemberList = res.map(item => ({
                    ...item,
                    amount: 0
                }));
            }
            this.isLoading = false;
        });
    }

    /**
     * @callback
     * @desc 编辑提取规则
     */
    editRule() {
        const modal = this.modalService.create({
            nzTitle: '编辑提取规则',
            nzContent: RuleFormModalComponent,
            nzComponentParams: {
                ruleForm: this.formatRuleFormValue()
            },
            nzWidth: 700,
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: IRuleFormCbVal) => {
            const { type, value, originValue } = res;
            if (type === 'success') {
                this.message.create('success', `编辑成功`);
                this.ruleList = value;

                this.loadTotalNumber(originValue);
            }
        });
    }

    /**
     * @func
     * @desc 加载符合条件的总数量
     */
    loadTotalNumber(originValue) {
        const { firstRegisterDate: registerTime } = originValue;
        const params = {
            ...originValue,
            startRegisterTime: registerTime[0] && new Date(registerTime[0]).getTime() || null,
            endRegisterTime: registerTime[1] && new Date(registerTime[1]).getTime() || null,
        };

        this.customerQueryReqDto = params;

        this.listManageService.queryTotalNumber(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (typeof res === 'number') {
                this.totalNumber = res;
                this.lastAssignNumber = res;
            }
        });
    }

    /**
     * @callback
     * @desc 分配发生改变
     * @param assignMember 
     */
    amountChange(assignMember: IAssignMember) {
        const totalNumber = this.assignMemberList.reduce((pre: number, next: IAssignMember) => {
            pre = pre + (next.amount || 0);
            return pre;
        }, 0);

        if (totalNumber > this.totalNumber) {
            this.message.error('已超过可配置数额').onClose.subscribe(() => {
                assignMember.amount = 0;
            });
        } else if (totalNumber <= this.totalNumber) {
            this.lastAssignNumber = this.totalNumber - totalNumber;
        }
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
                ruleForm.minPurchasePrice = String(rule.value[0]);
                ruleForm.maxPurchasePrice = String(rule.value[1]);
            } {
                ruleForm[rule.key] = rule.value;
            }
        });

        return ruleForm;
    }

    /**
     * @callback
     * @desc 删除某个规则
     */
    deleteRuleItem(index: number) {
        this.ruleList.splice(index, 1);
    }

    /**
     * @func
     * @desc format弹窗传递回来的表单值
     * @param ruleFormValue 
     */
    dealWidthCbFormValue(ruleFormValue: IDefaultRuleFormValueSourceItem[]) {
    }

    /**
     * @callback
     * @desc 编辑配额数量
     * @param member 
     */
    editAssigmentAmount() {
        if (this.customerQueryReqDto) {
            this.isEditing = true;
        } else {
            this.message.warning('只有先选择规则，查询当前可分配总额，才能对业务员进行分配数额');
        }
    }

    /**
     * @callback
     * @desc 保存编辑配额
     */
    saveAssigmentAmount() {
        const distributionCustomerDtoList = this.assignMemberList.map(member => {
            return {
                number: member.amount,
                userId: member.id
            };
        });
        const params = {
            ...this.customerQueryReqDto,
            distributionCustomerDtoList
        };

        this.listManageService.distributionCustomer(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.message.success('分配成功');
        });
    }

    ngOnDestroy() {}
}
