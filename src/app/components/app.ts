import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

// Layout
import {Home} from './home/home';
import {TopFrame} from './top-frame/topFrame';
import {TopFrameMenu} from './top-frame-menu/topFrameMenu';

// Game
import {CreateGame} from './create-game/createGame';
import {JoinGame} from './join-game/joinGame';
import {GameStaging} from './game-staging/gameStaging';
import {ShowQuestion} from './show-question/showQuestion';
import {ShowAnswers} from './show-answers/showAnswers';
import {RevealTheTruth} from './reveal-the-truth/revealTheTruth';
import {ScoreBoard} from './score-board/scoreBoard';

// Questions management
import {CreateQuestion} from './create-question/createQuestion';
import {CreateCategory} from './create-category/createCategory';

import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet'

let styles = require('./app.css');
let template = require('./app.html');

@Component({
    selector: 'app'
})
@View({
    directives: [LoggedInRouterOutlet, TopFrame, TopFrameMenu],
    styles: [styles],
    template: template
})
@RouteConfig([
    // Layout
    { path: '/', redirectTo: '/home' },
    { path: '/home', as: 'home', component: Home, data: { publicRoute: true } },

    // Game
    { path: '/create-game', as: 'create-game', component: CreateGame, data: { publicRoute: true } },
    { path: '/join-game', as: 'join-game', component: JoinGame },
    { path: '/game-staging/:gameName', as: 'game-staging', component: GameStaging },
    { path: '/show-question/:gameName', as: 'show-question', component: ShowQuestion },
    { path: '/show-answers/:gameName', as: 'show-answers', component: ShowAnswers },
    { path: '/reveal-the-truth/:gameName', as: 'reveal-the-truth', component: RevealTheTruth },
    { path: '/score-board/:gameName', as: 'score-board', component: ScoreBoard },

    // Questions management
    { path: '/create-question', as: 'create-question', component: CreateQuestion },
    { path: '/create-category', as: 'create-category', component: CreateCategory }
])
export class App {
    constructor() { }
}