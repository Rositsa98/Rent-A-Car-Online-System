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
  public initialCars;
  public models;
  public locations;
  selectedLocation: string;
  selectedModel: string;
  toBeUpdate: boolean;

  constructor(private carService: CarService) {
  }

  optionsSelect: Array<any>;

  ngOnInit() {
    this.getLocations();
    this.getModels();
    this.getCars();

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
    this.initialCars = this.cars;
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
  filterByLocation() {
    if (!this.cars) { return []; }
    if (!this.selectedLocation) { return this.cars; }
    return this.cars.filter( car => {
      return car.location.includes(this.selectedLocation);
    });
  }
  filterByModel() {
    if (!this.cars) { return []; }
    if (!this.selectedModel) { return this.cars; }
    return this.cars.filter( car => {
      return car.model.includes(this.selectedModel);
    });
  }
  filterCars() {
    if (this.selectedLocation === '' && this.selectedModel === '') {
      console.log('No selected values' + 'Loc:' + this.selectedLocation + '  Mod:' + this.selectedModel);
      return this.cars;
    }
    if (this.selectedLocation !== '' && this.selectedModel === '') {
      console.log('Selected value for location: ' + 'Loc:' + this.selectedLocation + '  Mod:' + this.selectedModel);
      return this.filterByLocation();
    }
    if (this.selectedLocation === '' && this.selectedModel !== '') {
      console.log('Selected value for model:' + 'Loc:' + this.selectedLocation + '  Mod:' + this.selectedModel);
      return this.filterByModel();
    }
    if (this.selectedLocation !== '' && this.selectedModel !== '') {
      console.log('Selected values for both' + 'Loc:' + this.selectedLocation + '  Mod:' + this.selectedModel);
      this.cars = this.filterByLocation()
      return this.filterByModel();
    }
    this.cars = this.initialCars;

    }
  onClick() {
    this.toBeUpdate = true;

  }
  // filterThroughCars() {
  //   console.log('InFilter')
  //   console.log('SelectedLoc:' + this.selectedLocation)
  //   console.log('SelectedModel:' + this.selectedModel)
  //
  //   if (this.selectedLocation === '' && this.selectedLocation === '') {
  //     this.cars = [];
  //   }
  //   if (this.selectedLocation != null && this.selectedModel == null) {
  //     this.cars.filter( car => car.location === this.selectedLocation);
  //   }
  //   if (this.selectedLocation == null && this.selectedModel != null) {
  //     this.cars.filter( car => car.model === this.selectedModel);
  //   }
  //   if (this.selectedLocation != null && this.selectedModel != null) {
  //     this.cars.filter ( car => car.location === this.selectedLocation && car.model === this.selectedModel);
  //   }
  //   window.location.reload();
  //
  //
  // }
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






