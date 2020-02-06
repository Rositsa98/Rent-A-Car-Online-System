import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationServiceComponent implements OnInit {

  isAuth:boolean = false;
  
  ngOnInit(): void {
    
  }

  constructor(private http: HttpClient){
    
  }
  
  static username: string;
  static password: string;
  
  private token:string = null;

  static login(username: string, password: string): void {

    AuthenticationServiceComponent.username = username;
    AuthenticationServiceComponent.password = password;
  }

  public isAuthenticated(): boolean {

    return this.isAuth;
  }

  login(username: string, password:string):string{
    const headers = { 'Content-Type': 'application/json'}
    const body = { username: username, password: password}
    this.http.post<any>('http://localhost:8080/authentication', body, { headers }).subscribe(response => {
        this.token = response;
    });

    console.log(this.token);

    return this.token;
  }

  getToken():string {
    return this.token;
  }

}
