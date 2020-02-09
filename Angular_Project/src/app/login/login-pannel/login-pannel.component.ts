import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
 

  constructor() { }

  ngOnInit() {
  }

}
