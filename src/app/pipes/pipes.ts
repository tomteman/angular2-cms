/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {bind} from 'angular2/di';
import {PipeRegistry, Pipes, defaultPipes} from 'angular2/change_detection';

/*
 * App Pipes
 */
import {capitalize} from './CapitalizePipe';
import {rxAsync} from './RxPipe';
import {json} from './JsonPipe'


export var appPipes = [
  Pipes.extend({
    'async': rxAsync,
    'capitalize': capitalize,
    'json': json
    // add more pipes to this Map
  })
];
