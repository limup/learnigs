import { Component } from '@angular/core';

@Component({
  selector: 'app-input-databind',
  templateUrl: './input-databind.component.html',
  styleUrl: './input-databind.component.css'
})
export class InputDatabindComponent {
  inputName = ''
  buttonResultSign = ''
  buttonNameIsEmpty = true

  constructor(){

  }

  setSignin(){
    this.inputName += ' is allright sign on!'
  }

  isInputEmpty(){
    console.log(!this.inputName?.trim())
    this.buttonNameIsEmpty = !this.inputName?.trim()
  }

}

function isEmptyString(value: string): boolean {
  return value.trim() === ''
}
