export interface IRoleItem {
    roleCode: string;
    roleName: string;
    creatorId: number;
    createUserName: string;
    permissions: Array<any> | null;
    creatorTime: string;
    admin: boolean;
    systemRole: boolean;
}

export interface IPermission {
    title?: string;
    key?: string;
    code: string;
    name: string;
    type: string;
    index: number;
    childrens: IPermission[] | null;
    [key: string]: any;
}
