import {Injectable} from "@angular/core";

@Injectable({
    providedIn:'root'
  })
export class AppService{
  private functionalSymbols=[
    'OFF', '+/-', '√', '%', 'MRC', 'M-', 'M+', '-', '+', '=', 'x'
  ];

  public symbols = [
    'OFF','+/-','√','%','MRC','M-','M+','-','7','8','9','x','4','5','6','-','1','2','3','+','0','.','='
  ]


}
