import {Component, View, OnDestroy} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';

import {IQuestion, QuestionState} from 'app/bs-typings/question';
import {GameState} from 'app/bs-typings/game';
import {IPlayer} from 'app/bs-typings/player';
import {timeDiff} from 'app/util/lang';

import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';
import {answerMaxLength} from 'app/validators/index';

const styles = require('./showQuestion.scss');
const template = require('./showQuestion.html');

const CURRENT_STATE = QuestionState.ShowQuestion;
const NEXT_STATE = QuestionState.ShowAnswers;
const NEXT_STATE_ROUTE = 'ShowAnswers';

const SHOW_QUESTION_TIME = 3000;
const PANIC_TIME = 10;
const SUPER_PANIC_TIME = 5;

@Component({
    selector: 'show-question'
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class ShowQuestion implements OnDestroy {
    initialLoading: boolean;
    game;
    question: IQuestion;
    subscribeSource;
    timerSource;
    isPlayer: boolean;
    questionSubmitted: boolean;
    myForm: ControlGroup;
    showQuestionRemainTime;
    showQuestionTotalTime = SHOW_QUESTION_TIME;
    panicTime = PANIC_TIME;
    superPanicTime = SUPER_PANIC_TIME;

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
            answerText: ['', Validators.compose([Validators.required, answerMaxLength])]
        });


    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then((game) => {
                this.game = game;
                this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);
                this.showQuestionRemainTime = Math.round(SHOW_QUESTION_TIME - (timeDiff(this.game.currentTime, this.question.startedAt) / 1000));

                if (!this.question) {
                    this.router.navigate([`/${NEXT_STATE_ROUTE}`, { gameName: game.name }]);
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
                this.router.navigate([`/${NEXT_STATE_ROUTE}`, { gameName: gameName }]);
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
                    Snackbar.show(err.data.message);
                } else {
                    Snackbar.show(err.data.message);
                }
            });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    startTimer() {
        return setTimeout(() => {
            this.gameApi.tick(this.game.name, this.question.id, this.question.state)
        }, this.showQuestionRemainTime * 1000);
    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }

}
