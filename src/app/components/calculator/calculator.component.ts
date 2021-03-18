import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public symbols = [
    'OFF','+/-','√','%','MRC','M-','M+','-','7','8','9','x','4','5','6','-','1','2','3','+','0','.','='
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
