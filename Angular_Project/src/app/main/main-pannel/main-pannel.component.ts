import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-pannel',
  templateUrl: './main-pannel.component.html',
  styleUrls: ['./main-pannel.component.css']
})
export class MainPannelComponent implements OnInit {

  constructor() { }

  optionsSelect: Array<any>;

  ngOnInit() {

    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      ];
   
  }


  
}
