export const tableConifg = {
    thead: [
        { name: '战败原因' },
        { name: '操作' }
    ]
};

export interface IDefeatReasonItem {
    id?: number;
    defeatReason: string;
    isDelete?: string;
    [key: string]: any;
};

export const defaultDefeatReason: IDefeatReasonItem = {
    defeatReason: ''
};

export const listValue = (): IDefeatReasonItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            defeatReason: '太菜了',
            isDelete: '1',
            isDeleteName: '已经删除'
        }
    });
};