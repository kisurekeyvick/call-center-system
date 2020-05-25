export const dictionary = new Map([
    [
        'accountStatus', [
            { name: '启用', value: 'Using' },
            { name: '禁用', value: 'Forbidden' },
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
            { name: '人保', value: 'PICC' },
            { name: '平安', value: 'PAIC' },
            { name: '太平洋', value: 'CPIC' },
            { name: '太平', value: 'TPIC' },
            { name: '阳光', value: 'SSIC' },
            { name: '中华', value: 'CICP' },
            { name: '安盛天平', value: 'ASTP' },
            { name: '众安平安', value: 'ZAPA' },
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
            { name: '返利申请中', value: '6' },
            { name: '返利申请被拒绝', value: '7' },
            { name: '返利申请同意', value: '8' }
        ]
    ],
    [
        /**  内勤出单状态 */
        'internalOrderStatus', [
            { name: '请选择', value: '' },
            { name: '已经提交', value: '1' },
            { name: '内勤通过', value: '2' },
            { name: '内勤审评失败', value: '3' },
        ]
    ],
    [
        /** 客户状态 */
        'customerStatus', [
            { name: '未处理', value: '1' },
            { name: '预约跟踪', value: '2' },
            { name: '成功提交', value: '3' },
            { name: '失败提交', value: '4' },
            { name: '名单无效', value: '5' }
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
    ],
    [
        /** 险种的枚举值 对应的value是险种的字段 */
        'planDetail', [
            { name: '车辆损失险', value: 'CarDamageRisk' },
            { name: '第三者责任保险', value: 'ThirdPartyRisk' },
            { name: '人员责任险（司机）', value: 'DriverRisk' },
            { name: '人员责任险（乘客）', value: 'PassengerRisk' },
            { name: '盗抢险', value: 'TheftProtectionRisk' },
            { name: '车身划痕损失险', value: 'ScratchRisk' },
            { name: '玻璃单独破碎险', value: 'GlassRisk' },
            { name: '指定修理厂险', value: 'RepairShopRisk' },
            { name: '自燃损失险', value: 'BurningRisk' },
            { name: '机动车损失保险无法找到第三方特约险', value: 'NoThirdRisk' },
            { name: '机动车第三者责任保险附加法定节假日限额翻倍险', value: 'NoHolidayRisk' },
            { name: '发动机涉水损失险', value: 'EngineWaterRisk' },
            { name: '不计免赔险（车损险）', value: 'CarDamageRiskRegardless' },
            { name: '不计免赔险（盗抢险）', value: 'TheftProtectionRiskRegardless' },
            { name: '不计免赔险（三者险）', value: 'ThirdPartyRiskRegardless' },
            { name: '不计免赔险（车上人员（司机））', value: 'DriverRiskRegardless' },
            { name: '不计免赔险（车上人员（乘客））', value: 'PassengerRiskRegardless' },
            { name: '不计免赔险（车身划痕损失险）', value: 'ScratchRiskRegardless' },
            { name: '不计免赔险（自燃损失险）', value: 'BurningRiskRegardless' },
            { name: '不计免赔险（发动机涉水损失险）', value: 'EngineWaterRiskRegardless' },
            { name: '新增设备险', value: 'NewEquipmentCoverage' },
            { name: '不计免赔险（新增设备险）', value: 'NewEquipmentCoverageRegardless' },
            { name: '不计免赔险', value: 'ExcludingDeductibleRiskRegardless' },
            
            { name: '驾意险', value: 'DriverAccidentRisk' },
            { name: '津贴保', value: 'GlassFilmPriceRisk' },
            { name: '玻璃膜价格', value: 'GlassFilmPriceRisk' }
        ]
    ],
    [
        /** 客户管理列表 是否续保 */
        'renewalState', [
            { name: '续保', value: '1' },
            { name: '非续保', value: '2' }
        ]
    ],
    [
        /** 客户管理 客户详情 使用性质 */
        'usage', [
            { name: '家庭自用', value: '8A' },
            { name: '非营业企业', value: '8B' },
        ]
    ],
    [
        /** 客户管理 客户详情 车辆类型 */
        'carType', [
            { name: '六座以下客车', value: 'A012' },
            { name: '六座至十座以下客车', value: 'A022' },
            { name: '十座至二十座以下客车', value: 'A032' },
            { name: '二十座至三十六座以下客车', value: 'A042' },
            { name: '三十六座及三十六座以上客车', value: 'A052' },
        ]
    ],
    [
        /** 客户列表 预约级别 */
        'appointmentLevel', [
            { name: 'A', value: 'A' },
            { name: 'B', value: 'B' },
            { name: 'C', value: 'C' },
            { name: 'D', value: 'D' },
            { name: '单交', value: '单交' },
            { name: 'E', value: 'E' }
        ]
    ]
]);
