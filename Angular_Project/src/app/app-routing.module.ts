import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPannelComponent } from './login/login-pannel/login-pannel.component';
import { RegistrationPannelComponent } from './registration/registration-pannel/registration-pannel.component';
import { MainPannelComponent } from './main/main-pannel/main-pannel.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminPannelComponent } from './admin/admin-pannel/admin-pannel/admin-pannel.component';
import { IndexPannelComponent } from './index/index-pannel/index-pannel/index-pannel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPannelComponent
  },
  {
    path: 'register', component: RegistrationPannelComponent
  },
  {
    // path:'main', component:MainPannelComponent, canActivate: [AuthenticationGuardComponent]
    path: 'main', component: MainPannelComponent
  },
  {
    path: 'statistics', component: StatisticsComponent
  },
  {
    path: 'admin', component:AdminPannelComponent
  },
  {
    path:'index', component:IndexPannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
