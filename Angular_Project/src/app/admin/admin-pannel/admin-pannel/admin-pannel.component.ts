import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users/user.service';
import { CarService } from 'src/app/service/cars/car.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-admin-pannel',
  templateUrl: './admin-pannel.component.html',
  styleUrls: ['./admin-pannel.component.scss']
})
export class AdminPannelComponent implements OnInit {

  isViewUsers:boolean = false;
  isViewCars:boolean = false;
  isViewProfits:boolean = false;


  public users;
  public cars;

  constructor(private userService:UserService, private carsService:CarService,
    private router:Router) { }

  ngOnInit() {
    this.users = this.getUsers(); 
    this.cars = this.getCars();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(
      data => {
        console.log('Data' + data);
        this.users = data;
      },
      err => console.log(err),
      () => console.log('users loaded')
    );
    console.log('Json array users:' + this.users);
  }

  getCars() {
    this.carsService.getCars().subscribe(
      data => {
        console.log('Data' + data);
        this.cars = data;
      },
      err => console.log(err),
      () => console.log('cars loaded')
    );
    console.log('Json array cars:' + this.cars);
  }

  viewUsers(){
    this.isViewUsers = true;
    this.isViewCars = false;
    this.isViewProfits = false;
  }

  viewCars(){
    this.isViewUsers = false;
    this.isViewCars = true;
    this.isViewProfits = false;
  }

  viewProfits(){
    this.isViewUsers = false;
    this.isViewCars = false;
    this.isViewProfits = true;

    this.router.navigateByUrl("/statistics");
  }

  addUser(){
    this.router.navigateByUrl("/addUser");
  }

  addCar(){
    this.router.navigateByUrl("/addCar");
  }

  deleteUser(id:string){
    this.userService.deleteUser(id)
    .subscribe(data => {
      console.log(data);
      window.location.reload;
    });
  }

  deleteCar(id:string){
    this.carsService.deleteCar(id)
    .subscribe(data => {
      console.log(data);
      window.location.reload;
    });
  }
}

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
   
}
