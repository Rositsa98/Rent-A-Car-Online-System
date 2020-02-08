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

  private token: string = null;

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {

  }


  public isAuthenticated(): boolean {

    return this.isAuth;
  }

  login(username: string, password: string) {

    const body = {username, password};
    const url = '/authenticate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(url, body, {  headers,
                                        responseType: 'json'
                        }).subscribe(result => {console.log(result); this.token = result; });

  }

  getToken(): string {
    return this.token;
  }

}
