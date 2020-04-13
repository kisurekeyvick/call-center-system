import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', loadChildren: () => import('src/app/pages/login/login.module').then(m => m.LoginModule) },
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
  },
  {
    path: 'listQuery',
    loadChildren: () => import('src/app/pages/list-query/list-query.module').then(m => m.ListQueryModule)
  },
  {
    path: 'listRecovery',
    loadChildren: () => import('src/app/pages/list-recovery/list-recovery.module').then(m => m.ListRecoveryModule)
  },
  {
    path: 'successSubmit',
    loadChildren: () => import('src/app/pages/success-submit/success-submit.module').then(m => m.SuccessSubmitModule)
  },
  {
    path: 'dataReport',
    loadChildren: () => import('src/app/pages/data-report/data-report.module').then(m => m.DataReportModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('src/app/pages/summary/summary.module').then(m => m.SummaryModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
