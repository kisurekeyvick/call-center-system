import { dictionary } from 'src/app/shared/dictionary/dictionary';
export { IRoleItem } from 'src/app/api/api.interface';

export const accountStatusList = dictionary.get('accountStatus');

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
        label: '角色',
        key: 'roleCode',
        placeholder: '请选择角色',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [

            ]
        }
    },
    {
        id: 2,
        label: '账号状态',
        key: 'accountStatus',
        placeholder: '请选择账号状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...accountStatusList
            ]
        }
    },
    {
        id: 3,
        label: '人员',
        key: 'nameOrPhone',
        placeholder: '请输入姓名或手机号',
        type: 'text',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    roleCode: string;
    accountStatus: string;
    nameOrPhone: string;
}

export const searchListModel: ISearchListModel = {
    roleCode: null,
    accountStatus: null,
    nameOrPhone: null
};

export interface IEmployeeItem {
    id: number;
    name: string;
    phone: string;
    username: string;
    password: string;
    roleCode: string;
    roleName: string;
    accountStatus: string;
    creatorTime: string;
    departmentCode: string;
    [key: string]: any;
}

export const tableConifg = {
    thead: [
        { name: '人员ID' },
        { name: '姓名' },
        { name: '手机号' },
        { name: '用户名' },
        { name: '角色' },
        { name: '账号状态' },
        { name: '创建时间' },
        { name: '操作' }
    ],
    tbody: [
        { key: 'id' },
        { key: 'name' },
        { key: 'phone' },
        { key: 'username' },
        { key: 'roleName' },
        { key: 'accountStatus' },
        { key: 'creatorTime' },
        { key: 'action' }
    ]
};

export interface ISearchListParams {
    type?: string;
    [key: string]: any;
}
