import { dictionary } from 'src/app/shared/dictionary/dictionary';

export const companyList = dictionary.get('insuranceCompanys');
const ownerShipList = dictionary.get('category');
export const renewalStateList = dictionary.get('renewalState');
export const internalOrderStatusList = dictionary.get('internalOrderStatus');

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
    label: { nzXs: '24', nzSm: '9', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '15', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '姓名',
        key: 'customerName',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 6,
        label: '车牌',
        key: 'carNo',
        placeholder: '输入车牌',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 15,
        label: '投保公司',
        key: 'companyCode',
        placeholder: '请选择上年保险公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...companyList
            ]
        }
    },
    {
        id: 16,
        label: '业务员',
        key: 'userId',
        placeholder: '请选择业务员',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    },
    {
        id: 17,
        label: '提交日期',
        key: 'commitTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 18,
        label: '审核状态',
        key: 'handleState',
        placeholder: '请选择审核状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...internalOrderStatusList
            ]
        }
    },
    {
        id: 19,
        label: '出单日期',
        key: 'orderTime',
        type: 'dateRange',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    customerName: string;
    carNo: string;
    companyCode: string;
    userId: string;
    commitTime: string[];
    handleState: string;
    orderTime: string[];
    [key: string]: any;
}

export const searchListModel: ISearchListModel = {
    customerName: null,
    carNo: null,
    companyCode: null,
    userId: null,
    commitTime: [],
    handleState: null,
    orderTime: []
};

export const tableConfig = {
    thead: [
        { name: '姓名', type: 'fixed-left' },
        { name: '车牌' },
        { name: '保险公司' },
        { name: '业务员' },
        { name: '提交日期' },
        { name: '审核状态' },
        { name: '出单日期' }
    ]
};

export interface IQueryListItem {
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

export interface ISalesman {
    memberId: number;
    regionId: number;
    regionName: string;
    salesmanName: string;
    teamId: number;
    teamName: string;
    [key: string]: any;
}
