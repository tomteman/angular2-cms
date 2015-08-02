import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {Inject} from 'angular2/di';
import {Base64} from './base64';

let template = require('./signin.html');
let properties = require('app/properties.json');


@Component({
  selector: 'signin',
  viewInjector: [ Base64 ],
  properties: ['state: state'],
})
@View({
  template: template
})
export class Signin {
  signinUri: string;

  constructor(base64: Base64, routeParams: RouteParams) {
    console.log('routeParams', routeParams.get('state'));
    var state = {
      returnUrl: 'list-questions'
    }
    console.log('base64.encode(JSON.stringify(state))', base64.encode(JSON.stringify(state)));
    this.signinUri = properties.serverLocation + '/api/auth/login/facebook/' + base64.encode(JSON.stringify(state));
  } 
}
