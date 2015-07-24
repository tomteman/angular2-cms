/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, formDirectives, Validators} from 'angular2/angular2'
import {coreDirectives} from 'angular2/angular2'

/*
 * Directives
 */
import {appDirectives} from 'app/directives/directives';

/*
 * Services
 */
import {QuestionApi} from '../api.question';

import {IQuestion} from '../interface.question';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles = require('./createQuestion.css');
let template = require('./createQuestion.html');

// Simple external file component example
@Component({
  selector: 'create-question',
  viewInjector: [QuestionApi]
})
@View({
  directives: [formDirectives, coreDirectives],
  styles: [styles],
  template: template
})
export class CreateQuestion {
  myForm: ControlGroup;

  constructor(fb: FormBuilder, public questionApi: QuestionApi) {
    this.myForm = fb.group({
      'questionText': ['', Validators.required],
      'realAnswer': ['', Validators.required],
      'fakeAnswer': ['', Validators.required]
    });
  }

  onSubmit(newQuestion: IQuestion) {
    newQuestion.creatorId = '123-123';
    this.questionApi.createQuestion(newQuestion).subscribe((res) => {
      console.log(res);
      this.clearForm();
    });
  }

  onCancel() {
    console.log('cancel');
    this.clearForm();
  }
  
  clearForm() {
    
  }
}
