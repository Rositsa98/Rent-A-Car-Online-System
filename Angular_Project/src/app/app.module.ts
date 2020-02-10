import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPannelComponent } from './login/login-pannel/login-pannel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPannelComponent } from './registration/registration-pannel/registration-pannel.component';
import { MainPannelComponent } from './main/main-pannel/main-pannel.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MatInputModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthenticationServiceComponent } from './service/authentication-service/authentication-service.component';
import { AuthenticationGuardComponent } from './guard/authentication-guard/authentication-guard.component';
import { HttpClientModule } from '@angular/common/http';
import { CarService} from './service/cars/car.service';
import { AdminPannelComponent } from './admin/admin-pannel/admin-pannel/admin-pannel.component';
import { IndexPannelComponent } from './index/index-pannel/index-pannel/index-pannel.component';
import {RegistrationService} from './service/registration/registration.service';
import { FilterPipe } from './service/cars/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginPannelComponent,
    RegistrationPannelComponent,
    MainPannelComponent,
    StatisticsComponent,
    AdminPannelComponent,
    IndexPannelComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [MatDatepickerModule, CarService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
