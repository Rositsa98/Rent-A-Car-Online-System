import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationService } from '../service/registration/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  private regError:boolean = false;

  constructor(private registrationService:RegistrationService, private route:Router) { }

  ngOnInit() {
  }

  addUserForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    role:new FormControl(''),
    phone: new FormControl(''),
  });


  sumbitData(){
    var username = this.addUserForm.get("name").value;
    var password = this.addUserForm.get("password").value;
    var firstName = this.addUserForm.get("firstName").value;
    var lastName = this.addUserForm.get("lastName").value;
    var role = this.addUserForm.get("role").value;
    var phone = this.addUserForm.get("phone").value;

    console.log(role);

    var result = this.registrationService.registerUser(username, password, firstName, lastName,role, phone)
    .then(result => { if(result===true) {this.route.navigateByUrl("/admin"); window.location.reload;} 
                      else {this.regError = true;} window.location.reload; });

    console.log(result);

  
  }
}
