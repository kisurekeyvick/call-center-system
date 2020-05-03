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
            hasCurrentIns: false,
            checked: false
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
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '盗抢险',
        code: 'TheftProtectionRisk',
        id: 3,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '上人员责任险（司机）',
        code: 'DriverRisk',
        id: 4,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '车上人员责任险（乘客）',
        code: 'PassengerRisk',
        id: 5,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '车身划痕损失险',
        code: 'ScratchRisk',
        id: 6,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '玻璃单独破碎险',
        code: 'GlassRisk',
        id: 7,
        hasCheckbox: false,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '自燃损失险',
        code: 'BurningRisk',
        id: 8,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '涉水行驶损失险',
        code: 'EngineWaterRisk',
        id: 9,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '机动车损失保险无法找到第三方特约险',
        code: 'NoThirdRisk',
        id: 10,
        hasCheckbox: false,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '新增设备损失险',
        code: 'NewEquipmentCoverage',
        id: 11,
        hasCheckbox: true,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '驾意险',
        code: 'driverAccidentRisk',
        id: 12,
        hasCheckbox: false,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '津贴保',
        code: 'allowanceInsuranceRisk',
        id: 13,
        hasCheckbox: false,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
    {
        name: '玻璃膜价格',
        code: 'glassFilmPriceRisk',
        id: 14,
        hasCheckbox: false,
        value: {
            hasCurrentIns: false,
            checked: false
        }
    },
];
