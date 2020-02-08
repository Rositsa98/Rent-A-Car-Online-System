import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CarService} from '../../service/cars/car.service';

@Component({
  selector: 'app-main-pannel',
  templateUrl: './main-pannel.component.html',
  styleUrls: ['./main-pannel.component.css']
})
export class MainPannelComponent implements OnInit {
  public cars;
  public models;

  constructor(private carService: CarService) { }

  optionsSelect: Array<any>;

  ngOnInit() {
    this.getCars();
    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      ];

  }

  getCars() {
    this.carService.getCars().subscribe(
      data => {this.cars = data; } ,
      err => console.log(err),
      () => console.log('cars loaded')
    );
  }
  getModels() {
    this.carService.getModels().subscribe(
      data => {this.models = data; } ,
      err => console.log(err),
      () => console.log('models loaded')
    );
  }
}





