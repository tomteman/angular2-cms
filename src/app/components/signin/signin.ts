import {Component, View} from 'angular2/angular2';

let template = require('./signin.html');

@Component({
  selector: 'signin'
})
@View({
  template: template
})
export class Signin {
  signinUri: string;
  constructor() {
    this.signinUri = 'http://pantsonfire.io:3333/api/auth/login/facebook';
  }  
  
}
