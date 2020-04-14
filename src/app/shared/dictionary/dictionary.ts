export const dictionary = new Map([
    [
        'accountStatus', [
            { name: '启用', value: '1' },
            { name: '禁用', value: '0' },
        ]
    ],
    [
        'customerLlistTableState', [
            { name: '全部数据', value: 'all' },
            { name: '未分配', value: 'unallocated' }
        ]
    ],
    [
        /** 车辆所属 */
        'category', [
            { name: '个人', value: '1' },
            { name: '单位', value: '2' },
        ]
    ],
    [
        /** 是否续保 */
        'isRenewal', [
            { name: '非续保', value: '1' },
            { name: '续保', value: '2' },
            { name: '次续保', value: '3' }
        ]
    ],
    [
        /** 是否在职续保 */
        'isOnJobRenewal', [
            { name: '是', value: '1' },
            { name: '否', value: '0' },
        ]
    ],
    [
        /** 是否高端车 */
        'isLuxuryCar', [
            { name: '是', value: '1' },
            { name: '否', value: '0' },
        ]
    ],
    [
        /** 是否过户车 */
        'isChangeOwner', [
            { name: '是', value: '1' },
            { name: '否', value: '0' },
        ]
    ],
    [
        /** 否单交强 */
        'isOnlyCompulsory', [
            { name: '是', value: '1' },
            { name: '否', value: '0' },
        ]
    ],
    [
        /** 保险公司 */
        'insuranceCompanys', [
            { name: '中国人民财产保险股份有限公司', value: 'PICC' },
            { name: '中国平安财产保险股份有限公司', value: 'PAIC' },
            { name: '中国太平洋财产保险股份有限公司', value: 'CPIC' },
            { name: '太平财产保险有限公司', value: 'TPIC' },
            { name: '阳光财产保险股份有限公司', value: 'SSIC' },
            { name: '中华联合财产保险股份有限公司', value: 'CICP' },
            { name: '安盛天平财产保险股份有限公司', value: 'ASTP' },
            { name: '众安在线财产保险股份有限公司', value: 'ZAPA' },
            { name: '中国人寿财产保险股份有限公司', value: 'CLPC' },
            { name: '中国大地财产保险股份有限公司', value: 'CCIC' },
            { name: '天安保险股份有限公司', value: 'TAIC' },
            { name: '永安财产保险股份有限公司', value: 'YAIC' },
            { name: '永诚财产保险股份有限公司', value: 'AICS' },
            { name: '紫金财产保险股份有限公司', value: 'ZKIC' },
            { name: '华农财产保险股份有限公司', value: 'HNIC' }
        ]
    ],
    [
        /** 返利申请 状态搜索条件 */
        'rebateApplicationStatusList', [
            { name: '请选择', value: '' },
            { name: '未处理', value: '6' },
            { name: '驳回', value: '7' },
            { name: '同意', value: '8' }
        ]
    ],
    [
        /** 处理状态 */
        'processingState', [
            { name: '请选择', value: '' },
            { name: '未处理', value: '1' },
            { name: '预约跟踪', value: '2' },
            { name: '成功提交', value: '3' },
            { name: '失败提交', value: '4' },
            { name: '名单无效', value: '5' },
            { name: '返利申请中', value: '6' },
            { name: '返利申请被拒绝', value: '7' },
        ]
    ],
    [
        /** 战败原因设置 是否删除 */
        'isDeleteStatus', [
            { name: '已经删除', value: '1' },
            { name: '未删除', value: '2' },
        ]
    ],
    [
        /** 名单查询 预约级别 */
        'appointmentLevel', [
            { name: 'A', value: '10001' },
            { name: 'B', value: '10002' },
            { name: 'C', value: '10003' },
            { name: 'D', value: '10004' },
            { name: 'E', value: '10005' }
        ]
    ],
    [
        /** 成功提交保单 是否出单 */
        'outDocTypeList', [
            { name: '是', value: '1' },
            { name: '否', value: '0' },
        ]
    ],
    [
        /** 成功提交保单 审核状态 */
        'auditStatus', [
            { name: '待审核', value: '38001' },
            { name: '审核通过', value: '38002' },
            { name: '审核失败', value: '38003' },
            { name: '审核中', value: '38004' }
        ]
    ],
    [
        /** 成功提交保单 收单状态 */
        'receiptStatus', [
            { name: '未收单', value: '39001' },
            { name: '已收单', value: '39002' },
        ]
    ],
    [
        /** 保单审核 是否出单 */
        'outDocTypeList', [
            { name: '未出单', value: '1' },
            { name: '已出单', value: '2' },
        ]
    ]
]);
