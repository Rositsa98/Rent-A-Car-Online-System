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






