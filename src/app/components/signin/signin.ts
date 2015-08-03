import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {Base64} from 'app/facade/base64';

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

  constructor(routeParams: RouteParams) {
    var signInState = routeParams.get('state');
    
    if (!signInState) {
      signInState = Base64.encode(JSON.stringify({returnUrl: window.location.pathname}));      
    }
    
    this.signinUri = properties.serverLocation + '/api/auth/login/facebook/' + signInState;
  } 
}
