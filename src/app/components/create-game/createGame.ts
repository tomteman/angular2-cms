import {Component, View} from 'angular2/angular2';

let styles   = require('./createGame.css');
let template = require('./createGame.html');

@Component({
  selector: 'create-game'
})
@View({
  styles: [ styles ],
  template: template
})
export class CreateGame {
  constructor() {

  }
}
