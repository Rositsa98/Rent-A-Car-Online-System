import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(username:string, password:string,
    firstName:string, lastName:string,role:string, phone:string ):Promise<boolean>{

    const body = { username, password, firstName, lastName, role, phone };
    const registerUrl = '/rentacar/api/users/registerUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(body);

    var redirectUrl = null;

    return this.http.post<any>(registerUrl, body, {
      headers,
    }).toPromise().then(result => { console.log(result); return true;})
    .catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      return false;
    });
  }

}
