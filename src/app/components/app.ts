import {Component, View} from 'angular2/annotations';
import {RouteConfig, routerDirectives} from 'angular2/router';

// Components
import {Home} from './home/home';
import {ListQuestions} from './questions/list-question/listQuestion';
import {CreateQuestion} from './questions/create-question/createQuestion';
import {Signin} from './signin/signin';
import {CreateGame} from './create-game/createGame';
import {JoinGame} from './join-game/joinGame';
import {GameStaging} from './game-staging/gameStaging';

import {Base64} from 'app/facade/base64';
import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet'

let styles = require('./app.css');
let template = require('./app.html');


@Component({
  selector: 'app',
  viewInjector: [Base64]
})
@View({
  directives: [routerDirectives, LoggedInRouterOutlet],
  styles: [styles],
  template: template
})
@RouteConfig([
  { path: '/', as: 'home', component: Home },
  { path: '/create-question', as: 'create-question', component: CreateQuestion },
  { path: '/list-questions', as: 'list-questions', component: ListQuestions },
  { path: '/signin/:state', as: 'signin', component: Signin },
  { path: '/create-game', as: 'create-game', component: CreateGame },
  { path: '/join-game', as: 'join-game', component: JoinGame },
  { path: '/game-staging/:gameName', as: 'game-staging', component: GameStaging }
])
export class App {
  rootSigninState;
  constructor() {
    this.rootSigninState = ['/signin', {
      'state': Base64.encode(JSON.stringify({
        'returnUrl': '/'
      }))
    }];
  }
}