import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/service/cars/car.service';

@Component({
  selector: 'app-index-pannel',
  templateUrl: './index-pannel.component.html',
  styleUrls: ['./index-pannel.component.scss']
})
export class IndexPannelComponent implements OnInit {
  public cars;
  public models;
  public locations;
  selectedLocation: string;
  selectedModel: string;
  currentCaId;
  toBeSearch = false;

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.getLocations();
    this.getModels();
    this.getCars();

  }
  onSearch() {
    this.toBeSearch = true;
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
  getLocations() {
    this.carService.getLocations().subscribe(
      data => {
        this.locations = data;
      },
      err => console.log(err),
      () => console.log('locations loaded')
    );
  }

  onClick(id: string) {
    this.currentCaId = id;
  }
}
