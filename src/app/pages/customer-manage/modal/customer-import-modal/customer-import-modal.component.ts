import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadChangeParam, UploadXHRArgs, UploadFile } from 'ng-zorro-antd/upload';
import { of, interval } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { CustomerService } from '../../customer-manage.service';

@Component({
    selector: 'customer-import-modal',
    templateUrl: './customer-import-modal.component.html',
    styleUrls: ['./customer-import-modal.component.scss']
})
export class CustomerImportModalComponent implements OnInit, OnDestroy {
    /** 上传的文件 */
    fileList: UploadFile[];

    constructor(
        private modal: NzModalRef,
        private message: NzMessageService,
        private customerService: CustomerService
    ) {

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
            delay(2000)
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
            formData.append('file', file.originFileObj, file.name);

            this.customerService.customerImport(formData).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                this.message.success('附件上传成功');
            });

            // const reader: FileReader = new FileReader();
            // reader.onload = e => {
            //     console.log('上传的附件', e);
            // };

            // reader.readAsBinaryString(file.originFileObj);
        });
    }

    cancel() {
        this.modal.destroy('error');
    }

    ngOnDestroy() {}
}
