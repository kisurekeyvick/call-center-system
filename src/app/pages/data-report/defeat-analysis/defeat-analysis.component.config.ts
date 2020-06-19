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
