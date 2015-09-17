import {
Component, View,
ControlGroup, FormBuilder, Validators,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';

import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./revealTheTruth.css');
let template = require('./revealTheTruth.html');

const CURRENT_STATE = QuestionState.RevealTheTruth;
const NEXT_STATE = QuestionState.ScoreBoard;
const NEXT_STATE_ROUTE = '/score-board/';
const REVEALING_THE_TRUTH_TIME = 5000;

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
    question: IQuestion;
    subscribeSource;
    answerSelected: string;
    isPlayer: boolean;
    warningMsg: string;
    errorMsg: string;
    myForm: ControlGroup;

    constructor(public gameApi: GameApi, public routeParams: RouteParams,
        public formBuilder: FormBuilder, public session: Session,
        public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        this.buildForm();
        this.isPlayer = session.isPlayer();

        this.getGame(this.routeParams.get('gameName'))
            .then((game) => {
                this.game = game;
                this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

                if (!this.question) {
                    this.router.navigate(NEXT_STATE_ROUTE + game.name);
                } else {
                    this.subscribe(game.name, this.question);
                    this.startTimer();
                }
            });
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            answerText: ['', Validators.required]
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(gameName: string, question) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(changes => {
            let currentQuestion = _.find(changes.new_val.questions, q => q.id === question.id);

            if (currentQuestion.state === NEXT_STATE) {
                this.subscribeSource.dispose();
                this.router.navigate(NEXT_STATE_ROUTE + gameName);
            }
        });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    startTimer() {
        setTimeout(() => this.gameApi.tick(this.game.name, this.question.id, this.question.state),
            REVEALING_THE_TRUTH_TIME);
    }

}