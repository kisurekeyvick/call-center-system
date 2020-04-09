import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { tableConifg, IAssignMember, listValue } from './list-assignment.component.config';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RuleFormModalComponent, IRuleFormCbVal, IDefaultRuleFormValueSourceItem } from './modal/rule-form/rule-form-modal.component';
import { defaultRuleForm, IRuleForm } from './modal/rule-form/rule-form-modal.component.config';

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

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService
    ) {
        this.isEditing = false;
        this.currentMounthTotalAccount = 81576;
        this.extractionListAccount = 0;
        this.ruleList = [];
    }

    ngOnInit() {
        this.loadAssignmentList();
    }

    loadAssignmentList() {
        this.isLoading = true;

        setTimeout(() => {
            this.assignMemberList = listValue();
            this.isLoading = false;
        }, 2000);
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
            const { type, value } = res;
            if (type === 'success') {
                this.message.create('success', `编辑成功`);
                this.ruleList = value;
                this.loadAssignmentList();
            }
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
                ruleForm.firstRegisterDateBegin = rule.value[0];
                ruleForm.firstRegisterDateEnd = rule.value[1];
            } else if (rule.key === 'insuranceDueDate') {
                ruleForm.insuranceDueDateBegin = rule.value[0];
                ruleForm.insuranceDueDateEnd = rule.value[1];
            } else if (rule.key === 'price') {
                ruleForm.priceBegin = String(rule.value[0]);
                ruleForm.priceEnd = String(rule.value[1]);
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
    editAssigmentAmount(member: IAssignMember) {
        this.isEditing = true;
    }

    /**
     * @callback
     * @desc 保存编辑配额
     */
    saveAssigmentAmount() {

    }

    ngOnDestroy() {}
}
