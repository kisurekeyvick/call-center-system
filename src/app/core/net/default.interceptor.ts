import { 
    HttpErrorResponse, 
    HttpHandler, 
    HttpHeaderResponse, 
    HttpHeaders, 
    HttpInterceptor, 
    HttpProgressEvent, 
    HttpRequest, 
    HttpResponse, 
    HttpSentEvent, 
    HttpUserEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { UtilsService } from 'src/app/core/utils/utils.service';
import { _HttpClient } from 'src/app/core/utils/http.client';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable, throwError, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import SessionStorageService from 'src/app/core/cache/session-storage';

interface IResponseBody {
    costTime: number;
    msg: string;
    result: any;
    resultCode: number;
    statusCode: number;
    validationErrors: any;
}

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
        private session: SessionStorageService,
        private local: LocalStorageService) {
    }

    /** 白名单 */
    private static WHITE_LIST = [
        'http://up.qiniu.com',
        'https://up.qiniu.com',
        'http://upload.qiniup.com',
        'https://upload.qiniup.com',
        'http://up-z1.qiniu.com',
        'https://up-z1.qiniu.com',
        'http://upload-z1.qiniup.com',
        'https://upload-z1.qiniup.com',
        'http://up-z2.qiniu.com',
        'https://up-z2.qiniu.com',
        'http://upload-z2.qiniup.com',
        'https://upload-z2.qiniup.com',
        'gateway/saas/ext/order/download/get'
    ];

    get msg(): NzMessageService {
        return this.injector.get(NzMessageService);
    }

    get utils(): UtilsService {
        return this.injector.get(UtilsService);
    }

    private goTo(url: string) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
        this.injector.get(_HttpClient).end();
        // 业务处理：一些通用操作
        switch (event.status) {
            case 200:
                // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
                // 例如响应内容：
                //  错误内容：{ status: 1, msg: '非法参数' }
                //  正确内容：{ status: 0, response: {  } }
                // 则以下代码片断可直接适用
                if (event instanceof HttpResponse) {
                    const body: IResponseBody = event.body;

                    const url: string = event.url;

                    /** 用户登出，做特殊处理 */
                    if (url.indexOf('api/user/logout') > -1) {
                        return of(Object.assign(event));
                    }
                    
                    /** 用户登录，做特殊处理 */
                    if (url.indexOf('api/user/sign-in') > -1) {
                        const token = event.headers.get('Authorization');
                        return of(Object.assign(event, { body: { 'Authorization': token } }));
                    }

                    if (body) {
                        return of(event);
                    } else if(!body && event.statusText === 'OK') {
                        /** 此处用于处理一些添加，删除操作时候的处理 */
                        return of(event);
                    } else if (body && Number(body.statusCode) === 904 || Number(body.statusCode) === 8800111) {
                        this.session.clear();
                        this.local.clear();
                        this.goTo('/user/login');
                        return Observable.throw(body);
                    } else {
                        if (body.msg) {
                            this.msg.error(body.msg);
                        }
                        // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
                        // this.http.get('/').subscribe() 并不会触发
                        return Observable.throw(body);
                    }
                }
                break;
            case 904: // 未登录状态码
                this.session.clear();
                this.local.clear();
                this.goTo('/user/login');
                return Observable.throw({ result: '用户未登录', validationErrors: null });
            case 403:
            case 404:
            case 500:
                this.goTo(`/${event.status}`);
                break;
            default:
                if (event['name'] && event['name'] === 'TimeoutError') {
                    console.warn('请求超时', event);
                    this.msg.error('请求超时');
                    return Observable.throw({ result: '请求超时', validationErrors: null });
                }
                if (event instanceof HttpErrorResponse) {
                    console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', event);
                    this.msg.error(event.message || '服务异常，请联系管理员');
                    return Observable.throw({ result: '未可知错误，大部分是由于后端不支持CORS或无效配置引起', validationErrors: null });
                }
                break;
        }
        return of(event);
    }

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        // 统一加上服务端前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = environment.SERVER_URL + url;
        }

        if (DefaultInterceptor.WHITE_LIST.indexOf(req.url) > -1) {
            return next.handle(req.clone({ url: url }));
        }

        const tokenValue = this.local.get('token');
        const token = tokenValue && tokenValue['value'] || '';
        const header = new HttpHeaders()
            .set('Accept', '*/*') // application/json, text/javascript, */*; q=0.01
            .set('Content-type', 'application/json; charset=UTF-8')
            .set('Authorization', token);

        const body = req.body;
        // const groupInfo = Object.assign({ groupId: null, groupType: null }, this.session.get('currentGroupInfo'));

        const newReq = req.clone({
            url: url,
            // withCredentials: true,
            headers: header,
            body: Object.assign({
                // lcb_request_id: this.utils.guid(),
                // appCode: environment.appCode,
                // groupId: groupInfo.groupId,
                // groupType: groupInfo.groupType
            }, body)
        });
        // const timeout = parseInt(req.params.get('timeout'), 0) || 10000;
        // eturn next.handle(newReq).timeout(timeout).pipe(
        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                if (event instanceof HttpResponse && event.status === 200) {
                    const rBody: IResponseBody = event.body;
                    if (rBody && Number(rBody.statusCode) === 200) {
                        // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
                        return of(Object.assign(event, { body: rBody.result }));
                    } else {
                        // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
                        // this.http.get('/').subscribe() 并不会触发
                        return throwError(event);
                    }
                }
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err))
        );
    }
}
