export interface IGiftItem {
    name: string;
    count: string;
    desc?: string;
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
        key: 'name',
        placeholder: '请输入赠品名称',
        type: 'text',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    name: string;
}

export const searchListModel: ISearchListModel = {
    name: ''
};

export const tableConifg = {
    thead: [
        { name: '赠品名称' },
        { name: '数量' },
        { name: '功能描述' },
        { name: '操作' }
    ]
};

export const listValue = (): IGiftItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            name: `赠品 ${index + 1}`,
            count: Math.random()*100,
            desc: `功能描述-${Math.random()}`,
        };
    });
};
