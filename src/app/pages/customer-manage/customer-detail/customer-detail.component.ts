import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISourceCache, ICustomerItem, IDefeatReasonItem, IGiftItem, insList } from './customer-detail.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { CustomerService } from '../customer-manage.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { DefeatSubmitModalComponent } from '../modal/defeat-submit-modal/defeat-submit-modal.component';
import { validIDCardValue, validPhoneValue, validCarNoValue } from 'src/app/core/utils/function';
import { TrackingSubmitModalComponent } from '../modal/tracking-submit-modal/tracking-submit-modal.component';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

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
    insList = [...insList];
    /** 表单的类型 */
    formType: string;
    /** 来源 */
    pageOrigin: string;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private localCache: LocalStorageService,
        private fb: FormBuilder,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        const cache = this.localCache.get(LocalStorageItemName.CUSTOMERDETAIL);
        this.sourceCache = cache && cache.value || null;
        this.pageOrigin = cache && cache.value && cache.value.originPage || '';
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
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(data => {
            this.formType = data['type'];
        });

        (this.formType === 'detail') && this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);

        this.validateForm = this.fb.group({
            /** 客户信息 */
            customerName: [null, [Validators.required]],
            idCard: [null, [Validators.required, this.validIDCard]],
            customerPhone: [null, [Validators.required, this.validPhone]],
            otherContact: [null],
            customerAddress: [null],
            customerRemark: [null],
            /** 车辆信息 */
            carNo: [null, [Validators.required, this.validCarNo]],
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
            receiptRemarks: [null]
        });

        this.loadDefeatReasonList();
        this.loadGiftList();

        /** 用于监听 是否能够成功提交 */
        this.successSubmitSubject$.subscribe(res => {
            if (res === true) {
                this.successSubmitAction();
            }
        });
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

        this.isLoading = true;

        this.customerService.queryCustomerDetail(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.cacheCustomerInfo = res;
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
            receiptDate } = customer;
        !quoteInsurance && (quoteInsurance = {});
        const { isDiscount, commercialSumPremium, compulsorySumPremium, taxActual, discount,
            sumPremium, realSumPremium, drivingPremium, allowancePremium, glassPremium, giftId } = quoteInsurance;
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
     * @func
     * @desc 加载赠品列表数据
     */
    loadGiftList() {
        this.customerService.queryGiftList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.giftList = res.map(gift => ({
                    ...gift,
                    name: gift.giftName,
                    value: gift.id
                }));
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
            carNo, brandName, vinNo, engineNo, seatNumber, registerTime, lastCompanyCode,
            validityDate, commercialEndTime, commercialStartTime, compulsoryEndTime, compulsoryStartTime,
            usage, purchasePrice, carTypeCode, receiptName, receiptPhone, sender, receiptRemarks,
            receiptDate
        });

        Object.assign(params.quoteInsurance, {
            isDiscount, commercialSumPremium, compulsorySumPremium, taxActual, discount,
            sumPremium, realSumPremium, drivingPremium, allowancePremium, glassPremium,
            ...giftInfo
        });

        return params;
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
                    if (res === true) {
                        this.message.success('保存成功');
                        console.log('hello kisure');
                        /** 如果当前操作不是成功提交，则保存成功以后直接切换至下一个客户 */
                        if (this.currentAction !== 'successSubmit') {
                            this.switchToNextCustomer();
                        } else {
                            this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);
                        }
                    } else {
                        this.message.error('保存失败');
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
        const { customerId } = customer;

        const modal = this.modalService.create({
            nzTitle: '跟踪提交',
            nzContent: TrackingSubmitModalComponent,
            nzComponentParams: {
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
                } else {
                    this.message.success('提交成功');
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
        if (index > -1 && this.sourceCache.customerListCache.length >= index + 1) {
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
        console.log('新增');

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
                    if (res === true) {
                        this.message.success('新增成功');
                        this.router.navigate(['/customer/list']);
                    } else {
                        this.message.error('新增失败');
                    }
                }

                this.isLoading = false;
            });
        }
    }

    ngOnDestroy() {
        this.successSubmitSubject$.unsubscribe();
    }
}
