import {
Component, View,
ControlGroup, FormBuilder, Validators,
LifecycleEvent,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';
import {IPlayer} from 'app/pof-typings/player';

import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./showQuestion.css');
let template = require('./showQuestion.html');

const CURRENT_STATE = QuestionState.ShowQuestion;
const NEXT_STATE = QuestionState.ShowAnswers;
const NEXT_STATE_ROUTE = '/show-answers/';
const SHOW_QUESTION_TIME = 60000;


@Component({
    selector: 'show-question',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class ShowQuestion {
    game;
    question: IQuestion;
    subscribeSource;
    timerSource;
    isPlayer: boolean;
    questionSubmitted: boolean;
    warningMsg: string;
    errorMsg: string;
    myForm: ControlGroup;

    constructor(public gameApi: GameApi, public routeParams: RouteParams,
        public formBuilder: FormBuilder, public session: Session,
        public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        this.buildForm();
        this.isPlayer = this.session.isPlayer();

        this.getGame(this.routeParams.get('gameName'))
            .then((game) => {
                this.game = game;
                this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

                if (!this.question) {
                    this.router.navigate(NEXT_STATE_ROUTE + game.name);
                } else {
                    this.isPlayer ? this.checkIfQuestionSubmitted() : null;
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
                this.router.navigate(NEXT_STATE_ROUTE + gameName);
            }
        });
    }

    checkIfQuestionSubmitted() {
        this.session.activeUser.subscribe((player: IPlayer) => {
            this.questionSubmitted = _.any(this.question.fakeAnswers, fakeAnswer => _.contains(fakeAnswer.createdBy, player.id))
        });
    }

    answer(formValue) {
        this.warningMsg = '';
        this.errorMsg = '';
        this.gameApi.answer(this.game.name, formValue.answerText)
            .then(() => {
                this.questionSubmitted = true;
            })
            .catch(err => {
                if (err.data.code === 'CORRECT_ANSWER') {
                    this.warningMsg = err.data.message;
                    this.clearAnswer();
                } else {
                    this.errorMsg = err.data.message;
                }
            });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    startTimer() {
        this.timerSource = setTimeout(() => this.gameApi.tick(this.game.name, this.question.id, this.question.state),
            SHOW_QUESTION_TIME);
    }

    clearAnswer() {

    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }

}
