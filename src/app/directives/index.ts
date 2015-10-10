import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Autofocus} from './Autofocus';
import {MaxLength} from './maxLength';

export var SERVICES_DIRECTIVES: Array<any> = [
  Autofocus,
  MaxLength
];

export var ANGULAR_DIRECTIVES: Array<any> = [
  // Angular's core directives
  CORE_DIRECTIVES,

  // Angular's form directives
  FORM_DIRECTIVES,

  // Angular's router
  ROUTER_DIRECTIVES,
];

export var APP_DIRECTIVES: Array<any> = [
  ANGULAR_DIRECTIVES,
  SERVICES_DIRECTIVES
];