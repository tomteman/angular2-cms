import {
Component, View,
ControlGroup, FormBuilder, Validators,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {GameState} from 'app/bs-typings/game';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./joinGame.scss');
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
    errorMsg: string;

    constructor(formBuilder: FormBuilder, public gameApi: GameApi, public router: Router) {
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
            .then(game => {
                if (game.state === GameState.Registration) {
                    this.router.navigate(['/GameStaging', { gameName: gameName }]);
                } else if (game.state === GameState.InProgress) {
                    this.router.navigate(['/ShowQuestion', { gameName: gameName }]);
                } else if (game.state === GameState.GameOver) {
                    this.errorMsg = 'This game is not available';
                }
            })
            .catch(err => {
                console.log(err);
                this.errorMsg = err.data.message;
            })
    }
}
