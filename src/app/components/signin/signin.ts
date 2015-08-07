import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

import {Session} from 'app/session/session'

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
    this.signinUri = Session.getSigninUrl(signInState);
  }
}
