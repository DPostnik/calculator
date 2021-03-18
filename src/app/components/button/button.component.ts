import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Output() getButtonValue = new EventEmitter<string>();
  @Input()buttonValue;
  constructor(  ) { }

  ngOnInit(): void {
  }

  addValueButton(value: string) {
    this.getButtonValue.emit(value);
  }
}
