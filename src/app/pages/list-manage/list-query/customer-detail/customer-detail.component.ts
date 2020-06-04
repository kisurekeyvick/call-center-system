import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISourceCache, ICustomerItem, IDefeatReasonItem, IGiftItem, insList, IInsList } from './customer-detail.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { ListManageService } from '../../list-manage.service';
import { catchError } from 'rxjs/operators';
import { of, Subject, fromEvent, Subscription } from 'rxjs';
import { DefeatSubmitModalComponent } from '../../modal/defeat-submit-modal/defeat-submit-modal.component';
import { validIDCardValue, validPhoneValue, validCarNoValue, priceFormat, reversePriceFormat, numberToFixed, findValueName } from 'src/app/core/utils/function';
import { TrackingSubmitModalComponent } from '../../modal/tracking-submit-modal/tracking-submit-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import * as dayjs from 'dayjs';

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
    /** 赠品 */
    giftList: IGiftItem[];
    /** 当前展示的客户 */
    currentCustomer: ICommon;
    /** 缓存接口加载出来的客户详情信息数据 */
    cacheCustomerInfo: ICommon;
    /** 成功提交的subject */
    successSubmitSubject$: Subject<boolean> = new Subject();
    /** 当前的点击操作 */
    currentAction: string;
    /** 加载中 */
    isLoading: boolean;
    /** 险种选中 */
    setOfCheckedId = new Set<number>();
    /** 险种的配置 */
    insList = cloneDeep(insList);
    /** 表单的类型 */
    formType: string;
    /** 来源 */
    pageOrigin: string;
    /** 是否展示侧边快捷栏 */
    canShowDetailFeature: boolean;
    /** 页面popstate */
    popstate$: Subscription;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private localCache: LocalStorageService,
        private fb: FormBuilder,
        private customerService: ListManageService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.readCache();
        this.otherFormParams = {
            giftList: []
        };
        this.defeatReasonList = [];
        this.giftList = [];
        this.cacheCustomerInfo = {
            customer: {},
            quoteCommercialInsuranceDetailList: [],
            quoteInsurance: {}
        };
        this.currentAction = '';
        this.isLoading = false;
        this.formType = 'add';
        this.canShowDetailFeature = false;
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(data => {
            this.formType = data['type'];

            this.readCache();
    
            this.validateForm = this.fb.group({
                /** 客户信息 */
                customerName: [null],
                idCard: [null],
                customerPhone: [null],
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
                /** 车险选项 start */
                companyCode: [null],
                /** 车险选项 end */
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
                /** 保单派送信息 */
                receiptDate: [null],
                receiptName: [null],
                receiptPhone: [null],
                sender: [null],
                giftName: [null],
                receiptAddress: [null],
                receiptRemarks: [null]
            });
    
            this.loadDefeatReasonList();

            if (this.formType === 'detail' || this.formType === 'quickLink') {
                this.canShowDetailFeature = true;
                /** 预先加载赠品，再加载详情 */
                this.loadGiftList().finally(() => {
                    this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);
                });
            } else {
                this.loadGiftList();
            }
        });

        /** 用于监听 是否能够成功提交 */
        this.successSubmitSubject$.subscribe(res => {
            if (res === true) {
                this.successSubmitAction();
            }
        });

        this.listenPopStateChange();
    }

    listenPopStateChange() {
        this.popstate$ = fromEvent(window, 'popstate').subscribe(() => {
            this.changeSearchParamsCache();
        });
    }

    /**
     * @func
     * @desc 读取缓存
     */
    readCache() {
        const cache = this.localCache.get(LocalStorageItemName.CUSTOMERDETAIL);
        this.sourceCache = cache && cache.value || null;
        this.pageOrigin = cache && cache.value && cache.value.originPage || '';
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
        this.insList = cloneDeep(insList);
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

        this.isLoading = true;

        this.customerService.queryCustomerDetail(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.cacheCustomerInfo = res;
                !this.cacheCustomerInfo.quoteInsurance && (this.cacheCustomerInfo.quoteInsurance = {});
                this.setInsuranceListValue(res);
                this.setFormGroupValue(res);
            }

            if (this.currentAction === 'successSubmit') {
                this.successSubmitSubject$.next(true);
            }

            this.isLoading = false;
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
        let { customer, quoteInsurance } = detailInfo;
        !customer && (customer = {});
        const { customerName, customerPhone, customerAddress, customerRemark, idCard, otherContact,
            carNo, brandName, vinNo, engineNo, seatNumber, registerTime, lastCompanyCode,
            validityDate, commercialEndTime, commercialStartTime, compulsoryEndTime, compulsoryStartTime,
            usage, purchasePrice, carTypeCode, receiptName, receiptPhone, sender, receiptRemarks,
            receiptDate, receiptAddress } = customer;
        !quoteInsurance && (quoteInsurance = {});
        const { isDiscount, commercialSumPremium, compulsorySumPremium, taxActual, discount,
            sumPremium, realSumPremium, drivingPremium, allowancePremium, glassPremium, giftId, companyCode } = quoteInsurance;
        const roleInfo = this.localCache.get(LocalStorageItemName.USERPROFILE);
        const { name } = roleInfo && roleInfo['value'] || { name: '' };
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
            /** 车险选项 start */
            companyCode,
            /** 车险选项 end */

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

            /** 保单派送信息 */
            /** 派送时间 */
            receiptDate,
            /** 收件人 */
            receiptName: receiptName || customerName,
            /** 联系方式 */
            receiptPhone,
            /** 寄件人 */
            sender: sender || name,
            /** 赠品名 */
            giftName: findValueName(this.giftList, giftId),
            /** 地址 */
            receiptAddress,
            /** 备注 */
            receiptRemarks
        });
    }

    /**
     * @func
     * @desc 填充险种值
     */
    setInsuranceListValue(detailInfo) {
        const { quoteCommercialInsuranceDetailList = [] } = detailInfo;
        if (quoteCommercialInsuranceDetailList.length > 0) {
            this.insList.forEach(ins => {
                quoteCommercialInsuranceDetailList.forEach(insItem => {
                    if (ins.code === insItem.code) {
                        Object.assign(ins.value, {
                            hasCurrentIns: true,
                            coverageValue: insItem.coverage && reversePriceFormat(insItem.coverage) || '',
                            payPremium: insItem.payPremium,
                            materialsType: insItem.materialsType
                        });
                    }
                });
            });
        }
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
     * @func
     * @desc 加载赠品列表数据
     */
    loadGiftList() {
        return new Promise((resolve, reject) => {
            this.customerService.queryGiftList().pipe(
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
     * @func
     * @desc 验证手机
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
     * @desc 验证身份证
     */
    validIDCard = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (!validIDCardValue(control.value)) {
            return { confirm: true, error: true };
        }

        return {};
    }

    /**
     * @func
     * @desc 验证车牌号
     */
    validCarNo = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (!validCarNoValue(control.value)) {
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
     * @desc 险种保费发生变化
     */
    payPremiumChange() {
        this.insItemChange();
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
        const commercialSumPremium = this.insList.reduce((pre, cur: IInsList) => {
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
     * @callback
     * @desc 险种的check状态
     * @param id 
     * @param checked 
     */
    onInsItemChecked(id: number, checked: boolean) {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }

    /**
     * @func
     * @desc format将要保存的参数
     */
    formatRequestParams() {
        const formValue = this.validateForm.value;
        const { 
            /** 客户信息 */
            customerName, idCard, customerPhone, otherContact, customerAddress, customerRemark,
            /** 车辆信息 */
            carNo, brandName, vinNo, engineNo, seatNumber, registerTime, validityDate, lastCompanyCode,
            usage, carTypeCode, purchasePrice,
            /** 最终报价 */
            commercialSumPremium, isDiscount, discount, compulsorySumPremium, taxActual, sumPremium, realSumPremium,
            drivingPremium, allowancePremium, glassPremium, giftId,
            /** 险种 */
            companyCode,
            /** 时间信息 */
            compulsoryTime, commercialTime,
            /** 保单派送信息 */
            receiptDate, receiptName, receiptPhone, sender, receiptRemarks
        } = formValue;
        /** 商业险时间 */
        const [commercialStartTime = null, commercialEndTime = null] = commercialTime || [];
        /** 交强险时间 */
        const [compulsoryStartTime = null, compulsoryEndTime = null] = compulsoryTime || [];
        const params = this.cacheCustomerInfo;

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
        
        Object.assign(params.customer, {
            customerName, customerPhone, customerAddress, customerRemark, idCard, otherContact,
            carNo, brandName, vinNo, engineNo, seatNumber, 
            registerTime: new Date(dayjs(registerTime).format('YYYY-MM-DD')), lastCompanyCode,
            validityDate: new Date(dayjs(validityDate).format('YYYY-MM-DD')), 
            commercialEndTime, commercialStartTime, compulsoryEndTime, compulsoryStartTime,
            usage, purchasePrice, carTypeCode, receiptName, receiptPhone, sender, receiptRemarks,
            receiptDate: new Date(dayjs(receiptDate).format('YYYY-MM-DD'))
        });

        params.quoteCommercialInsuranceDetailList = this.formatRequestInsValue();

        Object.assign(params.quoteInsurance, {
            isDiscount, commercialSumPremium, compulsorySumPremium, taxActual, discount,
            sumPremium, realSumPremium, drivingPremium, allowancePremium, glassPremium,
            ...giftInfo, companyCode
        });

        return params;
    }

    /**
     * @func
     * @desc format险种的值
     */
    formatRequestInsValue(): Array<any> {
        let value = [];
        value = this.insList.filter(list => list.value.hasCurrentIns).map((list: IInsList) => {
            const { coverageValue, materialsType, payPremium } = list.value;

            return {
                id: list.id || null,
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
     * @desc 
     */
    saveSubmit() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
  
        if (this.validateForm.valid) {
            const params = {
                ...this.formatRequestParams()
            };

            this.isLoading = true;
            this.customerService.saveCustomer(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    if (res.code === '200') {
                        /** 如果当前操作是成功提交，则重新展示页面数据 */
                        if (this.currentAction === 'successSubmit') {
                            this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);
                        } else {
                            this.message.success('保存成功');
                        }
                    } else {
                        /** 如果保存失败，也需要重置action */
                        this.currentAction = '';
                        this.message.error(res.message);
                    }
                }

                this.isLoading = false;
            });
        }
    }

    /**
     * @callback
     * @desc 跟踪提交
     */
    trackSubmit() {
        const { customer } = this.cacheCustomerInfo;
        const { customerId, appointmentLevel, appointmentTime } = customer;

        const modal = this.modalService.create({
            nzTitle: '跟踪提交',
            nzContent: TrackingSubmitModalComponent,
            nzComponentParams: {
                customerId,
                appointmentLevel,
                appointmentTime
            },
            nzWidth: 550,
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `提交成功`);
                this.switchToNextCustomer();
            }
        });
    }

    /**
     * @callback
     * @desc 成功提交
     */
    successSubmit() {
        /** this.currentAction 是一个标识，在loadDetailCustomerForm方法中会做判断，用于发送给subject */
        this.currentAction = 'successSubmit';
        this.saveSubmit();
    }

    /**
     * @func
     * @desc 该方法由successSubmitSubject来触发
     *      之所以有successSubmitSubject，是因为每一次点击成功提交时候
     *      需要保存一下，也就是调用saveSubmit方法
     *      为了保证接口调用的先后顺序，所以这边的解决方案定为通过subject来实现。
     */
    successSubmitAction() {
        const { customer } = this.cacheCustomerInfo;
        const { customerId } = customer;
        const params = {
            operationCode: '3',
            customerId
        };

        /** 此处需要重置当前的操作 */
        this.currentAction = '';
        this.customerService.operationCustomer(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                /** 10086 代表超过默认折扣上限 */
                if (res.code === '10086') {
                    this.modalService.confirm({
                        nzTitle: '提示',
                        nzContent: res.message,
                        nzOnOk: () => {
                            this.secondSuccessSubmit(params);
                        },
                        nzOnCancel: () => {
                            this.message.info('您已取消提交');
                        }
                    });
                } else if (res.code === '200') {
                    this.message.success('提交成功');
                } else {
                    this.message.error(res.message);
                }
            }
        });
    }

    /**
     * @func
     * @desc 确认后再次提交
     */
    secondSuccessSubmit(params) {
        const requestParams = {
            ...params,
            confirm: true
        };

        this.customerService.operationCustomer(requestParams).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                if (res.code !== '200') {
                    this.message.error(res.message);
                } else {
                    this.message.success('提交成功');
                    this.switchToNextCustomer();
                }
            }
        });
    }

    /**
     * @callback
     * @desc 失败提交
     */
    defeatSubmit() {
        const { customer } = this.cacheCustomerInfo;
        const { customerId } = customer;

        const modal = this.modalService.create({
            nzTitle: '失败提交',
            nzContent: DefeatSubmitModalComponent,
            nzComponentParams: {
                defeatReasonList: this.defeatReasonList.map(item => ({
                    ...item,
                    name: item.defeatReason,
                    value: item.id
                })),
                customerId
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `提交成功`);
                this.switchToNextCustomer();
            }
        });
    }

    /**
     * @callback
     * @desc 无效提交
     */
    invalidSubmit() {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '您确认无效提交吗？',
            nzOnOk: () => {
                const { customer } = this.cacheCustomerInfo;
                const { customerId } = customer;
        
                const params = {
                    operationCode: '5',
                    customerId
                };
        
                this.isLoading = true;
                this.customerService.operationCustomer(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    if (!(res instanceof TypeError)) {
                        if (res.code !== '200') {
                            this.message.error(res.message);
                        } else {
                            this.message.success('提交成功');
                            this.switchToNextCustomer();
                        }
                    }
        
                    this.isLoading = false;
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消操作');
            }
        });
    }

    /**
     * @func
     * @desc 切换至下一个客户
     */
    switchToNextCustomer() {
        const index = this.sourceCache.customerListCache.findIndex((item: ICustomerItem) => {
            return this.currentCustomer.id === item.id;
        });

        /** 如果index存在，并且index+1在整个cache的范围内，则可以切换至下一个客户 */
        if (index > -1 && this.sourceCache.customerListCache.length > index + 1) {
            this.message.info('准备切换至下一个客户', {
                nzDuration: 1500
            });

            const target = this.sourceCache.customerListCache[index + 1];
            this.showDetailForm(target);
        }
    }

    /**
     * @callback
     * @desc 新增客户
     */
    newCustomer() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
  
        if (this.validateForm.valid) {
            const params = {
                ...this.formatRequestParams()
            };

            this.isLoading = true;
            this.customerService.saveCustomer(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    if (res.code === '200') {
                        this.message.success('新增成功');
                        this.router.navigate(['/listManage/query']);
                    } else {
                        this.message.error(res.message || '新增失败');
                    }
                }

                this.isLoading = false;
            });
        }
    }

    /**
     * @func
     * @desc 修改缓存的查询条件
     */
    changeSearchParamsCache() {
        /** 详情在返回列表页之前，需要重新定义一下缓存，将canRead字段设置为true可读 */
        const cache = this.localCache.get(LocalStorageItemName.LISTMANAGESEARCHPARAMS);
        const { canRead = false } = cache && cache['value'] || {};

        if (!canRead) {
            const cacheAgain = {
                ...cache['value'],
                canRead: true
            };

            this.localCache.set(LocalStorageItemName.LISTMANAGESEARCHPARAMS, cacheAgain);
        }
    }

    /**
     * @callback
     * @desc 返回列表页
     */
    back() {
        this.changeSearchParamsCache();

        this.router.navigate(['/listManage/query']);
    }

    ngOnDestroy() {
        this.successSubmitSubject$.unsubscribe();
        this.popstate$ && this.popstate$.unsubscribe();
    }
}
