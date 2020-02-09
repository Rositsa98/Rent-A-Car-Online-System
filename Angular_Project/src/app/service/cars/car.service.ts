import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders.set({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
}
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get('authenticate/api/cars'); // it is better to be server instead of authenticate in the proxy
  }
  getModels() {
    return this.http.get('authenticate/api/cars/models');
  }
}
