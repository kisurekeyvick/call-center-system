import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'user', loadChildren: () => import('src/app/pages/user/user.module').then(m => m.UserModule) },
  { path: 'home', loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule) },
  {
    path: 'organization', 
    loadChildren: () => import('src/app/pages/organization-manage/organization-manage.module').then(m => m.OrganizationModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('src/app/pages/customer-manage/customer-manage.module').then(m => m.CustomerModule)
  },
  {
    path: 'gift',
    loadChildren: () => import('src/app/pages/gift-manage/gift-manage.module').then(m => m.GiftModule)
  },
  {
    path: 'listAssignment',
    loadChildren: () => import('src/app/pages/list-assignment/list-assignment.module').then(m => m.ListAssignMentModule)
  },
  {
    path: 'rebateApplication',
    loadChildren: () => import('src/app/pages/rebate-application/rebate-application.module').then(m => m.RebateApplicationModule)
  },
  {
    path: 'system',
    loadChildren: () => import('src/app/pages/system-manage/system-manage.module').then(m => m.SystemManageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
