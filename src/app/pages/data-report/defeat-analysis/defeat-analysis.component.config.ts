export interface IFailReasonItem {
    failReason: string;
    number: number;
}

export interface ISource {
    userName: string;
    userId: number;
    failReasonList: IFailReasonItem[];
}

export interface IDefeatReasonItem {
    id?: number;
    defeatReason: string;
    isDelete?: string;
    [key: string]: any;
}

export interface ITableBodyItem {
    defeatReason: string;
    userInfo: Array<{
        userName: string;
        number: number;
    }>;
    [key: string]: any;
}

export interface ITable {
    head: Array<{  userName: string }>;
    body: ITableBodyItem[];
}
