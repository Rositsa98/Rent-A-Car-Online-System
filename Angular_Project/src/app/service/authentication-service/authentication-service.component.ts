import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';
import { RequestOptions } from '@angular/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationServiceComponent implements OnInit {

  constructor(private http: HttpClient, private http2: HttpClient) {

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


  login(username: string, password: string): Promise<string> {

    const body = { username, password };
    const loginUrl = '/rentacar/authenticate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    var roles;

    var redirectUrl = null;

    return this.http.post<any>(loginUrl, body, {
      headers,
    }).toPromise()
      .then(result => {
        this.token = result;
        console.log("HEREEE" + this.token.jwt);
        localStorage.setItem("token", this.token.jwt);

      })
      .then(result => {
        roles = this.getRoles(username);
        return roles;
      }
      )
      .then(roles => { console.log("second" + roles); return roles; })

      .then(roles => {
        console.log("determine"); redirectUrl = this.determineRedirectByRole(roles);

        return redirectUrl != null ? redirectUrl : "/login";
      }
      )

  }

  getToken(): string {
    return this.token.jwt;
  }

  getRoles(username: string): Promise<string> {
    var roles: string;
    const rolesUrl = '/rentacar/api/users/roles';
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'username': username
    }
    return this.http.get<string>(rolesUrl, { headers, responseType: 'text' as 'json' }).toPromise().then(data => {
      roles = data;
      console.log("getRoles" + data);
      return roles;
    });
  }


  determineRedirectByRole(role: string): string {
    switch (role) {
      case "Admin": return "/";
      case "User": return "/main";
      case "Operator": return "/register";
    }
  }

}

interface MyJSON {
  jwt: string;
}
