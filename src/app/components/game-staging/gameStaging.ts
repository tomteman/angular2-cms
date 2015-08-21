import {Component, View} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import {coreDirectives} from 'angular2/angular2';

import {GameState} from 'app/pof-typings/game';
import {GameApi} from 'app/datacontext/repositories/gameApi';

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
    subscribeSource;

    constructor(public gameApi: GameApi, routeParams: RouteParams, public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

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
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(change => {
            console.log(change);

            if (change.new_val.players.length !== change.old_val.players.length) {
                this.game.players = change.new_val.players;
            }

            if (change.new_val.state === GameState.InProgress) {
                this.subscribeSource.dispose();
                this.router.navigate('/show-question/' + gameName);
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
