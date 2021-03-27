import { Component, OnInit } from '@angular/core';
import {AppService} from "../../shared/service/app.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public value = '';
  constructor(public service: AppService) { }

  ngOnInit(): void {
  }

  handleButtonValue(value) {
    this.value = this.service.handleData(value);
  }
}
