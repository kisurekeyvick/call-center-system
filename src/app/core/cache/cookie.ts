import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
    /**
     * 获取cookie中的某个字段的值
     */
    public getCookie(key: string): any {
        if (!key)
            return null;

        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(key + '=');
            if (c_start !== -1) {
                c_start = c_start + key.length + 1;
                let c_end = document.cookie.indexOf(';', c_start);
                if (c_end === -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }

        return null;
    }

    /**
     * 设置cookie
     * @param key       键名
     * @param value     值
     * @param endTime   结束时间
     */
    public setCookie(key: string, value: string, endTime?: Date): boolean {
        if (!key)
            return false;

        let expires = '';

        if (endTime)
            expires = '; expires=' + endTime.toUTCString();

        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires;
        return true;
    }

    /**
     * 移除某个cookie
     */
    public removeCookie(key: string): boolean {
        if (!this.hasCookie(key))
            return false;

        document.cookie = `${encodeURIComponent(key)}=; expires=${new Date(0).toUTCString()}`;
        return true;
    }

    /**
     * 判断某个字段是否存在于cookie中
     */
    public hasCookie(key: string): boolean {
        if (!key)
            return false;

        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent('_octo').replace(/[\\]/g, '\\$&') + '\\s*')).test(document.cookie);
    }

    /**
     * 清空所有的cookie
     */
    public clearCookie() {
        // const cookies = document.cookie.match(/[^ ;]+(?=\=)/g);

        // if (cookies)
        //     cookies.forEach(cookie => {
        //         document.cookie = `${cookie}=0;expires=${new Date(0).toUTCString()}`;
        //     });
    }
}
