import { dictionary } from 'src/app/shared/dictionary/dictionary';

const rebateApplicationStatusList = dictionary.get('rebateApplicationStatusList');

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
        label: '申请人',
        key: 'applyName',
        placeholder: '请输入申请人',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 2,
        label: '客户姓名',
        key: 'name',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 3,
        label: '车牌',
        key: 'plate',
        placeholder: '请输入车牌',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 4,
        label: '状态',
        key: 'status',
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
        label: '状态',
        key: 'company',
        type: 'text',
        placeholder: '请输入',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    applyName: string;
    name: string;
    plate: string;
    status: string;
    createDateBegin: string;
    createDateEnd: string;
    companyCode: string;
    companyAreaCode: string;
    docCateCode: string;
}

export const searchListModel: ISearchListModel = {
    applyName: '',
    name: '',
    plate: '',
    status: '',
    createDateBegin: '',
    createDateEnd: '',
    companyCode: '',
    companyAreaCode: '',
    docCateCode: ''
};

export const tableConifg = {
    thead: [
        { name: '申请人' },
        { name: '申请日期' },
        { name: '客户姓名' },
        { name: '车牌' },
        { name: '保险公司' },
        { name: '类别' },
        { name: '商业险金额' },
        { name: '返现比率' },
        { name: '超出金额' },
        { name: '最高返现比率' },
        { name: '申请种类' },
        { name: '状态' },
        { name: '操作' }
    ]
};

