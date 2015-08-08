import {Component, View} from 'angular2/angular2';
import {RouteParams, Router} from 'angular2/router';
import {coreDirectives} from 'angular2/angular2';

import * as _ from 'lodash';
import {QuestionState, IQuestion} from 'app/pof-typings/question';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./scoreBoard.css');
let template = require('./scoreBoard.html');
let properties = require('app/properties.json');

@Component({
  selector: 'score-board'
})
@View({
  directives: [coreDirectives],
  styles: [styles],
  template: template
})
export class ScoreBoard {
  game;
  lastQuestion: boolean;

  constructor(public gameApi: GameApi, public router: Router, routeParams: RouteParams) {
    var gameName = routeParams.get('gameName');
    this.getGame(gameName).then(game => {
      this.lastQuestion = this.isLastQuestion(game);
      this.startTimer(game.name);
    });
  }

  getGame(gameName: string) {
    return this.gameApi.get(gameName)
      .then(result => {
        this.game = result;
        return this.game;
      })
      .catch(err => {
        console.log(err);
      });
  }

  isLastQuestion(game) {
    var indexOfCurrentQuestion = _.findIndex(game.questions, (q: IQuestion) => {
      return q.state !== QuestionState.End;
    });

    return indexOfCurrentQuestion === (game.questions.length - 1);
  }

  startTimer(gameName: string) {
    setTimeout(() => {
      this.gameApi.tick(gameName)
        .then(() => {
          if (this.lastQuestion) {
            this.router.navigate('/');          
          } else {
            this.router.navigate('/show-question/' + gameName);
          }
        })
    }, properties.scoreBoardShowTime);
  }

}
