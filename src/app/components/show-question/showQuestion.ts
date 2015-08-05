import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {coreDirectives} from 'angular2/angular2';

import {GameApi} from 'app/datacontext/repositories/game';

let styles = require('./showQuestion.css');
let template = require('./showQuestion.html');

@Component({
  selector: 'show-question'
})
@View({
  directives: [coreDirectives],
  styles: [styles],
  template: template
})
export class ShowQuestion {
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
