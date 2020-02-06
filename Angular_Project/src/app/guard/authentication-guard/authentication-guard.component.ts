import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationServiceComponent } from 'src/app/service/authentication-service/authentication-service.component';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardComponent implements CanActivate {

  constructor(public auth: AuthenticationServiceComponent, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      alert("Wrong username or password!")
      return false;
    }
    return true;
  }

}
