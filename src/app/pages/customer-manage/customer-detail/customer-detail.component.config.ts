import { ICustomerItem } from '../customer-list/customer-list.component.config';

export { ICustomerItem } from '../customer-list/customer-list.component.config';

export interface ISourceCache {
    originPage: string;
    currentCustomer: ICustomerItem;
    customerListCache: ICustomerItem[];
}

export interface IDefeatReasonItem {
    id?: number;
    defeatReason: string;
    isDelete?: string;
    [key: string]: any;
}

export interface IGiftItem {
    id: number;
    tenantCode: string;
    giftName: string;
    giftPrice: string;
    [key: string]: any;
}

export const insList = [
    {
        name: '车辆损失险',
        code: 'CarDamageRisk',
        id: 1,
        hasCheckbox: true,
        type: 'input',
        value: {
            CarDamageRiskHasCurrentIns: false,
            CarDamageRiskChecked: false
        }
    },
    {
        name: '第三者责任险',
        code: 'ThirdPartyRisk',
        id: 2,
        hasCheckbox: true,
        type: 'select',
        config: {
            options: []
        },
        value: {
            ThirdPartyRiskHasCurrentIns: false,
            ThirdPartyRiskChecked: false
        }
    },
    {
        name: '盗抢险',
        code: 'TheftProtectionRisk',
        id: 3,
        hasCheckbox: true,
        value: {
            TheftProtectionRiskHasCurrentIns: false,
            TheftProtectionRiskChecked: false
        }
    },
    {
        name: '上人员责任险（司机）',
        code: 'DriverRisk',
        id: 4,
        hasCheckbox: true,
        value: {
            DriverRiskHasCurrentIns: false,
            DriverRiskChecked: false
        }
    },
    {
        name: '车上人员责任险（乘客）',
        code: 'PassengerRisk',
        id: 5,
        hasCheckbox: true,
        value: {
            PassengerRiskHasCurrentIns: false,
            PassengerRiskChecked: false
        }
    },
    {
        name: '车身划痕损失险',
        code: 'ScratchRisk',
        id: 6,
        hasCheckbox: true,
        value: {
            ScratchRiskHasCurrentIns: false,
            ScratchRiskChecked: false
        }
    },
    {
        name: '玻璃单独破碎险',
        code: 'GlassRisk',
        id: 7,
        hasCheckbox: false,
        value: {
            GlassRiskHasCurrentIns: false,
            GlassRiskChecked: false
        }
    },
    {
        name: '自燃损失险',
        code: 'BurningRisk',
        id: 8,
        hasCheckbox: true,
        value: {
            BurningRiskHasCurrentIns: false,
            BurningRiskChecked: false
        }
    },
    {
        name: '涉水行驶损失险',
        code: 'EngineWaterRisk',
        id: 9,
        hasCheckbox: true,
        value: {
            EngineWaterRiskHasCurrentIns: false,
            EngineWaterRiskChecked: false
        }
    },
    {
        name: '机动车损失保险无法找到第三方特约险',
        code: 'NoThirdRisk',
        id: 10,
        hasCheckbox: false,
        value: {
            NoThirdRiskHasCurrentIns: false,
            NoThirdRiskChecked: false
        }
    },
    {
        name: '新增设备损失险',
        code: 'NewEquipmentCoverage',
        id: 11,
        hasCheckbox: true,
        value: {
            NewEquipmentCoverageHasCurrentIns: false,
            NewEquipmentCoverageChecked: false
        }
    },
    {
        name: '驾意险',
        code: 'DriverAccidentRisk',
        id: 12,
        hasCheckbox: false,
        value: {
            DriverAccidentRiskHasCurrentIns: false,
            DriverAccidentRiskChecked: false
        }
    },
    {
        name: '津贴保',
        code: 'GlassFilmPriceRisk',
        id: 13,
        hasCheckbox: false,
        value: {
            GlassFilmPriceRiskHasCurrentIns: false,
            GlassFilmPriceRiskChecked: false
        }
    },
    {
        name: '玻璃膜价格',
        code: 'GlassFilmPriceRisk',
        id: 14,
        hasCheckbox: false,
        value: {
            GlassFilmPriceRiskHasCurrentIns: false,
            GlassFilmPriceRiskChecked: false
        }
    },
];
