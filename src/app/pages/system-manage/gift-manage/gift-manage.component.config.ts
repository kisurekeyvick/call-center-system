export interface IGiftItem {
    id: number;
    tenantCode: string;
    giftName: string;
    giftPrice: string;
    [key: string]: any;
}

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
        label: '赠品',
        key: 'giftName',
        placeholder: '请输入赠品名称',
        type: 'text',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    giftName: string;
}

export const searchListModel: ISearchListModel = {
    giftName: ''
};

export const tableConifg = {
    thead: [
        { name: '赠品名称' },
        { name: '价格(元)' },
        { name: '操作' }
    ]
};
