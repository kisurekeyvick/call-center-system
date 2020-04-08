export const tableConifg = {
    thead: [
        { name: '保险公司' },
        { name: '折扣' },
        // { name: '创建时间' },
        { name: '操作' }
    ]
};

export interface IRatioSettingListItem {
    id?: number;
    companyCode: string;
    discountUpperLimit: number;
    createTime?: string;
    [key: string]: any;
}

export const defaultRatioItem: IRatioSettingListItem = {
    companyCode: null,
    discountUpperLimit: null
};

export const listValue = (): IRatioSettingListItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            companyCode: '',
            companyName: '平安',
            discountUpperLimit: 90,
            createTime: '2020-4-8 16:15'
        }
    });
};
