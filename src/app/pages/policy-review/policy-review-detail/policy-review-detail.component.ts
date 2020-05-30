import { Component, OnInit, OnDestroy, ElementRef, DoCheck } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { RegisterAgainModalComponent } from '../modal/register-again/register-again-modal.component';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { PolicyReviewService } from '../policy-review.service';
import { of, Subject, Observable, fromEvent, Subscription } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { usageList, companyList, insList, IGiftItem, customerDetailInfo } from './policy-review-detail.component.config';
import { findValueName, validPhoneValue, reversePriceFormat, priceFormat, numberToFixed } from 'src/app/core/utils/function';
import { insList as sharedInsList, IInsList } from 'src/app/shared/component/customer-detail-insurance/customer-detail-insurance.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { cloneDeep } from 'lodash';
import * as dayjs from 'dayjs';

interface ICommon {
    [key: string]: any;
}

type IDetailInfo = typeof customerDetailInfo;

@Component({
    selector: 'policy-review-detail',
    templateUrl: './policy-review-detail.component.html',
    styleUrls: ['./policy-review-detail.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class PolicyReviewDetailComponent implements OnInit, OnDestroy, DoCheck {
    /** 是否正在加载 */
    isLoading: boolean;
    /** 表单 */
    validateForm: FormGroup;
    /** 加载的详细信息 */
    loadedDetailInfo: ICommon;
    /** 表单选项列表 */
    formList = {
        insuranceCompanysList: dictionary.get('insuranceCompanys'),
        usageList: dictionary.get('usage'),
        carTypeList: dictionary.get('carType')
    };
    /** 险种 */
    orderInsList: IInsList[];
    /** 赠品 */
    giftList: IGiftItem[];
    /** 详情信息 */
    detailInfo: IDetailInfo;
    /** 开始更新静态保单数据 */
    uploadDetailInfo$: Subject<boolean> = new Subject();
    /** 页面popstate */
    popstate$: Subscription;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private localCache: LocalStorageService,
        private policyReviewService: PolicyReviewService,
        private fb: FormBuilder,
        private el: ElementRef
    ) {
        this.detailInfo = cloneDeep(customerDetailInfo);
        this.orderInsList = [];
        this.giftList = [];
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            /** 投保公司 */
            companyCode: [null],
            /** 联系人 */
            createUser: [null],
            
            /** 客户信息 */
            /** 被保险人姓名 */
            customerName: [null],
            /** 身份证号码 */
            idCard: [null],
            /** 联系电话 */
            customerPhone: [null],
            /** 被保险人地址 */
            customerAddress: [null],
            /** 备注 */
            customerRemark: [null],

            /** 投保车辆信息 */
            /** 车牌号 */
            carNo: [null],
            /** 厂牌型号 */
            brandName: [null],
            /** 核定座位 */
            seatNumber: [null],
            /** 初次登记 */
            registerTime: [null],
            /** 使用性质 */
            usage: [null],
            /** 车架号码 */
            vinNo: [null],
            /** 发动机号 */
            engineNo: [null],
            /** 新车购置价 */
            purchasePrice: [null],

            /** 最终报价 */
            commercialSumPremium: [null],
            isDiscount: [null],
            discount: [null],
            // clivtaFlag: [null],
            compulsorySumPremium: [null],
            // travelTaxFlag: [null],
            taxActual: [null],
            sumPremium: [null],
            realSumPremium: [null],
            drivingPremium: [null],
            allowancePremium: [null],
            glassPremium: [null],
            /** 赠品 */
            giftId: [null], 
            /** 时间信息 */
            compulsoryTime: [null],
            commercialTime: [null],
            /** 派送信息 */
            receiptDate: [null],
            receiptName: [null],
            receiptPhone: [null],
            sender: [null],
            giftName: [null],
            receiptAddress: [null],
            receiptRemarks: [null]
        });

        this.loadGiftList().finally(() => {
            this.loadPolicyInfo();
        });

        this.uploadDetailInfo$.pipe(
            debounceTime(1000)
        ).subscribe((res: boolean) => {
            res && this.setModuleValue();
        });

        this.listenPopStateChange();
    }

    ngDoCheck() {
        this.uploadDetailInfo$.next(true);
    }

    listenPopStateChange() {
        this.popstate$ = fromEvent(window, 'popstate').subscribe(() => {
            this.changeSearchParamsCache();
        });
    }

    /**
     * @func
     * @desc 加载保单详情
     */
    loadPolicyInfo() {
        const cache = this.localCache.get(LocalStorageItemName.POLICYREVIEW);
        const { id = null } = cache && cache['value'] && cache['value']['currentOrder'] || {};

        if (id) {
            const params = {
                id
            };

            this.policyReviewService.getCustomerOrderDetail(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    console.log('获取到的详情', res);
                    this.loadedDetailInfo = res;
                    this.setInsList(res);
                    this.setFormGroupValue(res).then(() => {
                        this.setModuleValue();
                    });
                }
            });
        }
    }

    /**
     * @func
     * @desc 加载赠品列表数据
     */
    loadGiftList() {
        return new Promise((resolve, reject) => {
            this.policyReviewService.queryGiftList().pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (res instanceof Array) {
                    this.giftList = res.map(gift => ({
                        ...gift,
                        name: gift.giftName,
                        value: gift.id
                    }));

                    resolve('success');
                } else {
                    reject('err');
                }
            });
        }); 
    }

    /**
     * @func
     * @desc 设置module值
     */
    setModuleValue() {
        const { 
            /** 客户信息 */
            customerName, idCard, customerPhone, customerAddress, customerRemark,
            /** 车辆信息 */
            carNo, brandName, seatNumber, registerTime, usage, vinNo, engineNo, purchasePrice,
            /** 保险期间 */
            compulsoryTime, commercialTime, companyCode,
            /** 最终报价 */
            commercialSumPremium, isDiscount, discount, compulsorySumPremium, taxActual, sumPremium,
            realSumPremium, drivingPremium, allowancePremium, glassPremium, giftId,
            /** 派送信息 */
            receiptDate, receiptName, receiptPhone, sender, receiptAddress, receiptRemarks
        } = this.validateForm.value;
       
        /** 商业险时间 */
        const [commercialStartTime = null, commercialEndTime = null] = commercialTime || [];
        /** 交强险时间 */
        const [compulsoryStartTime = null, compulsoryEndTime = null] = compulsoryTime || [];

        Object.assign(this.detailInfo, {
            customerInfo: {
                customerName,
                idCard,
                customerPhone,
                customerAddress,
                customerRemark
            },
            carInfo: {
                carNo,
                brandName,
                seatNumber,
                registerTime,
                usage,
                usageName: findValueName(usageList, usage),
                vinNo,
                engineNo,
                purchasePrice
            },
            insCompany: {
                companyName: findValueName(companyList, companyCode)
            },
            insTime: {
                commercialStartTime,
                commercialEndTime,
                compulsoryStartTime,
                compulsoryEndTime
            },
            insType: this.formatRequestInsValue(),
            finalQuotation: {
                commercialSumPremium,
                isDiscount,
                discount,
                compulsorySumPremium,
                taxActual,
                sumPremium,
                realSumPremium,
                drivingPremium,
                allowancePremium,
                glassPremium,
                giftId
            },
            receiptInfo: {
                receiptDate,
                receiptName,
                receiptPhone,
                sender,
                giftName: findValueName(this.giftList, giftId),
                receiptAddress,
                receiptRemarks
            }
        });

    }

    /**
     * @func
     * @desc 设置险种列表
     * @param detailInfo 
     */
    setInsList(detailInfo) {
        const { quoteCommercialInsuranceDetailList } = detailInfo;
        const copyInsList: IInsList[] = cloneDeep(sharedInsList);
        this.orderInsList = quoteCommercialInsuranceDetailList.map(item => {
            const target = copyInsList.find((insItem: IInsList) => insItem.code === item.code);

            if (target) {
                Object.assign(target.value, {
                    id: item.id,
                    payPremium: item.payPremium,
                    coverageValue: item.coverage && reversePriceFormat(item.coverage) || '',
                });

                return target;
            }

            // if (item.code) {
            //     item['insName'] = findValueName(insList, item.code);
            // }

            return item;
        }).filter(item => item.value && item.value.payPremium);
    }
    
    /**
     * @func
     * @desc 设置表单详情信息
     * @param detailInfo 
     */
    setFormGroupValue(detailInfo): Promise<boolean> {
        const { customerOrder, quoteInsurance } = detailInfo;
        const { receiptName, receiptPhone, sender, receiptRemarks, receiptDate, companyCode, 
            createUser, customerName, idCard, customerPhone, customerAddress,
            carNo, brandName, seatNumber, registerTime, usage, vinNo, engineNo, purchasePrice,
            commercialSumPremium, compulsorySumPremium, receiptAddress, commercialEndTime, 
            commercialStartTime, compulsoryEndTime, compulsoryStartTime, customerRemark } = customerOrder;
        const { isDiscount, discount, taxActual, sumPremium, realSumPremium, drivingPremium, 
            allowancePremium, glassPremium, giftId } = quoteInsurance;
        this.validateForm.patchValue({
            /** 投保公司 */
            companyCode,
            /** 联系人 */
            createUser,
            
            /** 客户信息 */
            /** 被保险人姓名 */
            customerName,
            /** 身份证号码 */
            idCard,
            /** 联系电话 */
            customerPhone,
            /** 被保险人地址 */
            customerAddress,
            /** 备注 */
            customerRemark,

            /** 投保车辆信息 */
            /** 车牌号 */
            carNo,
            /** 厂牌型号 */
            brandName,
            /** 核定座位 */
            seatNumber,
            /** 初次登记 */
            registerTime,
            /** 使用性质 */
            usage,
            /** 车架号码 */
            vinNo,
            /** 发动机号 */
            engineNo,
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
            /** 驾意险价格 */
            drivingPremium,
            /** 津贴保价格 */
            allowancePremium,
            /** 玻璃膜价格 */
            glassPremium,
            /** 赠品 */
            giftId,

            /** 时间信息 */
            /** 交强险时间 */
            compulsoryTime: [compulsoryStartTime, compulsoryEndTime],
            /** 商业险时间 */
            commercialTime: [commercialStartTime, commercialEndTime],

            /** 派送时间 */
            receiptDate,
            /** 收件人 */
            receiptName,
            /** 联系方式 */
            receiptPhone,
            /** 寄件人 */
            sender,
            /** 赠品名 */
            giftName: findValueName(this.giftList, giftId),
            /** 地址 */
            receiptAddress,
            /** 备注 */
            receiptRemarks
        });

        return Promise.resolve(true);
    }

    /**
     * @func
     * @desc 验证手机
     * @param control 
     */
    validPhone = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (!validPhoneValue(control.value)) {
            return { confirm: true, error: true };
        }

        return {};
    }

    /**
     * @func
     * @desc 时间发生变化
     * @param time 
     */
    formControlTimeChange(time: Date[], formControlName: string) {
        if (time.length > 0) {
            const startTime = dayjs(time[0]);
            const formatStartTime = dayjs(startTime).format('YYYY/MM/DD');
            const resetStartTime = new Date(formatStartTime);
            const formatEndTime = formatStartTime.split('/').map((item: string, index: number) => {
                return index === 0 && String(Number(item) + 1) || item;
            }).join('/');
            const resetEndTime = new Date(formatEndTime);
            this.validateForm.patchValue({
                [formControlName]: [resetStartTime, resetEndTime]
            });
        }
    }

    /**
     * @callback
     * @desc 赠品发生改变
     */
    giftChange(giftId: string) {
        this.validateForm.patchValue({
            giftName: findValueName(this.giftList, giftId)
        });
    }

    /**
     * @callback
     * @desc 险种金额发生变化
     */
    insItemChange() {
        /**
         * 商业险 = 所有险种保费
         * 开担保费 = 商业险+ 交强险 + 车船税 + 小险种（三个驾意险。津贴保，玻璃膜）
         * 实收保费 = （商业险+ 交强险）* 折扣 +车船税 + 小险种（三个驾意险。津贴保，玻璃膜）
         */
        /** 商业险 */
        const commercialSumPremium = this.orderInsList.reduce((pre, cur: IInsList) => {
            pre += (cur.value.payPremium || 0); 
            return pre;
        }, 0);

        const { compulsorySumPremium = 0, taxActual = 0, discount = 0, 
            drivingPremium = 0, allowancePremium = 0, glassPremium = 0 } = this.validateForm.value; 

        /** 开单保费 */
        const sumPremium = commercialSumPremium + compulsorySumPremium + taxActual + drivingPremium + allowancePremium + glassPremium;

        /** 实收保费 */
        const realSumPremium = (commercialSumPremium + compulsorySumPremium) * (1 - discount / 100) + taxActual + + drivingPremium + allowancePremium + glassPremium;

        /** 设置值 */
        this.validateForm.patchValue({
            /** 商业险金额 */
            commercialSumPremium: numberToFixed(commercialSumPremium),
            /** 开单保费 */
            sumPremium: numberToFixed(sumPremium),
            /** 实收金额 */
            realSumPremium: numberToFixed(realSumPremium)
        });
    }

    /**
     * @func
     * @desc format将要保存的参数
     */
    formatRequestParams() {
        const formValue = this.validateForm.value;
        const {
            /** 投保公司 */
            companyCode,
            /** 联系人 */
            createUser,
            /** 客户信息 */
            customerName, idCard, customerPhone, customerAddress, customerRemark,
            /** 车辆信息 */
            carNo, brandName, vinNo, engineNo, seatNumber, registerTime,
            usage, carTypeCode, purchasePrice,
            /** 最终报价 */
            commercialSumPremium, isDiscount, discount, compulsorySumPremium, taxActual, sumPremium, realSumPremium,
            drivingPremium, allowancePremium, glassPremium, giftId,
            /** 时间信息 */
            compulsoryTime, commercialTime,
            /** 保单派送信息 */
            receiptDate, receiptName, receiptPhone, sender, receiptRemarks, receiptAddress
        } = formValue;
        /** 商业险时间 */
        const [commercialStartTime = null, commercialEndTime = null] = commercialTime || [];
        /** 交强险时间 */
        const [compulsoryStartTime = null, compulsoryEndTime = null] = compulsoryTime || [];

        /** 赠品信息 */
        const giftInfo = {
            giftId: 0,
            giftName: '',
            giftNumber: 0,
            giftPrice: 0,
            giftTotalPrice: 0
        };

        if (giftId) {
            const targetGift: IGiftItem = this.giftList.find(gift => gift.id === giftId);

            Object.assign(giftInfo, {
                giftId,
                giftName: targetGift.name,
                giftNumber: 1,
                giftPrice: targetGift.giftPrice,
                giftTotalPrice: targetGift.giftPrice,
            });
        }

        const { customerOrder, quoteInsurance } = this.loadedDetailInfo;

        Object.assign(customerOrder, {
            customerName, customerPhone, customerAddress, idCard,
            carNo, brandName, vinNo, engineNo, seatNumber, 
            registerTime: new Date(dayjs(registerTime).format('YYYY-MM-DD')),
            usage, purchasePrice, carTypeCode, receiptName, receiptPhone, sender, receiptRemarks,
            receiptDate: new Date(dayjs(receiptDate).format('YYYY-MM-DD')),
            commercialEndTime, commercialStartTime, compulsoryEndTime, compulsoryStartTime,
            customerRemark, receiptAddress
        });

        Object.assign(quoteInsurance, {
            isDiscount, commercialSumPremium, compulsorySumPremium, taxActual, discount,
            sumPremium, realSumPremium, drivingPremium, allowancePremium, glassPremium,
            ...giftInfo, companyCode
        });
        
        return {
            customerOrder, quoteInsurance
        };
    }

    /**
     * @callback
     * @desc 保存派送信息
     */
    saveSendInfo() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            const quoteCommercialInsuranceDetailList = this.formatRequestInsValue();
            const { customerOrder, quoteInsurance } = this.formatRequestParams();
            const params = {
                customerOrder,
                quoteCommercialInsuranceDetailList,
                quoteInsurance
            };

            this.policyReviewService.updateCustomerOrder(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    if (res === true) {
                        this.message.success('保单派送信息更新成功');
                        this.loadPolicyInfo();
                    }
                }
            });
        }
    }

    /**
     * @func
     * @desc format险种的值
     */
    formatRequestInsValue(): Array<any> {
        let value = [];

        value = this.orderInsList.map((list: IInsList) => {
            const { coverageValue, materialsType, payPremium, id } = list.value;

            return {
                id,
                insName: list.name,
                code: list.code,
                coverage: coverageValue ? priceFormat(coverageValue) : '',
                payPremium: payPremium,
                materialsType,
            };
        });

        return value;
    }

    /**
     * @callback
     * @desc 审核通过
     */
    approved() {
        const modal = this.modalService.create({
            nzTitle: '审核通过',
            nzContent: RegisterAgainModalComponent,
            nzComponentParams: {
                policyItem: this.loadedDetailInfo,
                /** operationCode的值为2 代表 内勤通过 */
                operationCode: '2',
                type: 'approved'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `通过成功`);
                this.back();
                // this.loadPolicyInfo();
            }
        });
    }

    /**
     * @callback
     * @desc 重新登记
     */
    registerAgain() {
        const modal = this.modalService.create({
            nzTitle: '重新登记',
            nzContent: RegisterAgainModalComponent,
            nzComponentParams: {
                policyItem: this.loadedDetailInfo,
                type: 'registerAgain'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `登记成功`);
                this.loadPolicyInfo();
            }
        });
    }

    // /**
    //  * @callback
    //  * @desc 打印订单
    //  */
    // print() {
    //     const content = this.el.nativeElement.querySelector('.policy-review-detail-form');
    //     const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=1300,height=1000,toolbar=0,scrollbars=0,status=0');
    //     WindowPrt.document.write(content.innerHTML);
    //     WindowPrt.document.close();
    //     WindowPrt.focus();
    //     WindowPrt.print();
    //     WindowPrt.close();
    // }

    /**
     * @callback
     * @desc 退单
     */
    chargeback() {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '您确认退单?',
            nzOnOk: () => {
                const { customerOrder } = this.loadedDetailInfo;
                const params = {
                    operationCode: '3',
                    customerOrder
                };

                this.policyReviewService.operationOrder(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    if (!(res instanceof TypeError)) {
                        if (res.code !== '200') {
                            this.message.warning(res.message);
                        } else {
                            this.message.create('success', '退单成功');
                            this.back();
                        }

                        // this.loadPolicyInfo();
                    }
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消退单');
            }
        });
    }

    /**
     * @func
     * @desc 修改缓存的查询条件
     */
    changeSearchParamsCache() {
        /** 详情在返回列表页之前，需要重新定义一下缓存，将canRead字段设置为true可读 */
        const cache = this.localCache.get(LocalStorageItemName.POLICYREVIEWSEARCHPARAMS);
        const { canRead = null } = cache && cache['value'] || {};

        if (canRead === false) {
            const cacheAgain = {
                ...cache['value'],
                canRead: true
            };

            this.localCache.set(LocalStorageItemName.POLICYREVIEWSEARCHPARAMS, cacheAgain);
        }
    }

    /**
     * @callback
     * @desc 关闭
     */
    back() {
        this.changeSearchParamsCache();

        this.router.navigate(['/policyReview/list']);
    }

    ngOnDestroy() {
        this.popstate$ && this.popstate$.unsubscribe();
    }
}
