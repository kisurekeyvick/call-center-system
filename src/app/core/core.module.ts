import { NgModule } from '@angular/core';
/** cache -> cookie storage */
import { CookieService } from 'src/app/core/cache/cookie';
import LocalStorageService from 'src/app/core/cache/local-storage';
import SessionStorageService from 'src/app/core/cache/session-storage';
import { UtilsService } from 'src/app/core/utils/utils.service';
import { _HttpClient } from 'src/app/core/utils/http.client';

@NgModule({
    providers: [
        CookieService,
        LocalStorageService,
        SessionStorageService,
        UtilsService,
        _HttpClient
    ]
})
export class CoreModule { }
