import {
Component, View,
ControlGroup, FormBuilder, Validators,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MdlService, Snackbar} from 'app/mdl-components/index';

import {GameState} from 'app/bs-typings/game';
import {GameApi, ErrorHandling} from 'app/datacontext/index';

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

    constructor(formBuilder: FormBuilder, public gameApi: GameApi, public router: Router) {
        this.myForm = formBuilder.group({
            gameName: ['', Validators.required]
        });

        MdlService.upgradeAllRegistered();
    }

    onSubmit(formValue) {
        this.joinGame(formValue.gameName);
    }

    joinGame(gameName: string) {
        let joinMessage = Snackbar.show('Joining..', { delay: 1000 });
        this.gameApi.join(gameName)
            .then(game => {
                Snackbar.remove(joinMessage);
                if (game.state === GameState.Registration) {
                    this.router.navigate(['/GameStaging', { gameName: gameName }]);
                } else if (game.state === GameState.InProgress) {
                    this.router.navigate(['/ShowQuestion', { gameName: gameName }]);
                }
            })
            .catch(err => {
                console.log(err);
                Snackbar.remove(joinMessage);
                Snackbar.show(ErrorHandling.getErrorMessage(err));
            })
    }
}
