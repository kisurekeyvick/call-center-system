import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadChangeParam, UploadXHRArgs } from 'ng-zorro-antd/upload';

@Component({
    selector: 'customer-import-modal',
    templateUrl: './customer-import-modal.component.html',
    styleUrls: ['./customer-import-modal.component.scss']
})
export class CustomerImportModalComponent implements OnInit, OnDestroy {
    constructor(
        private modal: NzModalRef,
        private message: NzMessageService,
    ) {

    }

    ngOnInit() {}

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
        const status = file.status;

        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.message.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.message.error(`${file.name} file upload failed.`);
        }
    }

    /**
     * @func
     * @desc 自定义上传请求动作
     * https://ng.ant.design/components/upload/zh  上传查看自定义的demo
     */
    customReq = (item: UploadXHRArgs) => {
        const formData = new FormData();
        formData.append('file', item.file as any);
        formData.append('id', '1000');
        item.onSuccess({}, item.file, {});
    }

    cancel() {
        this.modal.destroy('error');
    }

    ngOnDestroy() {}
}
