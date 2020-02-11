import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getCarsFromDateToDate(fromDate:string, toDate:string): Promise<string>{
  let roles: string;
    const carsUrl = '/rentacar/statistics/' + fromDate + '/' + toDate;
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get<string>(carsUrl, { headers, responseType: 'text' as 'json' }).toPromise().then(data => {
      roles = data;
      console.log(data);
      return roles;
    });

  }

  getAvailableCars():Promise<string>{
    let roles: string;
    const carsUrl = '/rentacar/statistics/availableCarBrands';
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get<string>(carsUrl, { headers, responseType: 'text' as 'json' }).toPromise().then(data => {
      roles = data;
      console.log(data);
      return roles;
    });
  }
}
