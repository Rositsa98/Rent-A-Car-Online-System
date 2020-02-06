import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceComponent } from 'src/app/service/authentication-service/authentication-service.component';

@Component({
  selector: 'app-login-pannel',
  templateUrl: './login-pannel.component.html',
  styleUrls: ['./login-pannel.component.css']
})
export class LoginPannelComponent implements OnInit {

  title:string = "Login";

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationServiceComponent,
   ) { }

  ngOnInit() {
  }

  login() {

    console.log("Username" + this.loginForm.get("username").value);
    console.log("Password"  + this.loginForm.get("password").value);

    this.authenticationService.login(this.loginForm.get("username").value,
    this.loginForm.get("password").value);
    
    if(this.authenticationService.isAuthenticated()){
      this.router.navigateByUrl("/main");
    }
  }


}
