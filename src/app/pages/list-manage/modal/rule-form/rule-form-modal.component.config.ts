/** 表单需要展示的数据结构 */
export interface IRuleForm {
    /** 初登日期 */
    firstRegisterDateBegin: string;
    firstRegisterDateEnd: string;
    /** 车龄 */
    // ageInterval: string;
    /** 厂牌型号 */
    brandName: string;
    /** 车辆所属 */
    ownerShip: string;
    /** 是否过户车 */
    isTransfer: string;
    /** 是否续保 */
    renewalState: string;
    /** 否单交强 */
    // isOnlyCompulsory: string;
    /** 是否在职续保 */
    inJob: string;
    /** 是否高端车 */
    isHigh: string;
    /** 保险到期 */
    // insuranceDueDateBegin: string;
    // insuranceDueDateEnd: string;
    /** 上年保险公司 */
    lastCompanyCode: string;
    /** 车价 */
    minPurchasePrice: string;
    maxPurchasePrice: string;
    /** 市场 */
    // market: string;
    /** 车牌 */
    carNo: string;
    /** 批次 */
    // remark: string;
    /** 是否分配 */
    isDistribution: string;
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
    { name: '厂牌型号', key: 'brandName', value: '', formatValue: '' },
    { name: '车辆所属', key: 'ownerShip', value: '', formatValue: '' },
    { name: '是否过户车', key: 'isTransfer', value: '', formatValue: '' },
    { name: '是否续保', key: 'renewalState', value: '', formatValue: '' },
    // { name: '否单交强', key: 'isOnlyCompulsory', value: '', formatValue: '' },
    { name: '是否在职续保', key: 'inJob', value: '', formatValue: '' },
    { name: '是否高端车', key: 'isHigh', value: '', formatValue: '' },
    // { name: '保险到期', key: 'insuranceDueDate', value: [], formatValue: '' },
    { name: '上年保险公司', key: 'lastCompanyCode', value: '', formatValue: '' },
    { name: '车价', key: 'price', value: [], formatValue: '' },
    { name: '车牌', key: 'carNo', value: '', formatValue: '' },
    { name: '是否分配', key: 'isDistribution', value: '', formatValue: '' }
];

/** 整理默认数据源，变成IRuleForm的对象结构 */
export const defaultRuleForm = (): IRuleForm => {
    const value: any = {};

    defaultRuleFormValueSource.forEach((form: IDefaultRuleFormValueSourceItem) => {
        if (form.key === 'firstRegisterDate') {
            value['firstRegisterDateBegin'] = null;
            value['firstRegisterDateEnd'] = null;
        } else if (form.key === 'insuranceDueDate') {
            value['insuranceDueDateBegin'] = null;
            value['insuranceDueDateEnd'] = null;
        } else if (form.key === 'price') {
            value['minPurchasePrice'] = null;
            value['maxPurchasePrice'] = null;
        } else {
            value[form.key] = form.value;
        }
    });

    return value;
};

export interface IRuleFormCbVal {
    type: 'success' | 'cancel';
    value?: IDefaultRuleFormValueSourceItem[];
    originValue?: {
        [key: string]: any;
    };
}
