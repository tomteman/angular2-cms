import {Component, View, OnDestroy} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';

import {Truthbox} from './truthbox/truthbox';

import {IQuestion, QuestionState} from 'app/bs-typings/question';
import {GameState} from 'app/bs-typings/game';

import {Session} from 'app/session/session';
import {GameApi, ErrorHandling} from 'app/datacontext/index';

const styles = require('./revealTheTruth.scss');
const template = require('./revealTheTruth.html');

const CURRENT_STATE = QuestionState.RevealTheTruth;
const NEXT_STATE = QuestionState.ScoreBoard;
const NEXT_STATE_ROUTE = 'ScoreBoard';

@Component({
    selector: 'reveal-the-truth'
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS, Truthbox],
    styles: [styles],
    template: template
})
export class RevealTheTruth implements OnDestroy {
    initialLoading: boolean;
    game;
    question: IQuestion;
    subscribeSource;
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
                Snackbar.show(ErrorHandling.getErrorMessage(err));
            });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then((game) => {
                this.game = game;
                this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

                if (!this.question) {
                    this.router.navigate([`/${NEXT_STATE_ROUTE}`, { gameName: game.name }]);
                } else {
                    this.subscribe(game.name, this.question);
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
    }

    tickAnswer() {
        this.gameApi.tick(this.game.name, this.question.id, this.question.state);
    }

    getPlayerData(playerId) {
        let houseObj = {id: 'house', name: 'homegrown bullshit', picture: 'http://i.imgur.com/TqFxTKIs.jpg'};
        return _.find(this.game.players, player => player.id === playerId) || houseObj;
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

    onDestroy() {
        this.subscribeSource.dispose();
    }

}