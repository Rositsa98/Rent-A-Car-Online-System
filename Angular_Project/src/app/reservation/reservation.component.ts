import { Component, OnInit } from '@angular/core';
import {Car, CarService} from '../service/cars/car.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  currentCar;
  updatedCar;
  id: string;

  constructor(private carService: CarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCarById(this.id);
    // console.log(this.currentCar.model);
    // this.updatedCar = this.updateCar(this.id);
    // console.log('Updated car' + this.updatedCar);
  }
  getCarById(id: string) {
    this.carService.getCarById(id)
      .then(
      data => {
        console.log('Data' + data);
        this.currentCar = data;
      }).then(res => console.log(this.currentCar.model))
      .then(res => this.updateCar(this.currentCar.id)).catch(
      err => { console.log(err);
      console.log('car loaded by id');}
    );
  }
  updateCar(id: string ): Promise<string> {
    console.log('UPDATE');
    console.log('id ' + id);
    // const body = { this.currentCar.id, this.currentCar.model, this.currentCar.price, this.currentCar.seats,
    //   this.currentCar.doors, this.currentCar.automatic, this.currentCar.airConditioning, this.currentCar.available,
    //   this.currentCar.imageURL, this.currentCar.location};
    // this.currentCar =  this.getCarById(id);
    console.log('model' + this.currentCar.model);
    return this.carService.updateCar(id , this.currentCar.model, this.currentCar.price, this.currentCar.seats, this.currentCar.doors,
      this.currentCar.automatic, this.currentCar.airConditioning, false, this.currentCar.imageURL, this.currentCar.location);

  }

}
