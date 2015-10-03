import {
Component, View,
ControlGroup, FormBuilder, Validators,
LifecycleEvent,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {QuestionState, IQuestion} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';

import {GameApi} from 'app/datacontext/repositories/gameApi';
import {SessionApi} from 'app/datacontext/repositories/sessionApi';
import {Session} from 'app/session/session';

let styles = require('./scoreBoard.scss');
let template = require('./scoreBoard.html');

const CURRENT_STATE = QuestionState.ScoreBoard;
const SCORE_BOARD_SHOW_TIME = 10000;

@Component({
    selector: 'score-board',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class ScoreBoard {
    game;
    question: IQuestion;
    subscribeSource;
    timerSource;

    constructor(public gameApi: GameApi, public router: Router,
        public routeParams: RouteParams, public session: Session,
        public sessionApi: SessionApi) {
        // MDL issue
        componentHandler.upgradeDom();

        var gameName = routeParams.get('gameName');
        this.getGame(gameName).then(game => {
            this.game = game;
            this.question = this.getCurrentQuestion(this.game, CURRENT_STATE);

            if (!this.question) {
                this.navigateToNextStep(this.game);
            } else {
                this.subscribe(gameName);
                this.startTimer();
            }
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(gameName: string) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(change => {
            this.navigateToNextStep(change.new_val);
        });
    }

    navigateToNextStep(game) {
        if (game.state === GameState.GameOver) {
            if (this.session.isPresenter()) {
                this.clearPresenter();
            } else {
                this.router.navigate('/home');
            }
        } else {
            this.router.navigate('/show-question/' + game.name);
        }
    }

    clearPresenter() {
        Session.deletePresenterFlag();
        this.sessionApi.presenterSignout().then(() => {
            this.router.navigate('/home');
        });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    startTimer() {
        this.timerSource = setTimeout(() => this.gameApi.tick(this.game.name, this.question.id, this.question.state),
            SCORE_BOARD_SHOW_TIME);
    }

    onDestroy() {
        this.subscribeSource.dispose();
        clearTimeout(this.timerSource);
    }
}
