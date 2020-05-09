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
        type: 'month',
        grid: commonGrid,
    },
];

export interface ISearchListModel {
    time: string;
}

export const searchListModel: ISearchListModel = {
    time: null,
};

