import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationServiceComponent implements OnInit {

  isAuth:boolean = false;
  
  ngOnInit(): void {
    
  }

  constructor(private http: HttpClient){
    
  }
  
  username: string;
  password: string;
  
  private token:string = null;


  public isAuthenticated(): boolean {

    return this.isAuth;
  }

  login(username: string, password:string){

    var body = {"username": username, "password":password};
    let url = "/authenticate";
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    this.http.post<any>(url, body, {  headers: headers,
                                        responseType: "json"
                        }).subscribe(result => {console.log(result); this.token = result;});
  
  }

  getToken():string {
    return this.token;
  }

}
