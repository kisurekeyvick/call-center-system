import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISourceCache, ICustomerItem, IDefeatReasonItem } from './customer-detail.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { CustomerService } from '../customer-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DefeatSubmitModalComponent } from '../modal/defeat-submit-modal/defeat-submit-modal.component';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
    /** 资源缓存 */
    sourceCache: ISourceCache | null;
    /** 表单 */
    validateForm: FormGroup;
    /** 表单选项列表 */
    formList = {
        insuranceCompanysList: dictionary.get('insuranceCompanys'),
        usageList: dictionary.get('usage'),
        carTypeList: dictionary.get('carType'),
    };
    /** 需要保存的参数 */
    otherFormParams: ICommon;
    /** 战败原因 */
    defeatReasonList: IDefeatReasonItem[];
    /** 当前展示的客户 */
    currentCustomer: ICommon;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private localCache: LocalStorageService,
        private fb: FormBuilder,
        private customerService: CustomerService
    ) {
        const cache = this.localCache.get(LocalStorageItemName.CUSTOMERDETAIL);
        this.sourceCache = cache && cache.value || null;
        this.otherFormParams = {
            giftList: []
        };
        this.defeatReasonList = [];
    }

    ngOnInit() {
        this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);

        this.validateForm = this.fb.group({
            /** 客户信息 */
            customerName: [null, [Validators.required]],
            idCard: [null, [Validators.required]],
            customerPhone: [null, [Validators.required]],
            otherContact: [null],
            customerAddress: [null],
            customerRemark: [null],
            /** 车辆信息 */
            carNo: [null],
            brandName: [null],
            vinNo: [null],
            engineNo: [null],
            seatNumber: [null],
            registerTime: [null],
            validityDate: [null],
            lastCompanyCode: [null],
            usage: [null],
            carTypeCode: [null],
            purchasePrice: [null],
            /** 最终报价 */
            commercialSumPremium: [null],
            isDiscount: [null],
            discount: [null],
            clivtaFlag: [null],
            compulsorySumPremium: [null],
            travelTaxFlag: [null],
            taxActual: [null],
            sumPremium: [null],
            realSumPremium: [null],
            /** 时间信息 */
            compulsoryTime: [null],
            commercialTime: [null],
            /** 保单派送信息 */
            receiptDate: [null],
            receiptName: [null],
            receiptPhone: [null],
            sender: [null],
            receiptRemarks: [null]
        });

        this.loadDefeatReasonList();
    }

    /**
     * @callback
     * @desc 展示客户详情
     * @param customer 
     */
    showDetailForm(customer: ICustomerItem) {
        this.sourceCache.customerListCache.forEach((item: ICustomerItem) => {
            item['selected'] = customer.id === item.id;
        });
        this.loadDetailCustomerForm(customer);
        this.currentCustomer = customer;
    }

    /**
     * @func
     * @desc 加载客户详情
     * @param customer 
     */
    loadDetailCustomerForm(customer: ICustomerItem) {
        const params = {
            id: customer.id
        };

        this.customerService.queryCustomerDetail(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                console.log('客户详情信息', res);
                this.setFormGroupValue(res);
            }
        });
    }

    /**
     * @desc 计算公式
     *      (1) discount  优惠比例  = 100- 商业险折扣
     *      (2) 实收金额 = (商业险 + 交强险 + 车船税) * (100 - discount) + 驾意险 + 津贴宝 + 
     *      (3) 开单保费 = (商业险 + 交强险 + 车船税) + 驾意险 + 津贴宝 + 
     * @param
     */

    /**
     * @func
     * @desc 设置表单详情信息
     * @param detailInfo 
     */
    setFormGroupValue(detailInfo) {
        const { customer, quoteCommercialInsuranceDetailList, quoteInsurance } = detailInfo;
        const { customerName, customerPhone, customerAddress, customerRemark, idCard, otherContact,
            carNo, brandName, vinNo, engineNo, seatNumber, registerTime, lastCompanyCode,
            validityDate, commercialEndTime, commercialStartTime, compulsoryEndTime, compulsoryStartTime,
            usage, purchasePrice, carTypeCode, receiptName, receiptPhone, sender, receiptRemarks,
            receiptDate } = customer;
        const { isDiscount, commercialSumPremium, compulsorySumPremium, taxActual, discount,
            sumPremium, realSumPremium } = quoteInsurance;
        this.validateForm.patchValue({
            /** 客户信息 */
            /** 姓名 */
            customerName,
            /** 身份证 */
            idCard,
            /** 联系电话 */
            customerPhone,
            /** 其他联系方式 */
            otherContact,
            /** 联系地址 */
            customerAddress,
            /** 备注 */
            customerRemark,
            
            /** 车辆信息 */
            /** 车牌 */
            carNo,
            /** 品牌型号 */
            brandName,
            /** 车架号 */
            vinNo,
            /** 发动机 */
            engineNo,
            /** 核定座位 */
            seatNumber,
            /** 初登日期 */
            registerTime,
            /** 年检有效期 */
            validityDate,
            /** 上年投保公司 */
            lastCompanyCode,
            /** 使用性质 */
            usage,
            /** 车辆种类 */
            carTypeCode,
            /** 新车购置价 */
            purchasePrice,

            /** 最终报价 */
            /** 商业险金额 */
            commercialSumPremium,
            /** 是否优惠 */
            isDiscount,
            /** 优惠比例 */
            discount,
            /** 交强险金额 */
            compulsorySumPremium,
            /** 车船税 */
            taxActual,
            /** 开单保费 */
            sumPremium,
            /** 实收金额 */
            realSumPremium,

            /** 时间信息 */
            /** 交强险时间 */
            compulsoryTime: [compulsoryStartTime, compulsoryEndTime],
            /** 商业险时间 */
            commercialTime: [commercialStartTime, commercialEndTime],

            /** 保单派送信息 */
            /** 派送时间 */
            receiptDate,
            /** 收件人 */
            receiptName,
            /** 联系方式 */
            receiptPhone,
            /** 寄件人 */
            sender,
            /** 备注 */
            receiptRemarks
        });
    }

    /**
     * @func
     * @desc 加载战败原因
     */
    loadDefeatReasonList() {
        this.customerService.queryDefeatReasonList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.defeatReasonList = res;
            }
        });
    }

    /**
     * @callback
     * @desc 添加赠品
     */
    chooseGift() {

    }

    /**
     * @callback
     * @desc 删除礼物
     * @param index 
     */
    deleteGift(index: number) {
        this.otherFormParams.giftList.splice(index, 1);
    }

    /**
     * @callback
     * @desc 保存信息
     */
    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
  
        if (this.validateForm.valid) {
        }
    }

    /**
     * @callback
     * @desc 失败提交
     */
    defeatSubmit() {
        const modal = this.modalService.create({
            nzTitle: '失败提交',
            nzContent: DefeatSubmitModalComponent,
            nzComponentParams: {
                defeatReasonList: this.defeatReasonList.map(item => ({
                    ...item,
                    name: item.defeatReason,
                    value: item.id
                })),
                customerId: this.currentCustomer.id
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `提交成功`);
            }
        });
    }

    ngOnDestroy() {}
}
