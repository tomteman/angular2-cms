import {Component, View} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import {coreDirectives} from 'angular2/angular2';

import {GameApi} from 'app/datacontext/repositories/game';

let styles = require('./gameStaging.css');
let template = require('./gameStaging.html');

@Component({
  selector: 'create-game'
})
@View({
  directives: [coreDirectives],
  styles: [styles],
  template: template
})
export class GameStaging {
  game;
  
  constructor(public gameApi: GameApi, routeParams: RouteParams, public router: Router) {
    var gameName = routeParams.get('gameName');
    this.getGame(gameName);
  }

  getGame(gameName: string) {
    this.gameApi.get(gameName)
      .then(result => {
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
      
      if (change.new_val) {
        this.game.players = change.new_val.players;   
      }
      
    });
  }
  
  startGame() {
    this.gameApi.start(this.game.name)
      .then(result => {
        this.router.navigate('/show-question/' + result.name);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
