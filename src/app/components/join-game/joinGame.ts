import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2';
import {coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

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
            .then(() => {
                this.router.navigate('/game-staging/' + formValue.gameName);
            })
            .catch(err => {
                console.log(err);
                this.serverErrorMsg = err;
            })
    }
}
