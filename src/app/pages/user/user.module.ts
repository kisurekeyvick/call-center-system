import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserSettingComponent } from './user.component';
import { AppShareModule } from 'src/app/shared/share.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        UserRoutingModule,
        AppShareModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [UserSettingComponent],
    exports: [UserSettingComponent],
})
export class UserModule {}
