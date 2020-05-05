import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordManageComponent } from './word-manage/word-manage.component';
import { WordItemModalComponent } from './modal/word-item-form/word-item-form.component';
import { RatioSettingListComponent } from './ratio-setting/ratio-setting.component';
import { RatioFormModalComponent } from './modal/ratio-form/ratio-form.component';
import { DefeatReasonComponent } from './defeat-reason/defeat-reason.component';
import { DefeatReasonFormModalComponent } from './modal/defeat-reason-form/defeat-reason-form.component';
import { GiftManageListComponent } from './gift-manage/gift-manage.component';
import { GIftFormModalComponent } from './modal/gift-form/gift-form-modal.component';

export const routedComponents = [
    WordManageComponent,
    WordItemModalComponent,
    RatioSettingListComponent,
    RatioFormModalComponent,
    DefeatReasonComponent,
    DefeatReasonFormModalComponent,
    GiftManageListComponent,
    GIftFormModalComponent
];

export const entriedComponents = [
    WordItemModalComponent,
    RatioFormModalComponent,
    DefeatReasonFormModalComponent,
    GIftFormModalComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: 'wordManagement',
        pathMatch: 'full'
    },
    { 
        path: 'wordManagement', 
        component: WordManageComponent 
    },
    {
        path: 'ratioSetting',
        component: RatioSettingListComponent
    },
    {
        path: 'defeatReason',
        component: DefeatReasonComponent
    },
    {
        path: 'giftManagement',
        component: GiftManageListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}
