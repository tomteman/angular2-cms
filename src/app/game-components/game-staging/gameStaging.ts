import {
Component, View,
LifecycleEvent,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {GameState, IGame} from 'app/pof-typings/game';
import {QuestionState} from 'app/pof-typings/question';

import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./gameStaging.css');
let template = require('./gameStaging.html');

@Component({
    selector: 'game-staging',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class GameStaging {
    game: IGame;
    subscribeSource;

    constructor(public gameApi: GameApi, routeParams: RouteParams, public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        var gameName = routeParams.get('gameName');
        this.getGame(gameName).then(game => {
            this.game = game;
            this.subscribe(gameName);

            if (game.state !== GameState.Registration) {
                this.navigateToNextState(game.name);
            }
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(gameName: string) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(changes => {

            if (changes.new_val.players.length !== changes.old_val.players.length) {
                this.game.players = changes.new_val.players;
            }

            if (changes.new_val.state === GameState.InProgress) {
                this.navigateToNextState(gameName);
            }

        });
    }

    startGame() {
        this.gameApi.start(this.game.name)
            .catch(err => {
                console.log(err);
            })
    }

    navigateToNextState(gameName: string) {
        this.router.navigate('/show-question/' + gameName);
    }

    onDestroy() {
        this.subscribeSource.dispose();
    }
}
