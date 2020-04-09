export interface IRoleItem {
    name: string;
    value: string;
    [key: string]: any;
}

export interface ILoginUserCache {
    username: string;
    password: string;
    remember: boolean;
}

export const defaultLoginUserCache = {
    username: null,
    password: null,
    remember: null
};
