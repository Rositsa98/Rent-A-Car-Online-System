import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CarService } from '../service/cars/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  constructor(private carService:CarService, private route:Router) { }


  carsForm = new FormGroup({
    model: new FormControl(''),
    price: new FormControl(''),
    seats: new FormControl(''),
    role: new FormControl(''),
    doors:new FormControl(''),
    automatic: new FormControl(''),
    airConditioning: new FormControl(''),
    available: new FormControl(''),
    imageURL: new FormControl(''),
    location: new FormControl(''),
  });
  

  ngOnInit() {
  }

  sumbitData(){
    var model = this.carsForm.get("model").value;
    var price = this.carsForm.get("price").value;
    var seats = this.carsForm.get("seats").value;
    var doors = this.carsForm.get("doors").value;
    var automatic =  this.carsForm.get("automatic").value;
    var airConditioning =  this.carsForm.get("airConditioning").value;
    var available =  this.carsForm.get("available").value;
    var imageURL =  this.carsForm.get("imageURL").value;
    var location =  this.carsForm.get("location").value;


    var result = this.carService.addCar(model, price, seats, doors, automatic, airConditioning, available, imageURL
      , location)
    .then(result => { if(result!="" && result!=null) {this.route.navigateByUrl("/admin"); window.location.reload;} 
                      });

    console.log(result);

  
  }

}
interface Car {
  id: string;
  model: string;
  price: number;
  seats: number;
  doors: number;
  automatic: boolean;
  airConditioning: boolean;
  available: boolean;
  imageURL: string;
  location: string;


}
