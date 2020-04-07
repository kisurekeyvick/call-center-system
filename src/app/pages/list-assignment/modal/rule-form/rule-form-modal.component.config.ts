/** 表单需要展示的数据结构 */
export interface IRuleForm {
    /** 初登日期 */
    firstRegisterDateBegin: string;
    firstRegisterDateEnd: string;
    /** 车龄 */
    // ageInterval: string;
    /** 厂牌型号 */
    brandModel: string;
    /** 车辆所属 */
    category: string;
    /** 是否过户车 */
    isChangeOwner: string;
    /** 是否续保 */
    isRenewal: string;
    /** 否单交强 */
    isOnlyCompulsory: string;
    /** 是否在职续保 */
    isOnJobRenewal: string;
    /** 是否高端车 */
    isLuxuryCar: string;
    /** 保险到期 */
    insuranceDueDateBegin: string;
    insuranceDueDateEnd: string;
    /** 上年保险公司 */
    preInsuranceCompanys: string;
    /** 车价 */
    priceBegin: string;
    priceEnd: string;
    /** 市场 */
    // market: string;
    /** 车牌 */
    plate: string;
    /** 批次 */
    // remark: string;
    [key: string]: any;
}

export interface IDefaultRuleFormValueSourceItem {
    name: string;
    key: string;
    value: Array<string> | string | Array<number>;
    formatValue: string;
    [key: string]: any;
}

/** 默认数据源 */
export const defaultRuleFormValueSource: IDefaultRuleFormValueSourceItem[] = [
    { name: '初登日期', key: 'firstRegisterDate', value: [], formatValue: '' },
    { name: '厂牌型号', key: 'brandModel', value: '', formatValue: '' },
    { name: '车辆所属', key: 'category', value: '', formatValue: '' },
    { name: '是否过户车', key: 'isChangeOwner', value: '', formatValue: '' },
    { name: '是否续保', key: 'isRenewal', value: '', formatValue: '' },
    { name: '否单交强', key: 'isOnlyCompulsory', value: '', formatValue: '' },
    { name: '是否在职续保', key: 'isOnJobRenewal', value: '', formatValue: '' },
    { name: '是否高端车', key: 'isLuxuryCar', value: '', formatValue: '' },
    { name: '保险到期', key: 'insuranceDueDate', value: [], formatValue: '' },
    { name: '上年保险公司', key: 'preInsuranceCompanys', value: '', formatValue: '' },
    { name: '车价', key: 'price', value: [], formatValue: '' },
    { name: '车牌', key: 'plate', value: '', formatValue: '' }
];

/** 整理默认数据源，变成IRuleForm的对象结构 */
export const defaultRuleForm = (): IRuleForm => {
    let value: any = {};

    defaultRuleFormValueSource.forEach((form: IDefaultRuleFormValueSourceItem) => {
        if (form.key === 'firstRegisterDate') {
            value['firstRegisterDateBegin'] = null;
            value['firstRegisterDateEnd'] = null;
        } else if (form.key === 'insuranceDueDate') {
            value['insuranceDueDateBegin'] = null;
            value['insuranceDueDateEnd'] = null;
        } else if (form.key === 'price') {
            value['priceBegin'] = null;
            value['priceEnd'] = null;
        } else {
            value[form.key] = form.value;
        }
    });

    return value;
};

export interface IRuleFormCbVal {
    type: 'success' | 'cancel',
    value?: IDefaultRuleFormValueSourceItem[];
}