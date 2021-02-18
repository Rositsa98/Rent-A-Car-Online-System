import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServiceComponent } from '../../service/authentication-service/authentication-service.component';

@Injectable({ providedIn: 'root' })
export class AdminViewGuardComponent implements CanActivate {

  constructor(public auth: AuthenticationServiceComponent, public router: Router) { }

  canActivate(): boolean {
    console.log(localStorage.getItem("token"));

    if (localStorage.getItem("role")==null || localStorage.getItem("role")==="" 
        || localStorage.getItem("role")!="Admin" || 
        localStorage.getItem("token")==null || localStorage.getItem("token")==="") {
      this.router.navigate(['login']);
      alert("Wrong authentication!")
      return false;
    } else if(localStorage.getItem("token")!=null && localStorage.getItem("token")!=""
              && localStorage.getItem("role")==="Admin"){
    return true;
    }
  }

}