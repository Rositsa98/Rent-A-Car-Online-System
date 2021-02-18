import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token') })
};
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get('/rentacar/api/cars', httpOptions);
  }
  getCarById(id: string):Promise<Object> {
    return this.http.get('/rentacar/api/cars/' + id, httpOptions).toPromise().then(result =>{ return result;});
  }
  getModels() {
    return this.http.get('/rentacar/api/cars/models', httpOptions);
  }
  getLocations() {
    return this.http.get('/rentacar/api/cars/locations', httpOptions);
  }

  updateCar(id: string, model, price, seats, doors, automatic, airConditioning, available, imageURL, location): Promise<string> {
    console.log('Here in update service method');
    const body = {id, model, price, seats, doors, automatic,
      airConditioning, available, imageURL, location };
    console.log('Body ' + body);
    return this.http.put<string>('/rentacar/api/cars/' + id, body, httpOptions)
      .toPromise()
      .then(result => {
        console.log('Result in update car' + result);
        return result;
      });
  }

  addCar(model, price, seats, doors, automatic, airConditioning, available, imageURL, location): Promise<string> {
    const body = { model, price, seats, doors, automatic,
    airConditioning, available, imageURL, location };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<string>('/rentacar/api/cars', body, {
      headers,
    }).toPromise()
      .then(result => {
        return result;
      });
  }

  deleteCar(id: string) {
    return this.http.delete('/rentacar/api/cars/' + id, httpOptions);

  }
}
export interface Car {
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
