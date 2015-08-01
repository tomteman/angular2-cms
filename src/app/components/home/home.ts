import {Component, View} from 'angular2/angular2';
import {routerDirectives, RouteConfig} from 'angular2/router';

let styles   = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  directives: [ routerDirectives ],
  styles: [ styles ],
  template: template
})

export class Home {
  constructor() {

  }
}
