import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2'
import {coreDirectives} from 'angular2/angular2'

import {QuestionApi} from 'app/datacontext/repositories/question';
import {ISeedQuestion} from '../IQuestion';

let styles = require('./createQuestion.css');
let template = require('./createQuestion.html');

@Component({
  selector: 'create-question'
})
@View({
  directives: [formDirectives, coreDirectives],
  styles: [styles],
  template: template
})
export class CreateQuestion {
  myForm: ControlGroup;
  showSuccessMsg: boolean;
  showErrorMsg: boolean;
  errorMsg: string;

  constructor(fb: FormBuilder, public questionApi: QuestionApi) {
    this.myForm = fb.group({
      questionText: ['', Validators.required],
      realAnswer: ['', Validators.required],
      fakeAnswerOne: ['', Validators.required],
      fakeAnswerTwo: ['', Validators.required]
    });
  }

  onSubmit(formValue) {
    this.showSuccessMsg = false;
    this.showErrorMsg = false;

    var newQuestion: ISeedQuestion = {
      creatorId: '123-123',
      fakeAnswers: [formValue.fakeAnswerOne, formValue.fakeAnswerTwo],
      questionText: formValue.questionText,
      realAnswer: formValue.realAnswer
    };

    this.questionApi.create(newQuestion)
      .then( res => {
        this.clearForm();
        this.showSuccessMsg = true;
      })
      .catch(err => {
        this.showErrorMsg = true;
        this.errorMsg = err.data;
      });
  }
  
  clearForm() {
    console.log(this.myForm);
  }
}