import { Component, OnInit } from '@angular/core';
import {CarService} from '../../service/cars/car.service';

@Component({
  selector: 'app-compare-cars',
  templateUrl: './compare-cars.component.html',
  styleUrls: ['./compare-cars.component.scss']
})
export class CompareCarsComponent implements OnInit {
  public cars;
  public models;
  public firstCarModel;
  public secondCarModel;
  public carsReport = false;


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
    this.getModels();
  }
  onClick() {
    this.carsReport = true;

  }
  getCars() {
    this.carService.getCars().subscribe(
      data => {
        console.log('Data' + data);
        this.cars = data;
      },
      err => console.log(err),
      () => console.log('cars loaded')
    );
    // this.initialCars = this.cars;
    console.log('Json array cars:' + this.cars);
  }
  getModels() {
    this.carService.getModels().subscribe(
      data => {
        this.models = data;
      },
      err => console.log(err),
      () => console.log('models loaded')
    );
  }

}
