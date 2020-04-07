import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftManageListComponent } from './gift-manage.component';
import { GIftFormModalComponent } from './modal/gift-form/gift-form-modal.component';

export const routedComponents = [
    GiftManageListComponent,
    GIftFormModalComponent
];

export const entriedComponents = [
    GIftFormModalComponent
];

const routes: Routes = [
    { path: '', component: GiftManageListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GiftRoutingModule {}