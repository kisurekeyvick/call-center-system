import { dictionary } from 'src/app/shared/dictionary/dictionary';

export const companyList = dictionary.get('insuranceCompanys');
const ownerShipList = dictionary.get('category');
export const renewalStateList = dictionary.get('renewalState');
export const rebateApplicationStatusList = dictionary.get('rebateApplicationStatusList');

export interface ISearchListItem {
    id: number;
    label?: string;
    placeholder?: string;
    type: string;
    config?: any;
    [key: string]: any;
}

export const searchListLayout = {
    nzXs: '24',  
    nzMd: '12', 
    nzLg: '12', 
    nzXl: '8',
    nzXXl: '6'
};

const commonGrid = {
    label: { nzXs: '24', nzSm: '7', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '15', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '客户姓名',
        key: 'customerName',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 2,
        label: '手机号',
        key: 'customerPhone',
        placeholder: '请输入客户手机号',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 3,
        label: '状态',
        key: 'handleState',
        placeholder: '请选择状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...rebateApplicationStatusList
            ]
        }
    },
    {
        id: 5,
        label: '品牌',
        key: 'brandName',
        placeholder: '输入品牌',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 6,
        label: '车牌号',
        key: 'carNo',
        placeholder: '输入车牌号',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 7,
        label: '是否在职',
        key: 'inJob',
        placeholder: '请选择是否在职',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: true }, { name: '否', value: false }]
        }
    },
    {
        id: 8,
        label: '是否高端车',
        key: 'isHigh',
        placeholder: '请选择是否高端车',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: true }, { name: '否', value: false }]
        }
    },
    {
        id: 9,
        label: '是否过户',
        key: 'isTransfer',
        placeholder: '请选择是是否过户',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: true }, { name: '否', value: false }]
        }
    },
    {
        id: 10,
        label: '去年保险公司',
        key: 'lastCompanyCode',
        placeholder: '请选择去年保险公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...companyList
            ]
        }
    },
    {
        id: 11,
        label: '指导价',
        placeholder: '',
        type: 'numberRange',
        grid: commonGrid,
        config: {
            start: {
                key: 'minPurchasePrice',
                min: 0,
                max: Infinity,
                step: 1
            },
            end: {
                key: 'maxPurchasePrice',
                min: 0,
                max: Infinity,
                step: 1
            }
        }
    },
    {
        id: 12,
        label: '车辆所属',
        placeholder: '请选择车辆所属',
        key: 'ownerShip',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...ownerShipList
            ]
        }
    },
    {
        id: 13,
        label: '是否续保车',
        placeholder: '请选择是否续保车',
        key: 'renewalState',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: '1' }, { name: '否', value: '2' }]
        }
    },
    {
        id: 14,
        label: '初登日期',
        key: 'registerTime',
        type: 'dateRange',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    customerName: string;
    customerPhone: string;
    handleState: string;
    brandName: string;
    carNo: string;
    inJob: boolean;
    isHigh: boolean;
    isTransfer: boolean;
    lastCompanyCode: string;
    minPurchasePrice: number;
    maxPurchasePrice: number;
    ownerShip: string;
    renewalState: string;
    registerTime: string[];
    [key: string]: any;
}

export const searchListModel: ISearchListModel = {
    customerName: null,
    customerPhone: null,
    handleState: null,
    brandName: null,
    carNo: null,
    inJob: null,
    isHigh: null,
    isTransfer: null,
    lastCompanyCode: null,
    minPurchasePrice: null,
    maxPurchasePrice: null,
    ownerShip: null,
    renewalState: null,
    registerTime: []
};

export const tableConfig = {
    thead: [
        { name: '车牌号' },
        { name: '客户名称' },
        { name: '车架号' },
        { name: '品牌型号' },
        { name: '注册日期' },
        { name: '商业险到期时间' },
        { name: '交强险到期时间' },
        { name: '去年投保公司' },
        { name: '客户类型' },
        { name: '归属人' },
        { name: '更新时间' },
        { name: '操作' }
    ]
};

export interface IPolicyReviewItem {
    carId: string;
    carNo: string;
    customerName: string;
    vinNo: string;
    brandName: string;
    enrollDate: string;
    commercialEndTime: string;
    compulsoryEndTime: string;
    lastCompanyCode: string;
    lastCompanyName: string;
    customerType: string;
    assigneeName: string;
    modifierTime: string;
    [key: string]: any;
}
