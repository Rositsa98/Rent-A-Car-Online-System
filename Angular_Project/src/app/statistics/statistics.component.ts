import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from '../service/admin/admin.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  private isVisible = false;

  statForm = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });


  sampleJson = {"Monday":0,"Thursday":0,"Friday":0,"Sunday":0,"Wednesday":3,"Tuesday":0,"Saturday":0};  
  private instanceCarDays = deserialize(this.sampleJson, Environment, Environment.carDays);;

  constructor(private adminService: AdminService, public datepipe: DatePipe) { }

  ngOnInit() {
  }

  search(){
    this.isVisible = true;

    var from = this.datepipe.transform(this.statForm.get("fromDate").value, 'dd-MM-yyyy');
    var to = this.datepipe.transform(this.statForm.get("toDate").value, 'dd-MM-yyyy');

    console.log(from);
    console.log(to);

    var fromTo = this.adminService.getCarsFromDateToDate(from, to).then(result => console.log(result));

    this.instanceCarDays = deserialize(fromTo, Environment, Environment.carDays);
    console.log(this.instanceCarDays);

    var avalableCars = this.adminService.getAvailableCars().then(availableCars => console.log(availableCars));

  }

  title = 'This week has number of car rents:'
   type = 'ComboChart';
   data = [
      ["Monday", this.instanceCarDays.monday],
      ["Tuesday",this.instanceCarDays.tuesday],
      ["Wednesday", this.instanceCarDays.wednesday],
      ["Thursday", this.instanceCarDays.thursday],
      ["Friday", this.instanceCarDays.friday],
      ["Saturday", this.instanceCarDays.saturday],
      ["Sunday", this.instanceCarDays.sunday],
   ];

   columnNames = ['Week days', 'Rented cars'];
   options = {   
      seriesType: 'bars',
      series: {1: {type: 'line'}}
   };
   width = 750;
   height = 500;


  title2 = 'Available cars from brands:';
  type2 = 'PieChart';
  data2 = [
          ['bmw', 16],
          ['peugeot', 20],
          ['НХГ', 5]
  ];
}

module Environment {

    export class carDays{
      constructor(){};

      monday:number;
      tuesday:number;
      wednesday:number;
      thursday:number;
      friday:number;
      saturday:number;
      sunday:number;
      }
      
}

function deserialize(json, environment, carDays) {
    var carDays = new carDays();
    var instance = carDays;
    for(var prop in json) {
        if(!json.hasOwnProperty(prop)) {
            continue;
        }

        if(typeof json[prop] === 'object') {
            instance[prop] = deserialize(json[prop], environment, environment[prop]);
        } else {
            instance[prop] = json[prop];
        }
    }

    return instance;
}


