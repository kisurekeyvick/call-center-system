import { IRoleItem } from 'src/app/api/api.interface';

export { IRoleItem } from 'src/app/api/api.interface'; 

export const tableConfig = {
    thead: [
        { name: '角色名称' },
        { name: '创建人' },
        { name: '创建时间' },
        { name: '操作' }
    ]
};

export const defaultRoleItem: IRoleItem = {
    roleCode: null,
    roleName: '',
    creatorId: null,
    permissions: null,
    createUserName: null,
    creatorTime: null,
    admin: null,
    systemRole: null
};

export const roleList: IRoleItem[] = [
    {
        roleCode: 'role_super_manager',
        roleName: '超级管理员',
        creatorId: 0,
        createUserName: null,
        permissions: null,
        creatorTime: '',
        systemRole: true,
        admin: true,
    },
    {
        roleCode: 'role_extendman',
        roleName: '延保专员',
        creatorId: 196,
        createUserName: null,
        permissions: [],
        creatorTime: '2019-09-09 19:46:07',
        systemRole: true,
        admin: false
    },
    {
        roleCode: '6f3845e3d3ae4b559ed9baa73346af94',
        roleName: '业务员二',
        creatorId: 11,
        createUserName: '赛思',
        permissions: [],
        creatorTime: '2019-04-11 17:36:38',
        systemRole: false,
        admin: false
    },
    {
        roleCode: 'role_seatmember',
        roleName: '坐席',
        creatorId: 0,
        createUserName: null,
        permissions: [],
        creatorTime: '2019-05-07 21:33:52',
        systemRole: true,
        admin: false
    }
];

export interface IFormatPermissionItem {
    code: string;
    type: string;
    [key: string]: any;
}
