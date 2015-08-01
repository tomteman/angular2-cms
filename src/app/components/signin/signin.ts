import {Component, View} from 'angular2/angular2';

let template = require('./signin.html');
let properties = require('app/properties.json');

@Component({
  selector: 'signin'
})
@View({
  template: template
})
export class Signin {
  signinUri: string;
  constructor() {
    this.signinUri = properties.serverLocation + '/api/auth/login/facebook';
  }  
  
}
