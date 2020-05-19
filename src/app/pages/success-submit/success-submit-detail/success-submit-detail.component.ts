import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { Router } from '@angular/router';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { SuccessSubmitService } from '../success-submit.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { usageList, companyList, IGiftItem } from './success-submit-detail.component.config';
import { findValueName } from 'src/app/core/utils/function';
import { insList, IInsList } from 'src/app/shared/component/customer-detail-insurance/customer-detail-insurance.component.config';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'success-submit-detail',
    templateUrl: './success-submit-detail.component.html',
    styleUrls: ['./success-submit-detail.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class SuccessSubmitDetailComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** 详情信息 */
    detailInfo: ICommon;
    /** 加载的详细信息 */
    loadedDetailInfo: ICommon;
    /** 赠品 */
    giftList: IGiftItem[];

    constructor(
        private router: Router,
        private localCache: LocalStorageService,
        private successSubmitService: SuccessSubmitService,
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

        this.giftList = [];
    }

    ngOnInit() {
        this.loadGiftList().finally(() => {
            this.loadSuccessSubmitItemInfo();
        });
    }

    /**
     * @func
     * @desc 加载保单详情
     */
    loadSuccessSubmitItemInfo() {
        const cache = this.localCache.get(LocalStorageItemName.SUCCESSSUBMITREVIEW);
        const { id = null } = cache && cache['value'] && cache['value']['currentOrder'] || {};

        if (id) {
            const params = {
                id
            };

            this.successSubmitService.getCustomerOrderDetail(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    this.loadedDetailInfo = res;
                    this.setModuleValue(res);
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
            this.successSubmitService.queryGiftList().pipe(
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
     * @param detailInfo 
     */
    setModuleValue(detailInfo) {
        const { customerOrder, quoteCommercialInsuranceDetailList, quoteInsurance } = detailInfo;
        const { companyCode, createUser, customerName, idCard, customerPhone, customerAddress,
            carNo, brandName, seatNumber, registerTime, usage, vinNo, engineNo, purchasePrice,
            commercialStartTime, commercialEndTime, compulsoryStartTime, compulsoryEndTime,
            receiptDate, receiptName, receiptPhone, sender, receiptRemarks,
            commercialSumPremium, compulsorySumPremium, receiptAddress } = customerOrder;
        const { isDiscount, discount, taxActual, sumPremium, realSumPremium, drivingPremium, 
            allowancePremium, glassPremium, giftId } = quoteInsurance;
        
        this.detailInfo.insType = quoteCommercialInsuranceDetailList.map(item => {
            if (item.code) {
                const target = insList.filter((list: IInsList) => list.code === item.code)[0];
                item['insName'] = target && target.name || '';
            }

            return item;
        }).filter(item => item.payPremium);

        console.log('nicefish');
        
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
     * @callback
     * @desc 关闭
     */
    back() {
        this.router.navigate(['/successSubmit/list']);
    }

    ngOnDestroy() {}
}
