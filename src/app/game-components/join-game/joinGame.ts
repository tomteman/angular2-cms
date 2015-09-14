import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {GameState} from 'app/pof-typings/game';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./joinGame.css');
let template = require('./joinGame.html');

@Component({
    selector: 'join-game'
})
@View({
    styles: [styles],
    template: template,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class JoinGame {
    myForm: ControlGroup;
    serverErrorMsg: string;

    constructor(formBuilder: FormBuilder, public gameApi: GameApi, routeParams: RouteParams, public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            gameName: ['', Validators.required]
        });
    }

    onSubmit(formValue) {
        this.joinGame(formValue.gameName);
    }

    joinGame(gameName: string) {
           this.gameApi.join(gameName)
            .then((game) => {
                console.log(game);
                if (game.state === GameState.Registration) {
                    this.router.navigate('/game-staging/' + gameName);
                } else if (game.state === GameState.InProgress) {
                    this.router.navigate('/show-question/' + gameName);
                } else {
                    this.router.navigate('/score-board/' + gameName);
                }
            })
            .catch(err => {
                console.log(err);
                this.serverErrorMsg = err.data.message;
            })
    }
}
