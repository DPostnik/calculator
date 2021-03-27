import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AppService {

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
    if(value == 'OFF'){ // выключаем + очищаем
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

    if(value != 'MRC'){ // если не mrc очищаем счётчик
      this.counterMRC = 0;
    }
    if(this.numbers.includes(value)) { // если цифарка
      if(this.firstAction){ // если действие первое(после =)
       this.num1 = '';
       this.num1f = false;
       this.firstAction = false;
      }
        if (this.num1f) { // если первое число записано
          if (this.op1 && value == '.' && this.num2 == '') { //если . то добавляем 0
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
      if(this.selfOperations.includes(value)){ // операции проводимые к числу к которому применяются
        if(this.num2){
          this.num2 = this.handleSelfOperations(value, this.num2);//если второе число записано то к нему
        }else{
          this.num1 = this.handleSelfOperations(value, this.num1);
          this.num1f = false;
        }
      }else{
        if(value == 'MRC'){
          if(this.counterMRC === 1) // если второй нажато очищается
          {
            this.memoryValue = '';
            this.counterMRC = 0;
            this.num1 = '';
          }else{
            if(!this.op){ // если нету оператора то в первое иначе во второе
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
        }else{ // если не mrc
          if(!this.op){ //если нету оператора, записываем его и показываем окончание первого числа
            this.op = value;
            this.num1f = true;
            this.op1 = true;
          }else{
            switch(value){ // иначе выполняем преобразование и записываем результат в первое число
              case '=':{
                value='';
                this.count(value);
                this.op1 = false;
                this.firstAction = true; // тут показываем что наше число можно изменить на другое(типо если мы будем исать другое число)
                break;
              }
              case 'x':{
                value='*';//символ на клаве х становится * в выражение
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
    if(this.num1!==''){ // добавляем в результирующиую строку потиху символы
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
    if(!this.op1){ // если сюда придёт один операнд и один оператор, то выходим
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
        if(temp[0]=='-'){ // приводим число к его -(х)
          let numb = eval(temp);
          numb = -numb;
          temp = numb.toString();
        }else
        temp = '-' + temp;
        break;
      }
      case 'M-':{ // вычитаем из числа(в нашей памяти) последнее число на экране и обнуляем последнее число
        let numb = +this.memoryValue;
        numb -= +temp;
        this.memoryValue = numb.toString();
        return '';
      }
      case 'M+':{ // добавляем к числу(в нашей памяти) последнее число на экране и обнуляем последнее число
        let numb = +this.memoryValue;
        numb += +temp;
        this.memoryValue = numb.toString();
        return '';
      }
      default: { // Берём корень нашего последнего числа
        temp = Math.sqrt(eval(temp));
      }
    }
    return temp;
  }
}

