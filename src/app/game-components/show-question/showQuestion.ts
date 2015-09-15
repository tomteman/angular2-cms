import {
Component, View,
ControlGroup, FormBuilder, Validators,
FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';
import {IPlayer} from 'app/pof-typings/player'
import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./showQuestion.css');
let template = require('./showQuestion.html');

@Component({
    selector: 'show-question'
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
                this.question = this.getCurrentQuestion(this.game, QuestionState.ShowQuestion);

                if (!this.question) {
                    this.router.navigate('/show-answers/' + game.name);
                }

                this.isPlayer ? this.checkIfQuestionSubmitted() : null;
                this.subscribe(game.name, this.question);
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

            if (currentQuestion.state === QuestionState.ShowAnswers) {
                this.subscribeSource.dispose();
                this.router.navigate('/show-answers/' + gameName);
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

    clearAnswer() {

    }

}
