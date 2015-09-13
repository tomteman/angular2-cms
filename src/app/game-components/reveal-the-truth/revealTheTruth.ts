import {Component, View} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2';

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
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class RevealTheTruth {
    game;
    question;
    subscribeSource;
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
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(change => {
            console.log(change);

            var currentQuestion = _.find(change.new_val.questions, q => {
                return q.id === this.question.id;
            });

            if (currentQuestion.state === QuestionState.ScoreBoard) {
                this.subscribeSource.dispose();
                this.router.navigate('/score-board/' + gameName);
            }
        });
    }

    setCurrentQuestion() {
        this.question = _.find(this.game.questions, function(q: IQuestion) {
            return q.state === QuestionState.RevealTheTruth;
        });
    }

    finish() {
        this.gameApi.finishRevealingTheTruth(this.game.name)
            .catch(err => {
                console.log(err);
            })
    }

}