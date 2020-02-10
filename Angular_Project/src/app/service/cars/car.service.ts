import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
  getCarById(id: string) {
    return this.http.get('/rentacar/api/cars/' + id, httpOptions);
  }
  getModels() {
    return this.http.get('/rentacar/api/cars/models', httpOptions);
  }
  getLocations() {
    return this.http.get('/rentacar/api/cars/locations', httpOptions);
  }
  updateCar(id: string, car: any) {
    return this.http.put('/rentacar/api/cars/' + id, car, httpOptions);
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
