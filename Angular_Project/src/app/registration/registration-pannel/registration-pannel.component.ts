import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationService } from 'src/app/service/registration/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-pannel',
  templateUrl: './registration-pannel.component.html',
  styleUrls: ['./registration-pannel.component.css']
})
export class RegistrationPannelComponent implements OnInit {

  private regError:boolean = false;
  constructor(private registrationService:RegistrationService, private route:Router) { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
  });

  sumbitData(){
    var username = this.registrationForm.get("name").value;
    var password = this.registrationForm.get("password").value;
    var firstName = this.registrationForm.get("firstName").value;
    var lastName = this.registrationForm.get("lastName").value;
    var phone = this.registrationForm.get("phone").value;

    console.log(username);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    console.log(phone);

    var result = this.registrationService.registerUser(username, password, firstName, lastName,null, phone)
    .then(result => { if(result===true) {this.route.navigateByUrl("/main"); window.location.reload;} 
                      else {this.regError = true;} window.location.reload; });

    console.log(result);

  
  }

}
