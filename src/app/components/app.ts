/*
 * Angular 2
 */
import {Component, View} from 'angular2/annotations';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
import {formDirectives} from 'angular2/forms';

// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

/*
 * App Pipes
 * our collection of pipes registry
 */
import {appPipes} from '../pipes/pipes';

/*
 * Components
 */
import {Home} from './home/home';
import {Todo} from './todo';
import {RxJsExamples} from './rxjs-examples/rxjs-examples';
import {ListQuestions} from './questions/list-question/listQuestion';
import {CreateQuestion} from './questions/create-question/createQuestion';
import {Signin} from './signin/signin';

let styles = require('./app.css');
let template = require('./app.html');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
  viewInjector: [ appPipes ]
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [
    // Angular's core directives
    coreDirectives,

    // Angular's form directives
    formDirectives,

    // Angular's router
    routerDirectives,

    // Our collection of directives from /directives
    appDirectives
  ],
  // include our .css file
  styles: [ styles ],
  template: template
})
@RouteConfig([
  { path: '/',              as: 'home',          component: Home },
  { path: '/todo',          as: 'todo',          component: Todo },
  { path: '/rxjs-examples', as: 'rxjs-examples', component: RxJsExamples },
  { path: '/create-question', as: 'create-question', component: CreateQuestion },
  { path: '/list-questions', as: 'list-questions', component: ListQuestions },
  { path: '/signin/:state', as: 'signin', component: Signin }
])
export class App {
  name: string;
  constructor() {
    this.name = 'angular'; // used in logo
  }
}
