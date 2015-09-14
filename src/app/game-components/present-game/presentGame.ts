import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {GameState} from 'app/pof-typings/game';
import {GameApi} from 'app/datacontext/repositories/gameApi';
import {Session} from 'app/session/session';

let styles = require('./presentGame.css');
let template = require('./presentGame.html');

@Component({
    selector: 'present-game'
})
@View({
    styles: [styles],
    template: template,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class PresentGame {
     myForm: ControlGroup;
    serverErrorMsg: string;
    constructor(formBuilder: FormBuilder, public gameApi: GameApi, public router: Router,
                public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            gameName: ['', Validators.required]
        });

    }

    onSubmit(formValue) {
        this.presentGame(formValue.gameName);
    }

    presentGame(gameName: string) {
        this.gameApi.present(gameName)
            .then(result => {
                this.session.setPresenter();
                this.router.navigate('/game-staging/' + result.name);
            })
            .catch(err => {
                console.log(err);
            })
    }
}
