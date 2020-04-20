import { IRoleItem } from './api.interface';
export * from './api.interface';

export const roleValue = (): IRoleItem[] => {
    return [
        {
            'roleCode': 'role_super_manager',
            'roleName': '超级管理员',
            'creatorId': 0,
            'createUserName': null,
            'permissions': null,
            'creatorTime': null,
            'admin': true,
            'systemRole': true
        },
        {
            'roleCode': 'role_extendman',
            'roleName': '延保专员',
            'creatorId': 196,
            'createUserName': '测四',
            'permissions': [
                'url_extensionins',
                'url_extensionins_contract',
                'url_extensionins_contract_list',
                'button_extensioninscontract_export',
                'button_extensioninscontract_edit',
                'button_extensioninscontract_print',
                'button_extensioninscontract_del',
                'button_extensioninscontract_detail',
                'button_extensioninscontract_tuibao',
                'url_extensionins_memberpayment_list',
                'button_extensioninsmemberpayment_confirmpayment',
                'button_extensioninsmemberpayment_print',
                'url_extensionins_surrender_list',
                'button_sure_surrender'
            ],
            'creatorTime': '2019-09-09 19:46:07',
            'admin': false,
            'systemRole': true
        },
        {
            'roleCode': 'role_seatmember',
            'roleName': '坐席',
            'creatorId': 179,
            'createUserName': '太原顺宝行宝马店',
            'permissions': [
                'url_customer_manager',
                'url_customers',
                'button_customers_delete',
                'url_recyclebin',
                'button_recyclebin_emptytrash',
                'button_recyclebin_revoke',
                'url_car_insurance',
                'url_renewal',
                'replace_quote',
                'url_insuretrack',
                'url_issuelist',
                'url_defeatlist',
                'url_camera',
                'url_camera_list',
                'url_statisticalreport',
                'url_statisticalreport_workload',
                'url_statisticalreport_analysisofdefeat',
                'url_statisticalreport_outputanalysis',
                'url_marketing',
                'url_marketing_smslist',
                'button_smslist_sendsmsrecords'
            ],
            'creatorTime': '2019-06-27 00:52:50',
            'admin': false,
            'systemRole': true
        },
        {
            'roleCode': 'role_salesman',
            'roleName': '业务员',
            'creatorId': 179,
            'createUserName': '太原顺宝行宝马店',
            'permissions': [
                'url_customer_manager',
                'url_customers',
                'button_customers_assign',
                'button_customers_transfer',
                'button_customers_retrieve',
                'button_customers_insuretracksetting',
                'url_recyclebin',
                'button_recyclebin_revoke',
                'url_car_insurance',
                'url_renewal',
                'replace_quote',
                'url_insuretrack',
                'url_issuelist',
                'url_defeatlist',
                'url_extensionins',
                'url_extensionins_contract',
                'url_extensionins_contract_list',
                'button_extensioninscontract_edit',
                'button_extensioninscontract_print',
                'button_extensioninscontract_del',
                'button_extensioninscontract_detail',
                'url_extensionins_memberpayment_list',
                'button_extensioninsmemberpayment_confirmpayment',
                'button_extensioninsmemberpayment_print',
                'url_camera',
                'url_camera_list',
                'button_cameralist_assigncustomers',
                'button_cameralist_automaticassignsetting',
                'button_cameralist_carvehicle_filter',
                'url_camera_entrystore',
                'url_user_manager',
                'url_agentlist',
                'button_agentlist_add',
                'button_agentlist_edit',
                'url_rolepermission',
                'button_rolepermission_add',
                'button_rolepermission_edit',
                'url_statisticalreport',
                'url_statisticalreport_workload',
                'url_statisticalreport_customer',
                'url_statisticalreport_analysisofdefeat',
                'url_statisticalreport_outputanalysis',
                'url_marketing',
                'url_marketing_smslist',
                'button_smslist_sendsmsrecords',
                'url_system_setup',
                'url_quote_channel',
                'button_quotechannel_enabledisabled',
                'url_customer_setting',
                'url_defeat_reason_setting',
                'button_add_reason',
                'button_edit_reason',
                'button_del_reason'
            ],
            'creatorTime': '2019-06-27 00:52:50',
            'admin': false,
            'systemRole': true
        },
        {
            'roleCode': 'role_manager',
            'roleName': '续保部管理员',
            'creatorId': 179,
            'createUserName': '太原顺宝行宝马店',
            'permissions': [
                'url_customer_manager',
                'url_customers',
                'button_customers_assign',
                'button_customers_transfer',
                'button_customers_retrieve',
                'button_customers_insuretracksetting',
                'button_customers_export',
                'button_customers_delete',
                'url_dataimport',
                'button_dataimport_import',
                'url_recyclebin',
                'button_recyclebin_emptytrash',
                'button_recyclebin_revoke',
                'url_car_insurance',
                'url_renewal',
                'replace_quote',
                'url_insuretrack',
                'button_insuretrack_transfercustomers',
                'button_insuretrack_export',
                'url_issuelist',
                'button_issurelist_export',
                'url_defeatlist',
                'url_camera',
                'url_camera_list',
                'button_cameralist_assigncustomers',
                'button_cameralist_automaticassignsetting',
                'button_cameralist_carvehicle_filter',
                'button_cameralist_export',
                'url_user_manager',
                'url_agentlist',
                'button_agentlist_add',
                'button_agentlist_edit',
                'button_agentlist_delete',
                'url_rolepermission',
                'button_rolepermission_add',
                'button_rolepermission_edit',
                'button_rolepermission_delete',
                'url_statisticalreport',
                'url_statisticalreport_workload',
                'button_workload_export',
                'url_statisticalreport_analysisofdefeat',
                'url_statisticalreport_outputanalysis',
                'url_marketing',
                'url_marketing_smslist',
                'button_smslist_sendsmsrecords',
                'url_system_setup',
                'url_quote_channel',
                'button_quotechannel_enabledisabled',
                'url_customer_setting',
                'url_defeat_reason_setting',
                'button_add_reason',
                'button_edit_reason',
                'button_del_reason'
            ],
            'creatorTime': '2019-06-27 00:52:50',
            'admin': false,
            'systemRole': true
        },
        {
            'roleCode': 'role_ybbmanager',
            'roleName': '延保部管理员',
            'creatorId': 0,
            'createUserName': null,
            'permissions': [
                'url_extensionins',
                'url_extensionins_contract',
                'url_extensionins_contract_list',
                'button_extensioninscontract_export',
                'button_extensioninscontract_edit',
                'button_extensioninscontract_print',
                'button_extensioninscontract_del',
                'button_extensioninscontract_detail',
                'button_extensioninscontract_tuibao',
                'url_extensionins_memberpayment_list',
                'button_extensioninsmemberpayment_confirmpayment',
                'button_extensioninsmemberpayment_print',
                'url_extensionins_surrender_list',
                'button_sure_surrender',
                'url_user_manager',
                'url_agentlist',
                'button_agentlist_add'
            ],
            'creatorTime': '2019-09-10 09:57:26',
            'admin': false,
            'systemRole': true
        },
        {
            'roleCode': 'role_renewaler',
            'roleName': '续保员',
            'creatorId': 179,
            'createUserName': '太原顺宝行宝马店',
            'permissions': [
                'url_customer_manager',
                'url_customers',
                'button_customers_delete',
                'url_recyclebin',
                'button_recyclebin_emptytrash',
                'button_recyclebin_revoke',
                'url_car_insurance',
                'url_renewal',
                'replace_quote',
                'url_insuretrack',
                'url_issuelist',
                'url_defeatlist',
                'url_camera',
                'url_camera_list',
                'url_statisticalreport',
                'url_statisticalreport_workload',
                'url_statisticalreport_analysisofdefeat',
                'url_statisticalreport_outputanalysis',
                'url_marketing',
                'url_marketing_smslist',
                'button_smslist_sendsmsrecords'
            ],
            'creatorTime': '2019-06-27 00:52:50',
            'admin': false,
            'systemRole': true
        }
    ];
};

export const userProfile = () => {
    return {
        'id': 11,
        'name': '赛思',
        'username': '17319328862',
        'password': '$2a$10$tHKhkRFJwJrXjqw68BU3LOmj9TBBO0Ozp1.NEBFmO4EBSdbAVrCUC',
        'phone': '17319328861',
        'tenantCode': 'sbh',
        'departmentCode': '',
        'departmentName': null,
        'accountStatus': 'Using',
        'roleCode': null,
        'roleName': '超级管理员',
        'creatorTime': null,
        'deleteFlag': false,
        'menus': []
    };
};

export const permissionAll = () => {
    return [
        {
            'code': 'url_user_manager',
            'name': '组织结构',
            'type': 'Menu',
            'index': 31,
            'childrens': [
                {
                    'code': 'url_agentlist',
                    'name': '人员列表',
                    'type': 'Menu',
                    'index': 0,
                    'childrens': [
                        {
                            'code': 'button_agentlist_add',
                            'name': '新增人员',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_agentlist_edit',
                            'name': '修改人员',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        },
                        {
                            'code': 'button_agentlist_delete',
                            'name': '删除人员',
                            'type': 'Button',
                            'index': 2,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_rolepermission',
                    'name': '角色权限',
                    'type': 'Menu',
                    'index': 1,
                    'childrens': [
                        {
                            'code': 'button_rolepermission_add',
                            'name': '新增角色',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_rolepermission_edit',
                            'name': '修改角色',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        },
                        {
                            'code': 'button_rolepermission_delete',
                            'name': '删除角色',
                            'type': 'Button',
                            'index': 2,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_marketing',
            'name': '营销管理',
            'type': 'Menu',
            'index': 51,
            'childrens': [
                {
                    'code': 'url_marketing_smslist',
                    'name': '短信营销',
                    'type': 'Menu',
                    'index': 0,
                    'childrens': [
                        {
                            'code': 'button_smslist_sendsmsrecords',
                            'name': '报价短信发送记录',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_camera',
            'name': '摄像头',
            'type': 'Menu',
            'index': 21,
            'childrens': [
                {
                    'code': 'url_camera_list',
                    'name': '进店列表',
                    'type': 'Menu',
                    'index': 0,
                    'childrens': [
                        {
                            'code': 'button_cameralist_assigncustomers',
                            'name': '分配客户',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_cameralist_automaticassignsetting',
                            'name': '自动分配设置',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        },
                        {
                            'code': 'button_cameralist_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 2,
                            'childrens': null
                        },
                        {
                            'code': 'button_cameralist_carvehicle_filter',
                            'name': '车型过滤设置',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_camera_entrystore',
                    'name': '进店统计',
                    'type': 'Menu',
                    'index': 11,
                    'childrens': [
                        {
                            'code': 'button_cameraentrystore_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_system_setup',
            'name': '系统设置',
            'type': 'Menu',
            'index': 61,
            'childrens': [
                {
                    'code': 'url_quote_channel',
                    'name': '报价渠道',
                    'type': 'Menu',
                    'index': 0,
                    'childrens': [
                        {
                            'code': 'button_quotechannel_enabledisabled',
                            'name': '启用禁用',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_customer_setting',
                    'name': '客户设置',
                    'type': 'Menu',
                    'index': 1,
                    'childrens': null
                },
                {
                    'code': 'url_defeat_reason_setting',
                    'name': '战败原因设置',
                    'type': 'Menu',
                    'index': 2,
                    'childrens': [
                        {
                            'code': 'button_add_reason',
                            'name': '新增原因',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_edit_reason',
                            'name': '编辑',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        },
                        {
                            'code': 'button_del_reason',
                            'name': '删除',
                            'type': 'Button',
                            'index': 2,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_customer_manager',
            'name': '客户管理',
            'type': 'Menu',
            'index': 0,
            'childrens': [
                {
                    'code': 'url_customers',
                    'name': '客户列表',
                    'type': 'Menu',
                    'index': 0,
                    'childrens': [
                        {
                            'code': 'button_customers_assign',
                            'name': '分配客户',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_customers_insuretracksetting',
                            'name': '投保跟踪设置',
                            'type': 'Button',
                            'index': 3,
                            'childrens': null
                        },
                        {
                            'code': 'button_customers_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 4,
                            'childrens': null
                        },
                        {
                            'code': 'button_customers_delete',
                            'name': '删除',
                            'type': 'Button',
                            'index': 5,
                            'childrens': null
                        },
                        {
                            'code': 'button_customers_transfer',
                            'name': '转移客户',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        },
                        {
                            'code': 'button_customers_retrieve',
                            'name': '回收客户',
                            'type': 'Button',
                            'index': 2,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_dataimport',
                    'name': '数据导入',
                    'type': 'Menu',
                    'index': 1,
                    'childrens': [
                        {
                            'code': 'button_dataimport_import',
                            'name': '导入数据',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_recyclebin',
                    'name': '回收站',
                    'type': 'Menu',
                    'index': 2,
                    'childrens': [
                        {
                            'code': 'button_recyclebin_emptytrash',
                            'name': '清空回收站',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_recyclebin_revoke',
                            'name': '撤销',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_extensionins',
            'name': '汽车延保',
            'type': 'Menu',
            'index': 16,
            'childrens': [
                {
                    'code': 'url_extensionins_contract',
                    'name': '合同录入',
                    'type': 'Menu',
                    'index': 11,
                    'childrens': null
                },
                {
                    'code': 'url_extensionins_contract_list',
                    'name': '合同列表',
                    'type': 'Menu',
                    'index': 21,
                    'childrens': [
                        {
                            'code': 'button_extensioninscontract_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 11,
                            'childrens': null
                        },
                        {
                            'code': 'button_extensioninscontract_edit',
                            'name': '编辑',
                            'type': 'Button',
                            'index': 21,
                            'childrens': null
                        },
                        {
                            'code': 'button_extensioninscontract_print',
                            'name': '打印',
                            'type': 'Button',
                            'index': 31,
                            'childrens': null
                        },
                        {
                            'code': 'button_extensioninscontract_del',
                            'name': '删除',
                            'type': 'Button',
                            'index': 41,
                            'childrens': null
                        },
                        {
                            'code': 'button_extensioninscontract_detail',
                            'name': '详情',
                            'type': 'Button',
                            'index': 51,
                            'childrens': null
                        },
                        {
                            'code': 'button_extensioninscontract_tuibao',
                            'name': '退保',
                            'type': 'Button',
                            'index': 61,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_extensionins_memberpayment_list',
                    'name': '会员缴费',
                    'type': 'Menu',
                    'index': 31,
                    'childrens': [
                        {
                            'code': 'button_extensioninsmemberpayment_confirmpayment',
                            'name': '确认缴费',
                            'type': 'Button',
                            'index': 11,
                            'childrens': null
                        },
                        {
                            'code': 'button_extensioninsmemberpayment_print',
                            'name': '打印',
                            'type': 'Button',
                            'index': 21,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_extensionins_surrender_list',
                    'name': '退保退款',
                    'type': 'Menu',
                    'index': 41,
                    'childrens': [
                        {
                            'code': 'button_sure_surrender',
                            'name': '确认退款',
                            'type': 'Button',
                            'index': 11,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_statisticalreport',
            'name': '统计报表',
            'type': 'Menu',
            'index': 41,
            'childrens': [
                {
                    'code': 'url_statisticalreport_workload',
                    'name': '工作统计',
                    'type': 'Menu',
                    'index': 1,
                    'childrens': [
                        {
                            'code': 'button_workload_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_statisticalreport_analysisofdefeat',
                    'name': '战败分析',
                    'type': 'Menu',
                    'index': 11,
                    'childrens': null
                },
                {
                    'code': 'url_statisticalreport_outputanalysis',
                    'name': '出单分析',
                    'type': 'Menu',
                    'index': 21,
                    'childrens': null
                },
                {
                    'code': 'url_statisticalreport_customer',
                    'name': '客户统计',
                    'type': 'Menu',
                    'index': 5,
                    'childrens': [
                        {
                            'code': 'button_salesmandetail_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                }
            ]
        },
        {
            'code': 'url_car_insurance',
            'name': '车险投保',
            'type': 'Menu',
            'index': 11,
            'childrens': [
                {
                    'code': 'url_renewal',
                    'name': '新增报价',
                    'type': 'Menu',
                    'index': 0,
                    'childrens': [
                        {
                            'code': 'replace_quote',
                            'name': '允许代报价(不改变归属人)',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_insuretrack',
                    'name': '投保跟踪',
                    'type': 'Menu',
                    'index': 1,
                    'childrens': [
                        {
                            'code': 'button_insuretrack_transfercustomers',
                            'name': '转移客户',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        },
                        {
                            'code': 'button_insuretrack_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 1,
                            'childrens': null
                        }
                    ]
                },
                {
                    'code': 'url_defeatlist',
                    'name': '战败列表',
                    'type': 'Menu',
                    'index': 3,
                    'childrens': null
                },
                {
                    'code': 'url_issuelist',
                    'name': '出单列表',
                    'type': 'Menu',
                    'index': 2,
                    'childrens': [
                        {
                            'code': 'button_issurelist_export',
                            'name': '导出',
                            'type': 'Button',
                            'index': 0,
                            'childrens': null
                        }
                    ]
                }
            ]
        }
    ]
};

export const appointmentCalendarData = () => {
    return [
        {
        'date': '2020-04-20',
        'hadAppointmentNumber': 1,
        'canAppointmentNumber': 0
        },
        {
        'date': '2020-04-21',
        'hadAppointmentNumber': 0,
        'canAppointmentNumber': 0
        },
        {
        'date': '2020-04-22',
        'hadAppointmentNumber': 0,
        'canAppointmentNumber': 0
        },
        {
        'date': '2020-04-23',
        'hadAppointmentNumber': 0,
        'canAppointmentNumber': 0
        },
        {
        'date': '2020-04-24',
        'hadAppointmentNumber': 0,
        'canAppointmentNumber': 0
        },
        {
        'date': '2020-04-25',
        'hadAppointmentNumber': 0,
        'canAppointmentNumber': 0
        },
        {
        'date': '2020-04-26',
        'hadAppointmentNumber': 0,
        'canAppointmentNumber': 0
        }
    ]
};

export const queryFirstCallAndAppointmentTrackData = () => {
    return [
        {
            'id': 3,
            'tenantCode': '',
            'customerId': 'f287445058b045d4991ba65f954b3ed6',
            'batchNo': '',
            'customerName': '张三',
            'customerPhone': '',
            'otherContact': '',
            'idCard': '',
            'customerAddress': '',
            'carNo': '',
            'vinNo': '',
            'engineNo': null,
            'brandName': '',
            'registerTime': '2020-04-20T03:08:33.000+0000',
            'ownerShip': '',
            'isTransfer': false,
            'renewalState': '',
            'modelCode': '',
            'purchasePrice': 0,
            'displacement': '',
            'seatNumber': 0,
            'usage': '',
            'validityDate': '2020-04-20T03:08:33.000+0000',
            'commercialStartTime': '2020-04-20T03:08:33.000+0000',
            'commercialEndTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryStartTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryEndTime': '2020-04-20T03:08:33.000+0000',
            'handleState': '1',
            'rebateRemarks': '',
            'defeatId': 0,
            'defeatReason': '',
            'isDistribution': '1',
            'distributionDate': '2020-04-20T03:08:33.000+0000',
            'userId': 11,
            'appointmentLevel': 'A',
            'appointmentTime': '2020-04-20T03:08:33.000+0000',
            'companyCode': '',
            'lastCompanyCode': '',
            'receiptName': '',
            'receiptPhone': '',
            'receiptAddress': '',
            'sender': '',
            'isOnlyCompulsory': '',
            'createTime': '2020-04-20T03:08:34.000+0000',
            'updateTime': '2020-04-20T03:08:34.000+0000',
            'createUserId': 123,
            'createUser': '杨恒',
            'updateUserId': 123,
            'updateUser': '杨恒',
            'customerRemark': null,
            'receiptRemarks': null
        },
        {
            'id': 4,
            'tenantCode': '',
            'customerId': 'f287445058b045d4991ba65f954b3ed6',
            'batchNo': '',
            'customerName': '张三',
            'customerPhone': '',
            'otherContact': '',
            'idCard': '',
            'customerAddress': '',
            'carNo': '',
            'vinNo': '',
            'engineNo': null,
            'brandName': '',
            'registerTime': '2020-04-20T03:08:33.000+0000',
            'ownerShip': '',
            'isTransfer': false,
            'renewalState': '',
            'modelCode': '',
            'purchasePrice': 0,
            'displacement': '',
            'seatNumber': 0,
            'usage': '',
            'validityDate': '2020-04-20T03:08:33.000+0000',
            'commercialStartTime': '2020-04-20T03:08:33.000+0000',
            'commercialEndTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryStartTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryEndTime': '2020-04-20T03:08:33.000+0000',
            'handleState': '1',
            'rebateRemarks': '',
            'defeatId': 0,
            'defeatReason': '',
            'isDistribution': '1',
            'distributionDate': '2020-04-20T03:08:33.000+0000',
            'userId': 11,
            'appointmentLevel': 'B',
            'appointmentTime': '2020-04-20T03:08:33.000+0000',
            'companyCode': '',
            'lastCompanyCode': '',
            'receiptName': '',
            'receiptPhone': '',
            'receiptAddress': '',
            'sender': '',
            'isOnlyCompulsory': '',
            'createTime': '2020-04-20T03:08:34.000+0000',
            'updateTime': '2020-04-20T03:08:34.000+0000',
            'createUserId': 123,
            'createUser': '杨恒',
            'updateUserId': 123,
            'updateUser': '杨恒',
            'customerRemark': null,
            'receiptRemarks': null
        },
        {
            'id': 5,
            'tenantCode': '',
            'customerId': 'f287445058b045d4991ba65f954b3ed6',
            'batchNo': '',
            'customerName': '张三',
            'customerPhone': '',
            'otherContact': '',
            'idCard': '',
            'customerAddress': '',
            'carNo': '',
            'vinNo': '',
            'engineNo': null,
            'brandName': '',
            'registerTime': '2020-04-20T03:08:33.000+0000',
            'ownerShip': '',
            'isTransfer': false,
            'renewalState': '',
            'modelCode': '',
            'purchasePrice': 0,
            'displacement': '',
            'seatNumber': 0,
            'usage': '',
            'validityDate': '2020-04-20T03:08:33.000+0000',
            'commercialStartTime': '2020-04-20T03:08:33.000+0000',
            'commercialEndTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryStartTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryEndTime': '2020-04-20T03:08:33.000+0000',
            'handleState': '1',
            'rebateRemarks': '',
            'defeatId': 0,
            'defeatReason': '',
            'isDistribution': '1',
            'distributionDate': '2020-04-20T03:08:33.000+0000',
            'userId': 11,
            'appointmentLevel': 'C',
            'appointmentTime': '2020-04-20T03:08:33.000+0000',
            'companyCode': '',
            'lastCompanyCode': '',
            'receiptName': '',
            'receiptPhone': '',
            'receiptAddress': '',
            'sender': '',
            'isOnlyCompulsory': '',
            'createTime': '2020-04-20T03:08:34.000+0000',
            'updateTime': '2020-04-20T03:08:34.000+0000',
            'createUserId': 123,
            'createUser': '杨恒',
            'updateUserId': 123,
            'updateUser': '杨恒',
            'customerRemark': null,
            'receiptRemarks': null
        },
        {
            'id': 6,
            'tenantCode': '',
            'customerId': 'f287445058b045d4991ba65f954b3ed6',
            'batchNo': '',
            'customerName': '张三',
            'customerPhone': '',
            'otherContact': '',
            'idCard': '',
            'customerAddress': '',
            'carNo': '',
            'vinNo': '',
            'engineNo': null,
            'brandName': '',
            'registerTime': '2020-04-20T03:08:33.000+0000',
            'ownerShip': '',
            'isTransfer': false,
            'renewalState': '',
            'modelCode': '',
            'purchasePrice': 0,
            'displacement': '',
            'seatNumber': 0,
            'usage': '',
            'validityDate': '2020-04-20T03:08:33.000+0000',
            'commercialStartTime': '2020-04-20T03:08:33.000+0000',
            'commercialEndTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryStartTime': '2020-04-20T03:08:33.000+0000',
            'compulsoryEndTime': '2020-04-20T03:08:33.000+0000',
            'handleState': '1',
            'rebateRemarks': '',
            'defeatId': 0,
            'defeatReason': '',
            'isDistribution': '1',
            'distributionDate': '2020-04-20T03:08:33.000+0000',
            'userId': 11,
            'appointmentLevel': 'D',
            'appointmentTime': '2020-04-20T03:08:33.000+0000',
            'companyCode': '',
            'lastCompanyCode': '',
            'receiptName': '',
            'receiptPhone': '',
            'receiptAddress': '',
            'sender': '',
            'isOnlyCompulsory': '',
            'createTime': '2020-04-20T03:08:34.000+0000',
            'updateTime': '2020-04-20T03:08:34.000+0000',
            'createUserId': 123,
            'createUser': '杨恒',
            'updateUserId': 123,
            'updateUser': '杨恒',
            'customerRemark': null,
            'receiptRemarks': null
        }
    ]
};

export const queryTotalNumberData = () => {
    
};
