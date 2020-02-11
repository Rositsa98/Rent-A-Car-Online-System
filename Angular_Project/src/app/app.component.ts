import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent-a-car';

  constructor(private route:Router){}

  logout(){
    localStorage.removeItem("token");
    this.route.navigateByUrl("login");
  }
}
