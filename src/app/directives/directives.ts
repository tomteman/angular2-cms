import {CORE_DIRECTIVES} from 'angular2/directives';
import {routerDirectives} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/forms';

import {Autofocus} from './Autofocus';

export var appDirectives: Array<any> = [
  Autofocus
];

export var angularDirectives: Array<any> = [
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  routerDirectives
];
