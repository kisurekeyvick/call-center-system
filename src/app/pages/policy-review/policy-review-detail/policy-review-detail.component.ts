import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { RegisterAgainModalComponent } from '../modal/register-again/register-again-modal.component';

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

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router
    ) {
        this.detailInfo = {
            insType: [
                { typeName: '车辆损失险', insuredAmount: '163142.4' , premium: '1717.48' },
                { typeName: '不计免赔（车损,三责）', insuredAmount: '163142.4' , premium: '1717.48' },
                { typeName: '第三者责任险', insuredAmount: '163142.4' , premium: '1717.48' },
                { typeName: '车船税金额', insuredAmount: '163142.4' , premium: '1717.48' },
                { typeName: '交强险金额', insuredAmount: '163142.4' , premium: '1717.48' },
            ]
        };
    }

    ngOnInit() {
        this.loadPolicyInfo();
    }

    /**
     * @func
     * @desc 加载保单详情
     */
    loadPolicyInfo() {

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
