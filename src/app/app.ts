import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

// Components
import {Home} from './layout-components/home/home';
import {TopFrame} from './layout-components/top-frame/topFrame';
import {TopFrameMenu} from './layout-components/top-frame-menu/topFrameMenu';
import {CreateQuestion} from './content-management-components/create-question/createQuestion';
import {CreateGame} from './game-components/create-game/createGame';
import {JoinGame} from './game-components/join-game/joinGame';
import {PresentGame} from './game-components/present-game/presentGame';
import {GameStaging} from './game-components/game-staging/gameStaging';
import {ShowQuestion} from './game-components/show-question/showQuestion';
import {ShowAnswers} from './game-components/show-answers/showAnswers';
import {RevealTheTruth} from './game-components/reveal-the-truth/revealTheTruth';
import {ScoreBoard} from './game-components/score-board/scoreBoard';

import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet'


@Component({
    selector: 'app'
})
    @View({
        directives: [LoggedInRouterOutlet, TopFrame, TopFrameMenu],
        template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <top-frame class="mdl-layout__header"> </top-frame>
        <top-frame-menu class="mdl-layout__drawer"></top-frame-menu>
        <main class="mdl-layout__content">
            <router-outlet class="page-content"></router-outlet>
        </main>
        <footer></footer>
    </div>
     `})
    @RouteConfig([
    { path: '/', redirectTo: '/home' },
    { path: '/home', as: 'home', component: Home, data: { publicRoute: true } },
    { path: '/create-question', as: 'create-question', component: CreateQuestion },
    { path: '/create-game', as: 'create-game', component: CreateGame, data: { publicRoute: true } },
    { path: '/join-game/', as: 'join-game', component: JoinGame },
    { path: '/present-game', as: 'present-game', component: PresentGame, data: { publicRoute: true } },
    { path: '/game-staging/:gameName', as: 'game-staging', component: GameStaging },
    { path: '/show-question/:gameName', as: 'show-question', component: ShowQuestion },
    { path: '/show-answers/:gameName', as: 'show-answers', component: ShowAnswers },
    { path: '/reveal-the-truth/:gameName', as: 'reveal-the-truth', component: RevealTheTruth },
    { path: '/score-board/:gameName', as: 'score-board', component: ScoreBoard }
])
export class App {
    constructor() { }
}