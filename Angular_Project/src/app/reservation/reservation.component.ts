import { Component, OnInit } from '@angular/core';
import {CarService} from '../service/cars/car.service';
import { ActivatedRoute } from '@angular/router';


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
    this.updateCar(this.id, this.currentCar);
  }
  getCarById(id: string) {
    this.carService.getCarById(id).subscribe(
      data => {
        console.log('Data' + data);
        this.currentCar = data;
      },
      err => console.log(err),
      () => console.log('car loaded by id')
    );
  }
  updateCar(id: string , car: any) {
    console.log('UPDATE');
    // const body = { this.currentCar.id, this.currentCar.model, this.currentCar.price, this.currentCar.seats,
    //   this.currentCar.doors, this.currentCar.automatic, this.currentCar.airConditioning, this.currentCar.available,
    //   this.currentCar.imageURL, this.currentCar.location};
    this.carService.updateCar(id , car).subscribe(
      data => {
        this.updatedCar = data;
      },
      err => console.log(err),
      () => console.log('car updated by id')

    );
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
