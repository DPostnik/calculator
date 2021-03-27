import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AppService {
  private symbolsForNumbers = [
    '+/-', '%', 'M-', 'M+', '+', '=', 'x'
  ];

  private operators= [
    '+', '=', 'x' , '-', '/'
  ]

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
    '+/-','M-', 'M+',  '√'
  ]

  private counterMRC = 0;
  private memoryValue = '';
  private op = '';
  private op1 = false;
  private num1 ='';
  private num1f = false;
  private num2 ='';
  private firstAction = false;

  handleData(value: string){
    if(value == 'OFF'){
      this.num1f = false;
      this.num1 = '';
      this.memoryValue = '';
      this.num2 = '';
      this.op = '';
      this.op1 = false;
      this.counterMRC = 0;
      this.firstAction = false;
      return '';
    }

    if(value != 'MRC'){
      this.counterMRC = 0;
    }
    if(this.numbers.includes(value)) {
      if(this.firstAction){
       this.num1 = '';
       this.num1f = false;
       this.firstAction = false;
      }
        if (this.num1f) {
          if (this.op1 && value == '.' && this.num2 == '') {
            this.num2 = '0' + value;
          } else {
            this.num2 += value;
          }
        } else {
          if (value == '.' && this.num1 == '')
            this.num1 = '0' + value;
          else {
            this.num1 += value;
          }
        }
    }else{
      this.firstAction = false;
      if(this.selfOperations.includes(value)){
        if(this.num2){
          this.num2 = this.handleSelfOperations(value, this.num2);
        }else{
          this.num1 = this.handleSelfOperations(value, this.num1);
          this.num1f = false;
        }
      }else{
        if(value == 'MRC'){
          if(this.counterMRC === 1)
          {
            this.memoryValue = '';
            this.counterMRC = 0;
            this.num1 = '';
          }else{
            if(!this.op){
              this.num1 = this.memoryValue;
            }
            else{
              if(this.num1){
                this.num2 = this.memoryValue;
              }else {
                this.num1 = this.memoryValue;
              }
            }
            this.counterMRC++;
          }
        }else{
          if(!this.op){
            this.op = value;
            this.num1f = true;
            this.op1 = true;
          }else{
            switch(value){
              case '=':{
                value='';
                this.count(value);
                this.op1 = false;
                this.firstAction = true;
                break;
              }
              case 'x':{
                value='*';
              }
              default:{
                this.count(value);
              }
            }
          }
        }
      }
    }
    let str = '';
    if(this.num1!==''){
      str+=this.num1;
      if(this.op){
          str+=this.op;
          if(this.num2){
            str+=this.num2;
          }
      }
    }else{
      str='0';
    }

    return str;
  }

  count(value){
    if(!this.op1){
      this.op = value;
      this.op1 = true;
    }else{
      if(this.op=='x') {
        this.op = '*';
      }
      this.num1 = eval(`${this.num1} ${this.op} ${this.num2}`);

      this.op = value;
      this.num2 = '';
      this.num1f = true;
    }
  }

  handleSelfOperations(value, temp){
    switch(value){
      case '+/-':{
        if(temp[0]=='-'){
          let numb = eval(temp);
          numb = -numb;
          temp = numb.toString();
        }else
        temp = '-' + temp;
        break;
      }
      case 'M-':{
        let numb = +this.memoryValue;
        numb -= +temp;
        this.memoryValue = numb.toString();
        return '';
      }
      case 'M+':{
        let numb = +this.memoryValue;
        numb += +temp;
        this.memoryValue = numb.toString();
        return '';
      }
      default: {
        temp = Math.sqrt(eval(temp));
      }
    }
    return temp;
  }
}

