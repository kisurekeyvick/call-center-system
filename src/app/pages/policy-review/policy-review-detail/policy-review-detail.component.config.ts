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

export const printFormStyle = `
.policy-review-detail #policy-review-detail-form .detail-box p.title {
    background: #f0f2f5;
    line-height: 30px;
    padding: 0 12px;
    margin-bottom: 4px;
    background: #79b5ec;
    color: #fff;
  }
  .policy-review-detail #policy-review-detail-form .detail-box p.title i {
    margin-right: 12px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item.summation p {
    text-align: center;
    line-height: 40px;
    margin-bottom: 4px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content {
    margin-bottom: 4px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem {
    margin-bottom: 1px;
    border: 1px solid #e5e5e5;
    margin-right: 1px;
    display: flex;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .ant-form-item-label,
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .ant-form-item-control {
    line-height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormLabel {
    background-color: #e5edf7;
    border-right: 1px solid #e5e5e5;
    text-align: right;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl {
    flex: 1;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl .ant-input {
    border: none !important;
    height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl .ant-input:focus {
    box-shadow: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl .ant-input-number-input {
    height: 35px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl .ant-input-number {
    border: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl .ant-input-number:focus {
    box-shadow: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl .ant-input-number-focused {
    box-shadow: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormLabel {
    flex-basis: 90px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormLabel.ins-label {
    flex-basis: 160px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormLabel,
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl {
    line-height: 30px;
    height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl {
    padding: 0px 11px;
    white-space: nowrap;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .detail-item-content .nzFormItem .nzFormControl.scroll-x {
    overflow-y: hidden;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list {
    margin-top: -4px;
    margin-bottom: 4px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .ant-table-tbody tr:nth-child(2n) td {
    background-color: #e5edf7;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem {
    margin-bottom: 1px;
    border: 1px solid #e5e5e5;
    margin-right: 1px;
    display: flex;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .ant-form-item-label,
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .ant-form-item-control {
    line-height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormLabel {
    background-color: #e5edf7;
    border-right: 1px solid #e5e5e5;
    text-align: right;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl {
    flex: 1;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-input {
    border: none !important;
    height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-input:focus {
    box-shadow: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-input-number-input {
    height: 35px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-input-number {
    border: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-input-number:focus {
    box-shadow: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-input-number-focused {
    box-shadow: none;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .ant-form-item-control {
    width: 100%;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .dataType {
    border-right: 1px solid #e5e5e5;
    height: 30px;
    padding: 0 11px;
    text-align: left;
    border-radius: 0px;
    outline: 0;
    transition: all 0.3s linear;
    margin-top: 2px;
    line-height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormControl .payPremium {
    padding: 0 11px;
    height: 30px;
    line-height: 30px;
  }
  .policy-review-detail #policy-review-detail-form .detail-box .ins-table-list .nzFormItem .nzFormLabel {
    flex-basis: 160px;
  }
`;
