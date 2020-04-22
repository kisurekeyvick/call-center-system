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
