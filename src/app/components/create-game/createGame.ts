import {Component, View} from 'angular2/angular2';
import {GameApi} from 'app/datacontext/repositories/game';

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
  constructor(gameApi: GameApi) {
    gameApi.create()
      .then(result => {
        location.href = '/game-staging/' + result.name;
      })
      .catch(err => {
        console.log(err);
      })
  }
}
