import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { RegisterAgainModalComponent } from '../modal/register-again/register-again-modal.component';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { PolicyReviewService } from '../policy-review.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { usageList, companyList, insList } from './policy-review-detail.component.config';
import { findValueName, validPhoneValue, reversePriceFormat, priceFormat } from 'src/app/core/utils/function';
import { insList as sharedInsList, IInsList } from 'src/app/shared/component/customer-detail-insurance/customer-detail-insurance.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { cloneDeep } from 'lodash';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'policy-review-detail',
    templateUrl: './policy-review-detail.component.html',
    styleUrls: ['./policy-review-detail.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class PolicyReviewDetailComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** 详情信息 */
    detailInfo: ICommon;
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

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private localCache: LocalStorageService,
        private policyReviewService: PolicyReviewService,
        private fb: FormBuilder,
    ) {
        this.detailInfo = {
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
                customerAddress: ''
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
            sumPremium: ''
        };

        this.orderInsList = [];
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

            /** 派送信息 */
            receiptDate: [null],
            receiptName: [null],
            receiptPhone: [null],
            sender: [null],
            receiptRemarks: [null]
        });

        this.loadPolicyInfo();
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
                    this.setModuleValue(res);
                    this.setInsList(res);
                    this.setFormGroupValue(res);
                }
            });
        }
    }

    /**
     * @func
     * @desc 设置module值
     * @param detailInfo 
     */
    setModuleValue(detailInfo) {
        const { customerOrder, quoteCommercialInsuranceDetailList } = detailInfo;
        const { companyCode, createUser, customerName, idCard, customerPhone, customerAddress,
            carNo, brandName, seatNumber, registerTime, usage, vinNo, engineNo, purchasePrice,
            commercialStartTime, commercialEndTime, compulsoryStartTime, compulsoryEndTime, sumPremium } = customerOrder;
        
        Object.assign(this.detailInfo, {
            insCompany: {
                createUser,
                companyName: findValueName(companyList, companyCode)
            },
            customerInfo: {
                customerName,
                idCard,
                customerPhone,
                customerAddress
            },
            carInfo: {
                carNo,
                brandName,
                seatNumber,
                registerTime,
                usageName: findValueName(usageList, usage),
                vinNo,
                engineNo,
                purchasePrice
            },
            insTime: {
                commercialStartTime,
                commercialEndTime,
                compulsoryStartTime,
                compulsoryEndTime
            },
            sumPremium
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
                    payPremium: item.payPremium,
                    coverageValue: item.coverage && reversePriceFormat(item.coverage) || '',
                });

                return target;
            }

            // if (item.code) {
            //     item['insName'] = findValueName(insList, item.code);
            // }

            return item;
        });
    }
    
    /**
     * @func
     * @desc 设置表单详情信息
     * @param detailInfo 
     */
    setFormGroupValue(detailInfo) {
        const { customerOrder } = detailInfo;
        const { receiptName, receiptPhone, sender, receiptRemarks, receiptDate, companyCode, 
            createUser, customerName, idCard, customerPhone, customerAddress,
            carNo, brandName, seatNumber, registerTime, usage, vinNo, engineNo, purchasePrice, } = customerOrder;
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
     * @callback
     * @desc 保存派送信息
     */
    saveSendInfo() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            const { customerOrder, quoteInsurance } = this.loadedDetailInfo;
            const quoteCommercialInsuranceDetailList = this.formatRequestInsValue();
            const params = {
                customerOrder: {
                    ...customerOrder,
                    ...this.validateForm.value
                },
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
            const { coverageValue, materialsType, payPremium } = list.value;

            return {
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
                this.loadPolicyInfo();
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
                        }

                        this.loadPolicyInfo();
                    }
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消退单');
            }
        });
    }

    /**
     * @callback
     * @desc 关闭
     */
    back() {
        this.router.navigate(['/policyReview/list']);
    }

    ngOnDestroy() {}
}
