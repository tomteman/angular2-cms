import {
Component, View,
OnDestroy,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';

import {GameState, IGame} from 'app/bs-typings/game';
import {QuestionState} from 'app/bs-typings/question';

import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./gameStaging.scss');
let template = require('./gameStaging.html');

@Component({
    selector: 'game-staging'
})
@View({
    directives: [CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class GameStaging implements OnDestroy {
    initialLoading: boolean;
    game: IGame;
    subscribeSource;

    constructor(public gameApi: GameApi, routeParams: RouteParams, public router: Router) {
        LoadingMaskService.show();
        this.initialLoading = true;

        var gameName = routeParams.get('gameName');
        this.getGame(gameName)
            .then(game => {
                this.initialLoading = false;
                LoadingMaskService.hide();
                MdlService.upgradeAllRegistered();
            })
            .catch(err => {
                console.log(err);
            });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then(game => {
                this.game = game;
                this.subscribeSource = this.subscribe(gameName);

                if (game.state !== GameState.Registration) {
                    this.navigateToNextState(game.name);
                }
            });
    }

    subscribe(gameName: string) {
        return this.gameApi.feed(gameName).subscribe(changes => {
            if (changes.new_val.players.length !== changes.old_val.players.length) {
                this.game.players = changes.new_val.players;
            }

            if (changes.new_val.state === GameState.InProgress) {
                this.navigateToNextState(gameName);
            }
        });
    }

    startGame() {
        let startingMessage = Snackbar.show('Starting..', { delay: 1000 });
        this.gameApi.start(this.game.name)
            .then(resp => {
                Snackbar.remove(startingMessage);
            })
            .catch(err => {
                console.log(err);
                Snackbar.show(err);
            })
    }

    navigateToNextState(gameName: string) {
        this.router.navigate(['/ShowQuestion', { gameName: gameName }]);
    }

    onDestroy() {
        this.subscribeSource.dispose();
    }
}
