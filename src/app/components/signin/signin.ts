import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';


let template = require('./signin.html');
let properties = require('app/properties.json');


@Component({
  selector: 'signin',
  properties: ['state: state'],
})
@View({
  template: template
})
export class Signin {
  signinUri: string;

  constructor(routeParams: RouteParams) {
    console.log('state', routeParams.get('state'));
    this.signinUri = properties.serverLocation + '/api/auth/login/facebook/' + routeParams.get('state');
  } 
}
