import {Component, View, OnDestroy} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService} from 'app/mdl-components/index';

import {IQuestion, QuestionState} from 'app/bs-typings/question';
import {GameState} from 'app/bs-typings/game';
import {IPlayer} from 'app/bs-typings/player';
import {timeDiff} from 'app/util/lang';

import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

const styles = require('./showAnswers.scss');
const template = require('./showAnswers.html');

const CURRENT_STATE = QuestionState.ShowAnswers;
const NEXT_STATE = QuestionState.RevealTheTruth;
const NEXT_STATE_ROUTE = 'RevealTheTruth';

const SHOW_ANSWERS_TIME = 30;
const PANIC_TIME = 10;
const SUPER_PANIC_TIME = 5;

@Component({
    selector: 'show-answer'
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class ShowAnswers implements OnDestroy {
    initialLoading: boolean;
    game;
    question: IQuestion;
    activeUser: IPlayer;
    subscribeSource;
    timerSource;
    answerSelected: string;
    isPlayer: boolean;
    myForm: ControlGroup;
    displayAnswersArray: Array<IQuestion>;
    showAnswersRemainTime;
    showAnswersTotalTime = SHOW_ANSWERS_TIME;
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

        session.activeUser.subscribe((player: IPlayer) => {
            this.activeUser = player;
        });
    }

    isMyAnswer(answer) {
        return answer.createdBy && ~answer.createdBy.indexOf(this.activeUser.id);
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            answerText: ['', Validators.required]
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName).then((game) => {
            this.game = game;
            this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);
            this.showAnswersRemainTime = Math.round(SHOW_ANSWERS_TIME - (timeDiff(this.game.currentTime, this.question.startedAt) / 1000));

            if (!this.question) {
                this.router.navigate([`/${NEXT_STATE_ROUTE}`, { gameName: game.name }]);
            } else {
                this.createDisplayAnswersArray();
                this.isPlayer ? this.checkIfAnswerSelected() : null;
                this.subscribe(game.name, this.question);
                this.timerSource = this.startTimer();
            }
        })
    }

    createDisplayAnswersArray() {
        // remove prepopulate fake answers if they are not necessarily
        while (this.question.fakeAnswers.length > this.game.players.length) {
            for (let fakeAnswer of this.question.fakeAnswers) {
                if (fakeAnswer.createdBy.length === 1 && fakeAnswer.createdBy[0] === 'house') {
                    this.question.fakeAnswers = _.without(this.question.fakeAnswers, fakeAnswer);
                }
            }
        }

        let allAnswers = this.question.fakeAnswers.concat(this.question.realAnswer);
        let shuffledArray = _.shuffle(allAnswers);
        this.displayAnswersArray = shuffledArray;
    }

    subscribe(gameName: string, question) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(changes => {
            let currentQuestion = _.find(changes.new_val.questions, q => q.id === question.id);

            if (currentQuestion.state === NEXT_STATE) {
                this.router.navigate([`/${NEXT_STATE_ROUTE}`, { gameName: gameName }]);
            }
        });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    choose(answerText) {
        this.gameApi.chooseAnswer(this.game.name, answerText)
            .then(res => {
                this.answerSelected = answerText;
            })
            .catch(err => {
                console.log(err);
            });
    }

    checkIfAnswerSelected() {
        this.session.activeUser.subscribe((player: IPlayer) => {

            var fakeAnswerSelected = _.find(this.question.fakeAnswers, fakeAnswer => {
                return ~fakeAnswer.selectedBy.indexOf(player.id);
            });

            var realAnswerSelected = ~this.question.realAnswer.selectedBy.indexOf(player.id);

            if (fakeAnswerSelected) {
                this.answerSelected = fakeAnswerSelected.text;
            } else if (realAnswerSelected) {
                this.answerSelected = this.question.realAnswer.text;
            }
        });
    }

    startTimer() {
         return setTimeout(() => {
             this.gameApi.tick(this.game.name, this.question.id, this.question.state)
         }, this.showAnswersRemainTime * 1000);
    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }
}