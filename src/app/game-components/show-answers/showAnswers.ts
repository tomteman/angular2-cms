import {Component, View} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';
import {IPlayer} from 'app/pof-typings/player'
import {Session} from 'app/session/session';
import {GameApi} from 'app/datacontext/repositories/gameApi';

let styles = require('./showAnswers.css');
let template = require('./showAnswers.html');

@Component({
    selector: 'show-question'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class ShowAnswers {
    game;
    question;
    subscribeSource;
    answerSelected: string;
    isPlayer: boolean;
    warningMsg: string;
    errorMsg: string;
    myForm: ControlGroup;

    constructor(public gameApi: GameApi, routeParams: RouteParams,
        public formBuilder: FormBuilder, public session: Session,
        public router: Router) {
        // MDL issue
        componentHandler.upgradeDom();

        var gameName = routeParams.get('gameName');
        this.setGame(gameName)
            .then(() => {
                this.setCurrentQuestion();
                this.checkIfAnswerSelected();
            });

        this.buildForm();
        this.isPlayer = session.isPlayer();
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            answerText: ['', Validators.required]
        });
    }

    setGame(gameName: string) {
        return this.gameApi.get(gameName)
            .then(result => {
                console.log(result);
                this.game = result;
                this.subscribe(gameName);
            })
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(gameName: string) {
        this.subscribeSource = this.gameApi.feed(gameName).subscribe(change => {
            console.log(change);

            var currentQuestion = _.find(change.new_val.questions, q => {
                return q.id === this.question.id;
            });

            if (currentQuestion.state === QuestionState.RevealTheTruth) {
                this.subscribeSource.dispose();
                this.router.navigate('/reveal-the-truth/' + gameName);
            }
        });
    }

    setCurrentQuestion() {
        this.question = _.find(this.game.questions, function(q: IQuestion) {
            return q.state === QuestionState.ShowAnswers;
        });
    }

    choose(answerText) {
        this.gameApi.chooseAnswer(this.game.name, answerText)
            .then(res => {
                this.answerSelected = answerText;
                console.log(res);
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
}