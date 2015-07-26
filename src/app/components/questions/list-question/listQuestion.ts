import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2'
import {coreDirectives} from 'angular2/angular2'

import {QuestionApi} from '../api.question';
import {IQuestion} from '../interface.question';

let styles = require('./listQuestion.css');
let template = require('./listQuestion.html');

@Component({
  selector: 'list-questions',
  viewInjector: [QuestionApi]
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
    this.subscribeToQuestionsFeed();
  }

  initQuestions() {
    this.questionApi.getQuestions().subscribe(result => {
      this.questions = result;
    })
  }

  subscribeToQuestionsFeed() {
    this.questionApi.getQuestionsFeed().subscribe(change => {
      if (change.old_val === null) {
        this.questions.push(change.new_val);  
      }
    });
  }
}
