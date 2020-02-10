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
    console.log(httpOptions);
    return this.http.get('/rentacar/api/cars', httpOptions); // it is better to be server instead of authenticate in the proxy
  }
  getModels() {
    return this.http.get('/rentacar/api/cars/models', httpOptions);
  }
  getLocations() {
    return this.http.get('/rentacar/api/cars/locations', httpOptions);
  }
}
