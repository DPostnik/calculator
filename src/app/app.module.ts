import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ButtonComponent } from './components/button/button.component';
import { DisplayComponent } from './components/display/display.component';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./shared/service/data.service";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ButtonComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
