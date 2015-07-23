/*
 * Angular 2
 */
import {Component, View} from 'angular2/annotations';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from 'app/directives/directives';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles   = require('./createQuestion.css');
let template = require('./createQuestion.html');

// Simple external file component example
@Component({
  selector: 'create-question'
})
@View({
  directives: [ angularDirectives, appDirectives ],
  styles: [ styles ],
  template: template
})
export class CreateQuestion {
  constructor() {

  }
  
  save() {
    
  }
}
