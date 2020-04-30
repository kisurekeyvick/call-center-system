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
import { usageList, companyList } from './policy-review-detail.component.config';
import { findValueName } from 'src/app/core/utils/function';

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
            insType: []
        };
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
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
        const { id } = cache && cache['value'] && cache['value']['currentOrder'] || {};

        if (id) {
            const params = {
                id
            };

            this.policyReviewService.getCustomerOrderDetail(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    console.log('获取到的详情', res);
                    this.setModuleValue(res);
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
            commercialStartTime, commercialEndTime, compulsoryStartTime, compulsoryEndTime } = customerOrder;
        
        this.detailInfo.insType = quoteCommercialInsuranceDetailList;
        
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
            }
        });

    }

    
    /**
     * @func
     * @desc 设置表单详情信息
     * @param detailInfo 
     */
    setFormGroupValue(detailInfo) {
        const { customer } = detailInfo;
        const { receiptName, receiptPhone, sender, receiptRemarks,
            receiptDate } = customer;
        this.validateForm.patchValue({
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
     * @callback
     * @desc 审核通过
     */
    approved() {
        const modal = this.modalService.create({
            nzTitle: '审核通过',
            nzContent: RegisterAgainModalComponent,
            nzComponentParams: {
                policyItem: {}
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `通过成功`);
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
                policyItem: {}
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `登记成功`);
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
                this.message.create('success', '退单成功');
            },
            nzOnCancel: () => {
                this.message.info('您已取消退单');
            }
        })
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
