import { dictionary } from 'src/app/shared/dictionary/dictionary';

const outDocTypeList = dictionary.get('outDocTypeList');
const insuranceCompanysList = dictionary.get('insuranceCompanys');
const auditStatusList = dictionary.get('auditStatus');
const receiptStatusList = dictionary.get('receiptStatus');

export interface ISearchListItem {
    id: number;
    label?: string;
    placeholder?: string;
    type: string;
    config?: any;
    [key: string]: any;
}

const commonGrid = {
    label: { nzXs: '24', nzSm: '7', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '15', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '姓名',
        key: 'insured',
        placeholder: '请输入姓名',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 2,
        label: '车牌',
        key: 'plate',
        placeholder: '请输入车牌',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 3,
        label: '是否出单',
        key: 'outDocType',
        placeholder: '请选择是否出单',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...outDocTypeList
            ]
        }
    },
    {
        id: 4,
        label: '保险公司',
        key: 'companyCode',
        placeholder: '请选择保险公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...insuranceCompanysList
            ]
        }
    },
    {
        id: 5,
        label: '业务员',
        key: 'salesmanId',
        placeholder: '请选择业务员',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    },
    {
        id: 6,
        label: '提交日期',
        key: 'submitTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 7,
        label: '审核状态',
        key: 'outAuditStatus',
        placeholder: '请选择审核状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...auditStatusList
            ]
        }
    },
    {
        id: 8,
        label: '收单状态',
        key: 'receiptStatus',
        placeholder: '请选择收单状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...receiptStatusList
            ]
        }
    },
    {
        id: 9,
        label: '收单日期',
        key: 'receiptTime',
        type: 'dateRange',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    insured: string;
    plate: string;
    outDocType: string;
    companyCode: string;
    salesmanId: string;
    submitTime: string;
    submitTimeBegin: string;
    submitTimeEnd: string;
    outAuditStatus: string;
    receiptStatus: string;
    receiptTime: string;
    receiptTimeBegin: string;
    receiptTimeEnd: string;
}

export const searchListModel: ISearchListModel = {
    insured: '',
    plate: '',
    outDocType: '',
    companyCode: '',
    salesmanId: '',
    submitTime: '',
    submitTimeBegin: '',
    submitTimeEnd: '',
    outAuditStatus: '',
    receiptStatus: '',
    receiptTime: '',
    receiptTimeBegin: '',
    receiptTimeEnd: ''
};

export const tableConfig = {
    thead: [
        { name: '姓名' },
        { name: '车牌' },
        { name: '是否出单' },
        { name: '出单日期' },
        { name: '保险公司' },
        { name: '业务员' },
        { name: '提交日期' },
        { name: '审核状态' },
        { name: '收单状态' },
        { name: '收单日期' },
        { name: '操作' }
    ]
};

export interface IPolicyReviewItem {
    taskId: number;
    insured: string;
    plate: string;
    outDocTypeName: string;
    outConfirmTime: string;
    companyName: string;
    salesmanName: string;
    submitTime: string;
    outAuditStatusName: string;
    receiptStatusName: string;
    receiptTime: string;
    [key: string]: any;
}

export const listValue = (): IPolicyReviewItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            taskId: index,
            insured: '白绍科',
            plate: '冀AFC327',
            outDocTypeName: '未出单',
            outConfirmTime: '',
            companyName: '人保',
            salesmanName: '鲍芙蓉',
            submitTime: '2020-04-14',
            outAuditStatusName: '待审核',
            receiptStatusName: '未收单',
            receiptTime: '2020-04-24'
        };
    });
};
