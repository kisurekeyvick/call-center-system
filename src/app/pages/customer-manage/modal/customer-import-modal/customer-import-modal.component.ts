import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadChangeParam, UploadXHRArgs, UploadFile } from 'ng-zorro-antd/upload';
import { of, interval } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { CustomerService } from '../../customer-manage.service';
import { UtilsService } from 'src/app/core/utils/utils.service';

@Component({
    selector: 'customer-import-modal',
    templateUrl: './customer-import-modal.component.html',
    styleUrls: ['./customer-import-modal.component.scss']
})
export class CustomerImportModalComponent implements OnInit, OnDestroy {
    /** 上传的文件 */
    fileList: UploadFile[];
    /** 加载中 */
    isLoading: boolean;

    constructor(
        private modal: NzModalRef,
        private message: NzMessageService,
        private customerService: CustomerService,
        private utilsService: UtilsService
    ) {
        this.isLoading = false;
    }

    ngOnInit() {
        this.fileList = [];
    }

    /**
     * @callback
     * @desc 下载模板
     */
    downloadTemplate() {

    }

    /**
     * @callback
     * @desc 文件发生改变
     * @param param0 
     */
    handleChange({ file, fileList }: UploadChangeParam): void {
        // const status = file.status;
        this.fileList = fileList;
        
        // if (status !== 'uploading') {
        // }
        // if (status === 'done') {
        //     this.message.success(`${file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //     this.message.error(`${file.name} file upload failed.`);
        // }
    }

    /**
     * @func
     * @desc 自定义上传请求动作
     * https://ng.ant.design/components/upload/zh  上传查看自定义的demo
     */
    customReq = (item: UploadXHRArgs) => {
        return of('1').pipe(
            delay(500)
        ).subscribe(() => {
            item.onSuccess('success', item.file, {});
        });
    }

    /**
     * @func
     * @desc 上传附件
     */
    uploadFile() {
        this.fileList.forEach((file: UploadFile) => {
            const formData = new FormData();
            formData.append('file', file.originFileObj);

            const requestParams = {
                httpMethod: 'POST',
                httpUrl: 'api/customer/import',
                requestParams: formData
            };
            
            this.isLoading = true;

            this.utilsService.uploadFile(requestParams).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    this.modal.destroy('success');
                }

                this.isLoading = false;
            });
        });
    }

    cancel() {
        this.modal.destroy('error');
    }

    ngOnDestroy() {}
}
