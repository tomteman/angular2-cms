import {
Component, View,
ControlGroup, FormBuilder, Validators,
OnDestroy,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {QuestionState, IQuestion} from 'app/bs-typings/question';
import {GameState} from 'app/bs-typings/game';

import {IPlayer} from 'app/bs-typings/player';
import {GameApi} from 'app/datacontext/repositories/gameApi';
import {SessionApi} from 'app/datacontext/repositories/sessionApi';
import {Session} from 'app/session/session';

import {ScoreCard} from './score-card/scoreCard';

let styles = require('./scoreBoard.scss');
let template = require('./scoreBoard.html');

const CURRENT_STATE = QuestionState.ScoreBoard;
const SCORE_BOARD_SHOW_TIME = 4000;

@Component({
    selector: 'score-board'
})
@View({
    directives: [CORE_DIRECTIVES, ScoreCard],
    styles: [styles],
    template: template
})
export class ScoreBoard implements OnDestroy {
    players;
    question: IQuestion;
    subscribeSource;

    constructor(public gameApi: GameApi, public router: Router,
        public routeParams: RouteParams, public session: Session,
        public sessionApi: SessionApi) {
        var gameName = routeParams.get('gameName');

        this.getGame(gameName).then(game => {
            this.question = this.getCurrentQuestion(game, CURRENT_STATE);
            this.players = _.sortByOrder(game.players, 'score', 'desc');

            if (!this.question) {
                this.navigateToNextStep(game);
            } else {
                this.subscribe(gameName);
            }

            this.animateIntro().then(() => {
                setTimeout(() => {
                    this.gameApi.tick(game.name, this.question.id, this.question.state);
                }, SCORE_BOARD_SHOW_TIME);
            });
        });

    }

    animateIntro() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                var tl = new TimelineLite();
                tl.set('.score-board', { visibility: 'visible' })
                    .staggerFrom('score-card:nth-of-type(even) section', 1, { x: -100, autoAlpha: 0, ease: Back.easeIn.config(1.7) }, 0.4, 'sc')
                    .staggerFrom('score-card:nth-of-type(odd) section', 1, { x: 100, autoAlpha: 0, ease: Back.easeIn.config(1.7) }, 0.4, 'sc')
                    .eventCallback('onComplete', res);
            });
        });
    }

    getGame(gameName: string) {
        return this.gameApi.get(gameName)
            .catch(err => {
                console.log(err);
            });
    }

    getPlayerAnswer(player: IPlayer) {
        return _.find(this.question.fakeAnswers, fakeAnswer => ~fakeAnswer.createdBy.indexOf(player.id));
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
                this.router.navigate(['/Home']);
            }
        } else {
            this.router.navigate(['/ShowQuestion', { gameName: game.name }]);
        }
    }

    clearPresenter() {
        Session.deletePresenterFlag();
        this.sessionApi.presenterSignout().then(() => {
            this.router.navigate(['/Home']);
        });
    }

    getCurrentQuestion(game, questionState: QuestionState) {
        return _.find(game.questions, (q: IQuestion) => q.state === questionState);
    }

    onDestroy() {
        this.subscribeSource.dispose();
    }
}
