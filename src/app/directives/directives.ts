import {coreDirectives} from 'angular2/directives';
import {routerDirectives} from 'angular2/router';
import {formDirectives} from 'angular2/forms';

import {Autofocus} from './Autofocus';

export var appDirectives: Array<any> = [
  Autofocus
];

export var angularDirectives: Array<any> = [
  coreDirectives,
  formDirectives,
  routerDirectives
];
