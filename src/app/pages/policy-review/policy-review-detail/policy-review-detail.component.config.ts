import { dictionary } from 'src/app/shared/dictionary/dictionary';

export const usageList = dictionary.get('usage');
export const companyList = dictionary.get('insuranceCompanys');
export const insList = dictionary.get('planDetail');

export interface IGiftItem {
    id: number;
    tenantCode: string;
    giftName: string;
    giftPrice: string;
    name: string;
    value: string;
    [key: string]: any;
}

export const customerDetailInfo = {
    /** 投保公司 */
    insCompany: {
        /** 投保公司 */
        companyName: '',
        /** 联系人 */
        createUser: ''
    },
    /** 客户信息 */
    customerInfo: {
        /** 被保险人姓名 */
        customerName: '',
        /** 身份证号码 */
        idCard: '',
        /** 联系电话 */
        customerPhone: '',
        /** 被保险人地址 */
        customerAddress: '',
        /** 备注 */
        customerRemark: ''
    },
    /** 投保车辆信息 */
    carInfo: {
        /** 车牌号 */
        carNo: '',
        /** 厂牌型号 */
        brandName: '',
        /** 核定座位 */
        seatNumber: '',
        /** 初次登记 */
        registerTime: '',
        /** 使用性质 */
        usage: '',
        usageName: '',
        /** 车架号码 */
        vinNo: '',
        /** 发动机号 */
        engineNo: '',
        /** 新车购置价 */
        purchasePrice: ''
    },
    /** 保险期间 */
    insTime: {
        /** 商业险 */
        commercialStartTime: '',
        commercialEndTime: '',
        /** 交强险 */
        compulsoryStartTime: '',
        compulsoryEndTime: ''
    },
    /** 投保险种 */
    insType: [],
    /** 最终报价 */
    finalQuotation: {
        /** 商业险金额 */
        commercialSumPremium: '',
        /** 是否优惠 */
        isDiscount: '',
        /** 优惠比例 */
        discount: '',
        /** 交强险金额 */
        compulsorySumPremium: '',
        /** 车船税 */
        taxActual: '',
        /** 开单保费 */
        sumPremium: '',
        /** 实收金额 */
        realSumPremium: '',
        /** 驾意险价格 */
        drivingPremium: '',
        /** 津贴保价格 */
        allowancePremium: '',
        /** 玻璃膜价格 */
        glassPremium: '',
        /** 赠品 */
        giftId: ''
    },
    /** 派送信息 */
    receiptInfo: {
        receiptDate: '',
        receiptName: '',
        receiptPhone: '',
        sender: '',
        giftName: '',
        receiptAddress: '',
        receiptRemarks: ''
    }
};
