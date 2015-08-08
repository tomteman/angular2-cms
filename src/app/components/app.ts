import {Component, View} from 'angular2/annotations';
import {RouteConfig, routerDirectives} from 'angular2/router';

// Components
import {Home} from './home/home';
import {TopFrame} from './top-frame/topFrame';
import {CreateQuestion} from './create-question/createQuestion';
import {CreateGame} from './create-game/createGame';
import {JoinGame} from './join-game/joinGame';
import {GameStaging} from './game-staging/gameStaging';
import {ShowQuestion} from './show-question/showQuestion';
import {ScoreBoard} from './score-board/scoreBoard';

import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet'

let styles = require('./app.css');
let template = require('./app.html');

@Component({
  selector: 'app'
})
@View({
  directives: [LoggedInRouterOutlet, TopFrame],
  styles: [styles],
  template: template
})
@RouteConfig([
  { path: '/', as: 'home', component: Home },
  { path: '/create-question', as: 'create-question', component: CreateQuestion },
  { path: '/create-game', as: 'create-game', component: CreateGame },
  { path: '/join-game', as: 'join-game', component: JoinGame },
  { path: '/game-staging/:gameName', as: 'game-staging', component: GameStaging },
  { path: '/show-question/:gameName', as: 'show-question', component: ShowQuestion },
  { path: '/score-board/:gameName', as: 'score-board', component: ScoreBoard }
])
export class App {
  constructor() { }
}