import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2';
import {coreDirectives} from 'angular2/angular2';

import {QuestionApi} from 'app/datacontext/repositories/question';
import {IQuestion} from '../IQuestion';

let styles = require('./listQuestion.css');
let template = require('./listQuestion.html');

@Component({
  selector: 'list-questions'
})
@View({
  directives: [formDirectives, coreDirectives],
  styles: [styles],
  template: template
})
export class ListQuestions {
  questions: Array<IQuestion>;

  constructor(public questionApi: QuestionApi) {
    this.initQuestions();
  }

  initQuestions() {
    this.questionApi.get()
      .then(result => {
        this.questions = result;
        this.subscribeToQuestionsFeed();
      })
      .catch(err => {
        console.log(err.data);
      });
  }

  subscribeToQuestionsFeed() {
    this.questionApi.feed().subscribe(change => {
      if (change.old_val === null) {
        this.questions.push(change.new_val);
      }
    });
  }
}
