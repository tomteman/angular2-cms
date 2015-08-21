import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2';
import {coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

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
    directives: [formDirectives, coreDirectives]
})
export class JoinGame {
    myForm: ControlGroup;
    serverErrorMsg: string;

    constructor(formBuilder: FormBuilder, public gameApi: GameApi, public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            gameName: ['', Validators.required]
        });
    }

    onSubmit(formValue) {
        this.gameApi.join(formValue.gameName)
            .then((game) => {
                console.log(game);
                if (game.state === GameState.Registration) {
                    this.router.navigate('/game-staging/' + formValue.gameName);
                } else if (game.state === GameState.InProgress) {
                    this.router.navigate('/show-question/' + formValue.gameName);
                } else {
                    this.router.navigate('/score-board/' + formValue.gameName);
                }
            })
            .catch(err => {
                console.log(err);
                this.serverErrorMsg = err.data.message;
            })
    }
}
