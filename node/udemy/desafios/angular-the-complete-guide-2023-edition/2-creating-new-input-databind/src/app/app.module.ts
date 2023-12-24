import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { InputDatabindComponent } from './input-databind/input-databind.component';

@NgModule({
  declarations: [
    AppComponent,
    InputDatabindComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
