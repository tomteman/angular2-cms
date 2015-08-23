import {Component, View} from 'angular2/angular2';
import {RouteParams, Router} from 'angular2/router';
import {coreDirectives} from 'angular2/angular2';

import * as _ from 'lodash';
import {QuestionState, IQuestion} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';
import {GameApi} from 'app/datacontext/repositories/gameApi';
import {Session} from 'app/session/session';

let styles = require('./scoreBoard.css');
let template = require('./scoreBoard.html');
let scoreBoardShowTime = 5000;

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
    subscribeSource;

    constructor(public gameApi: GameApi, public router: Router,
                routeParams: RouteParams, public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        var gameName = routeParams.get('gameName');
        this.getGame(gameName).then(game => {
            // This limit us to one presenter for a game!
            if (this.session.isPresenter()) {
                this.startTimer(game.name);
            }
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then(result => {
                this.game = result;
                this.subscribe(gameName);
                return this.game;
            })
            .catch(err => {
                console.log(err);
            });
    }

     subscribe(gameName: string) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(change => {
            console.log(change);
            this.subscribeSource.dispose();
            if (change.new_val.state === GameState.GameOver) {
                this.router.navigate('/home');
            } else {
                this.router.navigate('/show-question/' + this.game.name);
            }
        });
    }

    startTimer(gameName: string) {
        setTimeout(() => {
            this.gameApi.tick(gameName);
        }, scoreBoardShowTime);
    }

}
