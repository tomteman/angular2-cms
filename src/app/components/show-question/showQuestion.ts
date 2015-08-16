import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2'
import {coreDirectives} from 'angular2/angular2';

import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./showQuestion.css');
let template = require('./showQuestion.html');

@Component({
    selector: 'show-question'
})
@View({
    directives: [formDirectives, coreDirectives],
    styles: [styles],
    template: template
})
export class ShowQuestion {
    game;
    warningMsg: string;
    errorMsg: string;
    myForm: ControlGroup;

    constructor(public gameApi: GameApi, routeParams: RouteParams, public formBuilder: FormBuilder) {
        var gameName = routeParams.get('gameName');
        this.getGame(gameName);
        this.buildForm();
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            answerText: ['', Validators.required]
        });
    }

    getGame(gameName: string) {
        this.gameApi.get(gameName)
            .then(result => {
                console.log(result);
                this.game = result;
                this.subscribe(gameName);
            })
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(gameName: string) {
        this.gameApi.feed(gameName).subscribe(change => {
            console.log(change);
        });
    }

    answer(formValue) {
        console.log(formValue.answerText);

        this.gameApi.answer(this.game.name, formValue.answerText)
            .then(res => {

            })
            .catch(err => {
                if (err.code === 'CORRECT_ANSWER') {
                    this.warningMsg = err.message;
                } else {
                    this.errorMsg = err.message;
                }
            });
    }

}
