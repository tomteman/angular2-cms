/// <reference path="../typings/_custom.d.ts" />
import {bind} from 'angular2/angular2';
import {
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

export var HASH_LOCATION_BINDINGS = [
  bind(LocationStrategy).toClass(HashLocationStrategy)
];
