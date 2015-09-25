import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, NotificationService} from 'app/mdl-components/index';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';

import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

const styles = require('./revealTheTruth.css');
const template = require('./revealTheTruth.html');

const CURRENT_STATE = QuestionState.RevealTheTruth;
const NEXT_STATE = QuestionState.ScoreBoard;
const NEXT_STATE_ROUTE = '/score-board/';
const REVEALING_THE_TRUTH_TIME = 5000000;

@Component({
    selector: 'reveal-the-truth',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class RevealTheTruth {
    initialLoading: boolean;
    game;
    question: IQuestion;
    subscribeSource;
    timerSource;
    answerSelected: string;
    isPlayer: boolean;
    myForm: ControlGroup;
    displayArray;

    constructor(public gameApi: GameApi, public routeParams: RouteParams,
        public formBuilder: FormBuilder, public session: Session,
        public router: Router) {

        this.isPlayer = session.isPlayer();

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

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then((game) => {
                this.game = game;
                this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

                if (!this.question) {
                    this.router.navigate(NEXT_STATE_ROUTE + game.name);
                } else {
                    this.subscribe(game.name, this.question);
                    this.timerSource = this.startTimer();
                    this.createDisplayArray();
                }
            });
    }

    createDisplayArray() {
        this.displayArray = _.chain(this.question.fakeAnswers)
            .filter(fakeAnswer => fakeAnswer.selectedBy.length)
            .sortBy(fakeAnswer => -fakeAnswer.selectedBy.length)
            .value();

        this.displayArray.push(_.assign({}, this.question.realAnswer, {truth: true}));

        this.displayArray = _.map(this.displayArray, answer => {
            answer.selectedBy = _.map(answer.selectedBy, this.getPlayerData.bind(this));
            answer.createdBy = _.map(answer.createdBy, this.getPlayerData.bind(this));
            return answer;
        });

        console.log('displayArray', this.displayArray);
    }

    getPlayerData(playerId) {
        let houseObj = {id: 'house'};
        return _.find(this.game.players, player => player.id === playerId) || houseObj;
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

    startTimer() {
        setTimeout(() => {
            this.gameApi.tick(this.game.name, this.question.id, this.question.state)
        }, REVEALING_THE_TRUTH_TIME);
    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }

}