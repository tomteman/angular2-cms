import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Snackbar} from 'app/mdl-components/index';
import * as _ from 'lodash';

import {GameState} from 'app/bs-typings/game';
import {GameApi} from 'app/datacontext/repositories/gameApi';
import {Session} from 'app/session/session';

const styles = require('./presentGame.scss');
const template = require('./presentGame.html');

@Component({
    selector: 'present-game'
})
@View({
    styles: [styles],
    template: template,
    directives: [APP_DIRECTIVES]
})
export class PresentGame {
    myForm: ControlGroup;

    constructor(formBuilder: FormBuilder, public gameApi: GameApi, public router: Router,
        public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            gameName: ['', Validators.required]
        });
    }

    onSubmit(formValue) {
        this.gameApi.present(formValue.gameName)
            .then(result => {
                this.session.setPresenter();
                this.router.navigate(['/GameStaging', { gameName: result.name }]);
            })
            .catch(err => {
                console.error(err);
                Snackbar.show(err.data.message);
            })
    }
}
