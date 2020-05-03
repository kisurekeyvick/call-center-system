import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { Router } from '@angular/router';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { SuccessSubmitService } from '../success-submit.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { usageList, companyList } from './success-submit-detail.component.config';
import { findValueName } from 'src/app/core/utils/function';

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
            /** 费用合计 */
            sumPremium: '',
            /** 派送信息 */
            receiptInfo: {
                receiptDate: '',
                receiptName: '',
                receiptPhone: '',
                sender: '',
                receiptRemarks: ''
            }
        };
    }

    ngOnInit() {
        this.loadSuccessSubmitItemInfo();
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
     * @desc 设置module值
     * @param detailInfo 
     */
    setModuleValue(detailInfo) {
        const { customerOrder, quoteCommercialInsuranceDetailList } = detailInfo;
        const { companyCode, createUser, customerName, idCard, customerPhone, customerAddress,
            carNo, brandName, seatNumber, registerTime, usage, vinNo, engineNo, purchasePrice,
            commercialStartTime, commercialEndTime, compulsoryStartTime, compulsoryEndTime,
            receiptDate, receiptName, receiptPhone, sender, receiptRemarks, sumPremium } = customerOrder;
        
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
            },
            sumPremium,
            receiptInfo: {
                receiptDate,
                receiptName,
                receiptPhone,
                sender,
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
