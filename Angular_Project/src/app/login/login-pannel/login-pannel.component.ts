import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationServiceComponent } from 'src/app/service/authentication-service/authentication-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pannel',
  templateUrl: './login-pannel.component.html',
  styleUrls: ['./login-pannel.component.css']
})
export class LoginPannelComponent implements OnInit {

  title: string = "Login";

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  private isInvalidLogin = false;

  constructor(private authService: AuthenticationServiceComponent, private route: Router) { }

  ngOnInit() {
  }

  login() {
    var result = this.authService.login(this.loginForm.get("username").value,
      this.loginForm.get("password").value).then(redirectUrl => {
        if(redirectUrl === "/login" || redirectUrl === "" || redirectUrl === null){
          this.isInvalidLogin = true;
          window.location.reload;
        }
        this.route.navigateByUrl(redirectUrl);
        window.location.reload;
      });
  }

}
