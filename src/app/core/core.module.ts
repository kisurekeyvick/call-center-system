import { NgModule } from '@angular/core';
/** cache -> cookie storage */
import { CookieService } from 'src/app/core/cache/cookie';
import LocalStorageService from 'src/app/core/cache/local-storage';
import SessionStorageService from 'src/app/core/cache/session-storage';

@NgModule({
    providers: [
        CookieService,
        LocalStorageService,
        SessionStorageService
    ]
})
export class CoreModule { }
