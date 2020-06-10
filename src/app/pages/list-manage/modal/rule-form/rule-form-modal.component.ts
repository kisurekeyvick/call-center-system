import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRuleForm, defaultRuleForm, defaultRuleFormValueSource, IDefaultRuleFormValueSourceItem } from './rule-form-modal.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import * as dayjs from 'dayjs';
export { IRuleFormCbVal, IDefaultRuleFormValueSourceItem } from './rule-form-modal.component.config';

@Component({
    selector: 'rule-form-modal',
    templateUrl: './rule-form-modal.component.html',
    styleUrls: ['./rule-form-modal.component.scss']
})
export class RuleFormModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 表单选项列表 */
    formList = {
        isTransferList: [{ name: '是', value: true }, { name:'否', value: false }],
        isRenewalList: [{ name: '是', value: '1' },{ name: '否', value: '2' }],
        inJobList: [{ name: '是', value: true }, { name:'否', value: false }],
        isHighList: [{ name: '是', value: true }, { name:'否', value: false }],
        // isOnlyCompulsoryList: dictionary.get('isOnlyCompulsory'),
        insuranceCompanysList: dictionary.get('insuranceCompanys'),
        ownerShipList: dictionary.get('category'),
        distributionList: [{ name: '已经分配', value: '1' }, { name: '未分配', value: '2' }],
        appointmentLevelList: dictionary.get('appointmentLevel'),
        customerStatusList: dictionary.get('customerStatus')
    };

    @Input() ruleForm: IRuleForm = {...defaultRuleForm()};

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        const ruleForm = this.ruleForm;
        const { firstRegisterDateBegin, firstRegisterDateEnd, 
            // insuranceDueDateBegin, insuranceDueDateEnd 
        } = ruleForm;

        this.validateForm = this.fb.group({
            /** 初登日期 */
            firstRegisterDate: [firstRegisterDateBegin ? [firstRegisterDateBegin, firstRegisterDateEnd] : []],
            /** 车龄 */
            // ageInterval: [ruleForm.ageInterval || null],
            /** 厂牌型号 */
            brandName: [ruleForm.brandName || null],
            /** 车辆所属 */
            ownerShip: [ruleForm.ownerShip || null],
            /** 是否过户车 */
            isTransfer: [ruleForm.isTransfer || null],
            /** 是否续保 */
            renewalState: [ruleForm.renewalState || null],
            /** 否单交强 */
            // isOnlyCompulsory: [ruleForm.isOnlyCompulsory || null],
            /** 是否在职续保 */
            inJob: [ruleForm.inJob || null],
            /** 是否高端车 */
            isHigh: [ruleForm.isHigh || null],
            /** 保险到期 */
            // insuranceDueDate: [insuranceDueDateBegin ? [insuranceDueDateBegin, insuranceDueDateEnd] : []],
            /** 上年保险公司 */
            lastCompanyCode: [ruleForm.lastCompanyCode || null],
            /** 车价 */
            minPurchasePrice: [ruleForm.minPurchasePrice || null],
            maxPurchasePrice: [ruleForm.maxPurchasePrice || null],
            /** 市场 */
            // market: [ruleForm.market || null],
            /** 车牌 */
            carNo: [ruleForm.carNo || null, [this.validPlate]],
            isDistribution: [ruleForm.isDistribution || '2'],
            /** 批次 */
            batchNo: [ruleForm.batchNo || null],
            /** 客户状态 */
            handleState: [ruleForm.handleState || null],
            /** 客户预约类型 */
            appointmentLevel: [ruleForm.appointmentLevel || null]
        });
    }

    submitForm(): void {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            this.modal.destroy({
                type: 'success',
                value: this.formatValidateFormValue(),
                originValue: this.validateForm.value
            });
        }
    }

    /**
     * @func
     * @desc 整理有值的表单数据
     */
    formatValidateFormValue(): IDefaultRuleFormValueSourceItem[] {
        const form = this.validateForm.value;
        const result: IDefaultRuleFormValueSourceItem[] = [];
        
        const formatVal = (target: IDefaultRuleFormValueSourceItem, value): string => {
            if (target.key === 'firstRegisterDate' || target.key === 'insuranceDueDate') {
                return `${dayjs(value[0]).format('YYYY-MM-DD')}至${dayjs(value[1]).format('YYYY-MM-DD')}`;
            }

            if (target.key === 'price') {
                return `${value[0]}至${value[1]}`;
            }

            if (target.key === 'ownerShip') {
                return this.formList.ownerShipList.find(list => list.value === value).name;
            }

            if (target.key === 'isTransfer') {
                return this.formList.isTransferList.find(list => list.value === value).name;
            }

            if (target.key === 'renewalState') {
                return this.formList.isRenewalList.find(list => list.value === value).name;
            }

            // if (target.key === 'isOnlyCompulsory') {
            //     return this.formList.isOnJobRenewalList.find(list => list.value === value).name;
            // }

            if (target.key === 'lastCompanyCode') {
                return this.formList.insuranceCompanysList.find(list => list.value === value).name;
            }

            if (target.key === 'inJob') {
                return this.formList.inJobList.find(list => list.value === value).name;
            }

            if (target.key === 'isHigh') {
                return this.formList.isHighList.find(list => list.value === value).name;
            }

            if (target.key === 'isDistribution') {
                return this.formList.distributionList.find(list => list.value === value).name;
            }

            if (target.key === 'handleState') {
                return this.formList.customerStatusList.find(list => list.value === value).name;
            }

            if (target.key === 'appointmentLevel') {
                return this.formList.appointmentLevelList.find(list => list.value === value).name;
            }

            return value;
        };

        const keysArr = Object.keys(form);
        for (let i = 0; i < keysArr.length; i++) {
            let key = keysArr[i];
            let value = form[key];

            if (key === 'maxPurchasePrice') {
                continue;
            }

            if (key === 'minPurchasePrice') {
                key = 'price';
                value = form['minPurchasePrice'] ? [form['minPurchasePrice'], form['maxPurchasePrice']] : [];
            }

            if ((value !== null && !(value instanceof Array)) || (value instanceof Array && value.length > 0)) {
                const target: IDefaultRuleFormValueSourceItem = defaultRuleFormValueSource.find((item: IDefaultRuleFormValueSourceItem) => item.key === key);
                result.push({
                    ...target,
                    value,
                    formatValue: formatVal(target, value)
                });
            }
        }

        return result;
    }

    /**
     * @func
     * @desc 验证车牌是否符合要求
     */
    validPlate = (control: FormControl): { [s: string]: boolean } =>  {
        const reg = /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/;

        if (!control.value) {
            return {};
        } else if (!reg.test(control.value)) {
            return { confirm: true, error: true };
        }

        return {};
    }

    cancel() {
        this.modal.destroy({
            type: 'cancel'
        });
    }

    ngOnDestroy() {}
}
