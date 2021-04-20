import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import {Data} from "../../shared/interfaces";
import {pipe} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  data: Data[];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData()
      .subscribe(
        response => {
          console.log(response);
          this.data = response
        }
      )
  }

  removeAll() {
    this.dataService.remove()
      .subscribe(
        ()=>{
          this.data = this.data.filter(
            data => data.value != '0'
          )
        }
      )
  }
}
