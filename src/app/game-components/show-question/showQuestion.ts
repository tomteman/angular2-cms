import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, NotificationService} from 'app/mdl-components/index';

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
const SHOW_QUESTION_TIME = 6000000;


@Component({
    selector: 'show-question',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class ShowQuestion {
    initialLoading: boolean;
    game;
    question: IQuestion;
    subscribeSource;
    timerSource;
    isPlayer: boolean;
    questionSubmitted: boolean;
    myForm: ControlGroup;

    constructor(public gameApi: GameApi, public routeParams: RouteParams,
        public formBuilder: FormBuilder, public session: Session,
        public router: Router) {

        this.buildForm();
        this.isPlayer = this.session.isPlayer();

        LoadingMaskService.show();
        this.initialLoading = true;

        this.getGame(this.routeParams.get('gameName'))
            .then(() => {
                this.initialLoading = false;
                LoadingMaskService.hide();
                MdlService.upgradeAllRegistered();
            })
            .catch(err => {
                console.log(err);
            });
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            answerText: ['', Validators.required]
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then((game) => {
                this.game = game;
                this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

                if (!this.question) {
                    this.router.navigate(NEXT_STATE_ROUTE + game.name);
                } else {
                    this.isPlayer ? this.checkIfQuestionSubmitted() : null;
                    this.subscribe(game.name, this.question);
                    this.timerSource = this.startTimer();
                }
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
        this.gameApi.answer(this.game.name, formValue.answerText)
            .then(() => {
                this.questionSubmitted = true;
            })
            .catch(err => {
                if (err.data.code === 'CORRECT_ANSWER') {
                    NotificationService.show(err.data.message);
                } else {
                    NotificationService.show(err.data.message);
                }
            });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    startTimer() {
        return setTimeout(() => this.gameApi.tick(this.game.name, this.question.id, this.question.state),
            SHOW_QUESTION_TIME);
    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }

}
