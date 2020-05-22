import { dictionary } from 'src/app/shared/dictionary/dictionary';

export const rebateApplicationStatusList = dictionary.get('rebateApplicationStatusList');
export const insuranceCompanysList = dictionary.get('insuranceCompanys');
export const carTypeList = dictionary.get('carType');

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
    nzLg: '8',  
    nzXl: '6',
    nzXXl: '6'
};

const commonGrid = {
    label: { nzXs: '24', nzSm: '10', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '14', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '申请人',
        key: 'userId',
        placeholder: '请选择申请人',
        type: 'select',
        grid: commonGrid,
        config: {
            options: []
        }
    },
    {
        id: 2,
        label: '客户姓名',
        key: 'customerName',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid
    },
    // {
    //     id: 3,
    //     label: '车牌',
    //     key: 'plate',
    //     placeholder: '请输入车牌',
    //     type: 'text',
    //     grid: commonGrid
    // },
    {
        id: 4,
        label: '状态',
        key: 'handleStatus',
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
        label: '申请日期',
        key: 'createDate',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 6,
        label: '保险公司',
        key: 'companyCode',
        type: 'select',
        placeholder: '请选择保险公司',
        grid: commonGrid,
        config: {
            options: [
                ...insuranceCompanysList
            ]
        }
    }
];

export interface ISearchListModel {
    userId: string;
    customerName: string;
    // plate: string;
    handleStatus: string;
    createDate: string[];
    // createDateBegin: string;
    // createDateEnd: string;
    companyCode: string;
}

export const searchListModel: ISearchListModel = {
    userId: '',
    customerName: '',
    // plate: '',
    handleStatus: '',
    createDate: [],
    // createDateBegin: '',
    // createDateEnd: '',
    companyCode: ''
};

export const tableConifg = {
    thead: [
        { name: '申请人' },
        { name: '申请日期' },
        { name: '客户姓名' },
        { name: '车牌' },
        { name: '保险公司' },
        // { name: '类别' },
        { name: '商业险金额' },
        { name: '返现比率%' },
        { name: '超出金额' },
        { name: '状态' },
        { name: '操作' }
    ]
};

export interface IRebateApplicationItem {
    userName: string;
    applyDate: string;
    customerName: string;
    carNo: string;
    /** 保险公司 */
    companyCode: string;
    companyName: string;
    /** 类别 */
    carTypeCode: string;
    carTypeCodeName: string;
    /** 商业险金额 */
    commercialSumPremium: string;
    /** 超出金额 */
    overPrice: string;
    /** 状态 */
    handleState: string;
    handleStateName: string;
    [key: string]: any;
}
