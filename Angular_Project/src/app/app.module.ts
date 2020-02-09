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
<<<<<<< HEAD
=======
import { AuthenticationServiceComponent } from './service/authentication-service/authentication-service.component';
import { AuthenticationGuardComponent } from './guard/authentication-guard/authentication-guard.component';
import { HttpClientModule } from '@angular/common/http';
import { CarService} from './service/cars/car.service';
>>>>>>> 68fcb30bb3de48aa3a11c4180cd3183bd471059b

@NgModule({
  declarations: [
    AppComponent,
    LoginPannelComponent,
    RegistrationPannelComponent,
    MainPannelComponent,
    StatisticsComponent
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
<<<<<<< HEAD
    BrowserAnimationsModule
 
=======
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

>>>>>>> 68fcb30bb3de48aa3a11c4180cd3183bd471059b
  ],
  providers: [MatDatepickerModule, CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
