import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AppShareModule } from 'src/app/shared/share.module';

@NgModule({
    imports: [
        UserRoutingModule,
        AppShareModule
    ],
    declarations: [UserComponent],
    exports: [UserComponent],
})
export class UserModule {}