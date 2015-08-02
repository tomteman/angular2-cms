import {Component, View} from 'angular2/angular2';

let styles   = require('./joinGame.css');
let template = require('./joinGame.html');

@Component({
  selector: 'join-game'
})
@View({
  styles: [ styles ],
  template: template
})
export class JoinGame {
  constructor() {

  }
}
