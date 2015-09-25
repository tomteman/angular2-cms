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

const styles = require('./showAnswers.css');
const template = require('./showAnswers.html');

const CURRENT_STATE = QuestionState.ShowAnswers;
const NEXT_STATE = QuestionState.RevealTheTruth;
const NEXT_STATE_ROUTE = '/reveal-the-truth/';

const SHOW_ANSWERS_TIME = 30;
const PANIC_TIME = 10;
const SUPER_PANIC_TIME = 5;

@Component({
    selector: 'show-answer',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class ShowAnswers {
    initialLoading: boolean;
    game;
    question: IQuestion;
    subscribeSource;
    timerSource;
    answerSelected: string;
    isPlayer: boolean;
    myForm: ControlGroup;
    showAnswersTime = SHOW_ANSWERS_TIME;
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
            answerText: ['', Validators.required]
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName).then((game) => {
            this.game = game;
            this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

            if (!this.question) {
                this.router.navigate(NEXT_STATE_ROUTE + game.name);
            } else {
                this.isPlayer ? this.checkIfAnswerSelected() : null;
                this.subscribe(game.name, this.question);
                this.timerSource = this.startTimer();
            }
        })
    }

    subscribe(gameName: string, question) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(changes => {
            let currentQuestion = _.find(changes.new_val.questions, q => q.id === question.id);

            if (currentQuestion.state === NEXT_STATE) {
                this.router.navigate(NEXT_STATE_ROUTE + gameName);
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
         }, SHOW_ANSWERS_TIME * 1000);
    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }
}