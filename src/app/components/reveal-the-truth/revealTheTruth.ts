import {Component, View} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2'
import {coreDirectives} from 'angular2/angular2';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';
import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./revealTheTruth.css');
let template = require('./revealTheTruth.html');

@Component({
    selector: 'reveal-the-truth'
})
@View({
    directives: [formDirectives, coreDirectives],
    styles: [styles],
    template: template
})
export class RevealTheTruth {
    game;
    question;
    answerSelected: string;
    isPlayer: boolean;
    warningMsg: string;
    errorMsg: string;
    myForm: ControlGroup;

    constructor(public gameApi: GameApi, routeParams: RouteParams,
        public formBuilder: FormBuilder, public session: Session,
        public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        var gameName = routeParams.get('gameName');
        this.setGame(gameName)
            .then(() => {
                this.setCurrentQuestion();
            });

        this.buildForm();
        this.isPlayer = session.isPlayer();
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            answerText: ['', Validators.required]
        });
    }

    setGame(gameName: string) {
        return this.gameApi.get(gameName)
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

    setCurrentQuestion() {
        this.question = _.find(this.game.questions, function(q: IQuestion) {
            return q.state === QuestionState.RevealTheTruth;
        });
    }

    finish() {

    }

}