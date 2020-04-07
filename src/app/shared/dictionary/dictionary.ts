export const dictionary = new Map([
    [
        'accountStatus', [
            { name: '启用', value: '1' },
            { name: '禁用', value: '0' },
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
            { name: '平安', value: '12001' },
            { name: '人保', value: '12002' },
            { name: '太保', value: '12003' },
            { name: '中华', value: '12004' },
            { name: '其他', value: '12099' }
        ]
    ]
]);
