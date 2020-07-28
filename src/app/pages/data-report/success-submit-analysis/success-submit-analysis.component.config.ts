export const kpiParams = [
    {
        name: '业务员',
        code: ''
    },
    {
        name: '续保数', 
        code: 'renewalNumber',
    }, {
        name: '新保数',
        code: 'renewalNewNumber',
    }, {
        name: '首拨数', 
        code: 'firstCallNumber',
    }, {
        name: '预约数', 
        code: 'appointmentNumber',
    }, {
        name: '成功数', 
        code: 'successNumber',
    }, {
        name: '失败数', 
        code: 'failNumber',
    }, {
        name: '无效数', 
        code: 'invalidNumber',
    }, {
        name: '单交强数', 
        code: 'onlyCompulsoryNumber',
    }, {
        name: '新保成功率',
        code: 'rate',
    }, {
        name: '续保成功率',
        code: 'renewalRate'
    }
];

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
        label: '日期',
        key: 'time',
        placeholder: '请选择日期',
        type: 'dateRange',
        grid: commonGrid,
    },
];

export interface ISearchListModel {
    time: string[];
}

export const searchListModel: ISearchListModel = {
    time: [],
};

export interface ISource {
    appointmentNumber: number;
    failNumber: number;
    firstCallNumber: number;
    invalidNumber: number;
    onlyCompulsoryNumber: number;
    rate: number;
    renewalNewNumber: number;
    renewalNumber: number;
    successNumber: number;
    userId: number;
    userName: string;
}