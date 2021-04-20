import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Data} from "../interfaces";

@Injectable({
  providedIn:'root'
})
export class AppService {

  constructor(private data: DataService) {

  }

  public symbols = [
    'OFF', '+/-', '√', '%', 'MRC', 'M-', 'M+', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='
  ]

  private numbers =[
    '7', '8', '9'
    , '4', '5', '6'
    , '1', '2', '3'
    , '0'
    , '.'
  ]
  private selfOperations = [
    '+/-','M-', 'M+',  '√', 'MRC'
  ]

  private defOperators = [
    '+','-','x','/','%'
  ]

  private counterMRC = 0;
  private memoryValue = 0;
  private op = '';
  private num1 ='';
  private numbersCounter = 0;
  private num2 ='';
  private isInputEmpty = true;
  private first = true;
  private dataString = '';

  handleData(value: string){
    if(value=='0'&&this.op=='/'){
      const resultStr = this.num1 + this.op + this.num2;
      return resultStr.slice(0,15);
    }
    this.dataString +=value;
    let resultStr = '';
    if(value != 'MRC'){ // если не mrc очищаем счётчик
      this.counterMRC = 0;
    }
    if(value == 'OFF'){
      this.isInputEmpty = true;
      this.memoryValue = 0;
      this.num1 = '';
      this.num2 = '';
      this.counterMRC = 0;
      this.op = '';
      this.numbersCounter = 0;
      return '';
    }else{
      if(this.isInputEmpty){
        if(this.defOperators.includes(value) || (this.selfOperations.includes(value) && value!='MRC') || value == '='){
          return '';
        }
        else{
          if(value=='MRC'){
            if(this.num2){
              this.num2 = this.memoryValue.toString();
            }
            else{
              this.num1 = this.memoryValue.toString();
            }
          }
          if(value == '.'){
            return '';
          } else{
            this.isInputEmpty = false;
            this.numbersCounter = 1;
            this.num1 = value.toString();
          }
        }
      }else{
        switch(this.numbersCounter){
          case 1:{
            if(this.numbers.includes(value)){
              if((this.num1.includes('.') && value != '.') || !this.num1.includes('.')){
                if(this.num1.length <= 5)
                  this.num1 += value.toString();
              }
            }else if(this.defOperators.includes(value)){
              this.op = value.toString();
              this.numbersCounter = 2;
            }else if(this.selfOperations.includes(value)){
              this.handleSelfOperations(value);
            }
            break;}
          case 2:{
            if(this.numbers.includes(value)){
              if((this.num2.includes('.') && value != '.') || (!this.num2.includes('.') && this.num2!='') || (this.num2 == '' && value != '.')){
                if(this.num2.length <= 5)
                  this.num2 += value.toString();
              }
            }else if(this.defOperators.includes(value) || value == '='){
              if(this.num2 != ''){
                this.calculateDefOperations(value);
              }
              else{
                this.op = value.toString();
              }
            }else if(this.selfOperations.includes(value)){
              if(this.num2 != ''){
                this.calculateDefOperations('=');
                this.handleSelfOperations(value);
              }else{
                this.handleSelfOperations(value)
              }
            }
            break;
          }
        }
      }
      resultStr = this.num1 + this.op + this.num2;
      return resultStr.slice(0,15);
      // return resultStr;
    }
  }

  calculateDefOperations(nextOperation: string){
    switch(this.op){
      case '+':{
        this.num1 = (Number(this.num1) + Number(this.num2)).toString();
        break;
      }
      case '-':{
        this.num1 = (Number(this.num1) - Number(this.num2)).toString();
        break;
      }
      case 'x':{
        this.num1 = (Number(this.num1) * Number(this.num2)).toString();
        break;
      }
      case '/':{
        this.num1 = (Number(this.num1) / Number(this.num2)).toString();
        break;
      }
      case '%':{
        this.num1 = (Number(this.num1)/100*Number(this.num2)).toString();
        break;
      }
    }
    this.num2 = '';
    if(nextOperation == '='){
      this.op = '';
      this.numbersCounter = 1;
      const data: Data = {
        value: this.dataString+eval(this.num1),
        date: new Date()
      }
      this.data.sendData(data)
        .subscribe( ()=>{
          console.log('success');
        });
      this.dataString = this.num1;
    }
    else{
      this.op = nextOperation;
    }

  }

  handleSelfOperations(operation: string){
    switch(operation){
      case '√':{
        this.num1 = Math.sqrt(Number(this.num1)).toString();
        break;
      }
      case '+/-':{
        this.num1 = (Number(this.num1)*(-1)).toString();
        break;
      }
      case 'M-':{
        this.memoryValue -= Number(this.num1);
        break;
      }
      case 'M+':{
        this.memoryValue += eval(this.num1);
        break;
      }
      case 'MRC':{
        if(this.counterMRC == 0){
          if(this.op)
            this.num2 = this.memoryValue.toString();
          else
            this.num1 = this.memoryValue.toString();
          this.counterMRC++;
        }else{
          this.memoryValue = 0;
          this.counterMRC = 0;
          this.num1 = '0';
        }
      }
    }
  }
}
