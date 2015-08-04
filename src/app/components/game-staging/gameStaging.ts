import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {GameApi} from 'app/datacontext/repositories/game';

let styles = require('./gameStaging.css');
let template = require('./gameStaging.html');

@Component({
  selector: 'create-game'
})
@View({
  styles: [styles],
  template: template
})
export class GameStaging {
  game;

  constructor(public gameApi: GameApi, routeParams: RouteParams) {
    var gameName = routeParams.get('gameName');
    this.getGame(gameName);
  }

  getGame(gameName: string) {
    this.gameApi.get(gameName)
      .then(result => {
        console.log(result);
        this.game = result;
        this.subscribe(gameName);
      })
      .catch(err => {
        console.log(err);
      });
  }

  subscribe(gameName: string) {
    this.gameApi.feed(gameName).subscribe(change => {
      console.log(change);
    });
  }
}
