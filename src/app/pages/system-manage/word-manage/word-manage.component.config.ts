export interface IWordItem {
    id?: number;
    brief: string;
    details: string;
    [key: string]: any;
}

export const defaultWordItem: IWordItem = {
    brief: '',
    details: '',
    isDelete: '1'
};
