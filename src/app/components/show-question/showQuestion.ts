import {Component, View} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2';

import {IQuestion, QuestionState} from 'app/pof-typings/question';
import {GameState} from 'app/pof-typings/game';
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
    question;
    subscribeSource;
    isPlayer: boolean;
    questionSubmitted: boolean;
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
                this.checkIfQuestionSubmitted();
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

            if (currentQuestion.state === QuestionState.ShowAnswers) {
                this.subscribeSource.dispose();
                this.router.navigate('/show-answers/' + gameName);
            }
        });
    }

    checkIfQuestionSubmitted() {
        this.session.getUser().subscribe(user => {
            this.questionSubmitted = _.any(this.question.fakeAnswers, fakeAnswer =>
                _.contains(fakeAnswer.createdBy, user.id)
            )
        });
    }

    answer(formValue) {
        console.log(formValue.answerText);
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

    setCurrentQuestion() {
        this.question = _.find(this.game.questions, (q: IQuestion) =>
            q.state === QuestionState.ShowQuestion
        );
    }

    clearAnswer() {

    }

}
