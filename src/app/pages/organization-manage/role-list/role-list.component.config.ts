export const tableConfig = {
    thead: [
        { name: '角色名称' },
        { name: '创建人' },
        { name: '创建时间' },
        { name: '操作' }
    ]
};

export const defaultRoleItem: IRoleItem = {
    roleName: '',
    createUserName: null,
    creatorTime: null,
    admin: null
};

export interface IRoleItem {
    roleName: string;
    createUserName: string;
    creatorTime: string;
    admin: boolean;
    [key: string]: any;
}

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

export const allmenu = [
    {'code': 'url_user_manager', 'name': '组织结构', 'type': 'Menu', 'index': 31,
        'childrens': [
            {'code': 'url_agentlist', 'name': '人员列表', 'type': 'Menu', 'index': 0,
                'childrens': [
                    {'code': 'button_agentlist_add', 'name': '新增人员', 'type': 'Button', 'index': 0, 'childrens': null},
                    {'code': 'button_agentlist_edit', 'name': '修改人员', 'type': 'Button', 'index': 1, 'childrens': null},
                    {'code': 'button_agentlist_delete', 'name': '删除人员', 'type': 'Button', 'index': 2, 'childrens': null}]},
            {'code': 'url_rolepermission', 'name': '角色权限', 'type': 'Menu', 'index': 1,
                'childrens': [
                    {'code': 'button_rolepermission_add', 'name': '新增角色', 'type': 'Button', 'index': 0, 'childrens': null},
                    {'code': 'button_rolepermission_edit', 'name': '修改角色', 'type': 'Button', 'index': 1, 'childrens': null},
                    {'code': 'button_rolepermission_delete', 'name': '删除角色', 'type': 'Button', 'index': 2, 'childrens': null}]}
        ]},
    {'code': 'url_marketing', 'name': '营销管理', 'type': 'Menu', 'index': 51, 
        'childrens': [
            {'code': 'url_marketing_smslist', 'name': '短信营销', 'type': 'Menu', 'index': 0,
                'childrens': [
                    {'code': 'button_smslist_sendsmsrecords', 'name': '报价短信发送记录', 'type': 'Button', 'index': 0, 'childrens': null},
                    {'code': 'button_smslist_smsrecharge', 'name': '短信充值', 'type': 'Button', 'index': 1, 'childrens': null}]
            }
        ]
    },
    {'code': 'url_camera', 'name': '摄像头', 'type': 'Menu', 'index': 21,
        'childrens': [
            {'code': 'url_camera_list', 'name': '进店列表', 'type': 'Menu', 'index': 0,
                'childrens': [
                    {'code': 'button_cameralist_assigncustomers', 'name': '分配客户', 'type': 'Button', 'index': 0, 'childrens': null},
                    {'code': 'button_cameralist_automaticassignsetting', 'name': '自动分配设置', 'type': 'Button', 'index': 2, 'childrens': null},
                    {'code': 'button_cameralist_export', 'name': '导出', 'type': 'Button', 'index': 3, 'childrens': null},
                    {'code': 'button_cameralist_carvehicle_filter', 'name': '车型过滤设置', 'type': 'Button', 'index': 1, 'childrens': null}
                ]
            },
            {'code': 'url_camera_entrystore', 'name': '进店统计', 'type': 'Menu', 'index': 11,
                'childrens': [
                    {'code': 'button_cameraentrystore_export', 'name': '导出', 'type': 'Button', 'index': 0, 'childrens': null}
                ]
            }
        ]
    }
];

export type IAllmenu = typeof allmenu;

export interface ITreeNode {
    title: string;
    key: string;
    children: ITreeNode[];
    [key: string]: any;
}
