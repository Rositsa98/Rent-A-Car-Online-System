import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationServiceComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  isAuth = false;

  username: string;
  password: string;

  private token: MyJSON = null;

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {

  }


  public isAuthenticated(): boolean {

    return this.isAuth;
  }
  

  login(username: string, password: string):string {

    const body = {username, password};
    const url = '/rentacar/authenticate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(url, body, {  headers,
                        }).toPromise()
                        .then(result => {
                           this.token = result; 
                          console.log("HEREEE" + this.token.jwt); 
                          
                          
                          localStorage.setItem("token", this.token.jwt);
                          
                        });

     return this.token!=null ? this.token.jwt : "";

  }

  getToken(): string {
    return this.token.jwt;
  }

}

interface MyJSON {
  jwt: string;
}
