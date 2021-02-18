import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPannelComponent } from './login/login-pannel/login-pannel.component';
import { RegistrationPannelComponent } from './registration/registration-pannel/registration-pannel.component';
import { MainPannelComponent } from './main/main-pannel/main-pannel.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminPannelComponent } from './admin/admin-pannel/admin-pannel/admin-pannel.component';
import { IndexPannelComponent } from './index/index-pannel/index-pannel/index-pannel.component';
import {ReservationComponent} from './reservation/reservation.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCarComponent } from './add-car/add-car.component';
import {CompareCarsComponent} from "./compare/compare-cars/compare-cars.component";
import { AuthenticationGuardComponent } from './guard/authentication-guard/authentication-guard.component';
import {AdminViewGuardComponent} from './guard/admin-view-guard/admin-view-guard.component';

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
    path: 'main', component: MainPannelComponent, canActivate: [AuthenticationGuardComponent]
  },
  {
    path: 'compare', component: CompareCarsComponent, canActivate: [AuthenticationGuardComponent]
  },
  {
    path: 'reserve/:id', component: ReservationComponent, canActivate: [AuthenticationGuardComponent]
  },
  {
    path: 'statistics', component: StatisticsComponent, canActivate: [AuthenticationGuardComponent]
  },
  {
    path: 'admin', component: AdminPannelComponent, canActivate: [AdminViewGuardComponent]
  },
  {

    path: 'index', component: IndexPannelComponent
  },
  {
    path: 'addUser', component: AddUserComponent, canActivate: [AuthenticationGuardComponent]
  },
  {
    path: 'addCar', component: AddCarComponent, canActivate: [AuthenticationGuardComponent]

  },
  {
    path:'logout', redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
