import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

<<<<<<< HEAD
// Components
import {Home} from './layout-components/home/home';
import {TopFrame} from './layout-components/top-frame/topFrame';
import {TopFrameMenu} from './layout-components/top-frame-menu/topFrameMenu';
import {CreateQuestion} from './content-management-components/create-question/createQuestion';
import {CreateGame} from './game-components/create-game/createGame';
import {JoinGame} from './game-components/join-game/joinGame';
import {PresentGame} from './game-components/present-game/presentGame';
=======
// Layout
import {Home} from './layout-components/home/home';
import {TopFrame} from './layout-components/top-frame/topFrame';
import {TopFrameMenu} from './layout-components/top-frame-menu/topFrameMenu';

// Game
import {CreateGame} from './game-components/create-game/createGame';
import {JoinGame} from './game-components/join-game/joinGame';
>>>>>>> 11f9d6803c0e0fb0de233610107e11fd04a951fb
import {GameStaging} from './game-components/game-staging/gameStaging';
import {ShowQuestion} from './game-components/show-question/showQuestion';
import {ShowAnswers} from './game-components/show-answers/showAnswers';
import {RevealTheTruth} from './game-components/reveal-the-truth/revealTheTruth';
import {ScoreBoard} from './game-components/score-board/scoreBoard';

<<<<<<< HEAD
import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet'

=======
// Questions management
import {CreateQuestion} from './content-management-components/create-question/createQuestion';
import {CreateCategory} from './content-management-components/create-category/createCategory';
import {ManageCategory} from './content-management-components/manage-category/manageCategory';

import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet'
>>>>>>> 11f9d6803c0e0fb0de233610107e11fd04a951fb

@Component({
    selector: 'app'
})
<<<<<<< HEAD
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
=======
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
     `
})
@RouteConfig([
    // Layout
    { path: '/', redirectTo: '/home' },
    { path: '/home', as: 'home', component: Home, data: { publicRoute: true } },

    // Game
    { path: '/create-game', as: 'create-game', component: CreateGame, data: { publicRoute: true } },
    { path: '/join-game', as: 'join-game', component: JoinGame },
>>>>>>> 11f9d6803c0e0fb0de233610107e11fd04a951fb
    { path: '/game-staging/:gameName', as: 'game-staging', component: GameStaging },
    { path: '/show-question/:gameName', as: 'show-question', component: ShowQuestion },
    { path: '/show-answers/:gameName', as: 'show-answers', component: ShowAnswers },
    { path: '/reveal-the-truth/:gameName', as: 'reveal-the-truth', component: RevealTheTruth },
<<<<<<< HEAD
    { path: '/score-board/:gameName', as: 'score-board', component: ScoreBoard }
=======
    { path: '/score-board/:gameName', as: 'score-board', component: ScoreBoard },

    // Questions management
    { path: '/create-question', as: 'create-question', component: CreateQuestion },
    { path: '/create-category', as: 'create-category', component: CreateCategory },
    { path: '/manage-category/:categoryName', as: 'manage-category', component: ManageCategory }
>>>>>>> 11f9d6803c0e0fb0de233610107e11fd04a951fb
])
export class App {
    constructor() { }
}