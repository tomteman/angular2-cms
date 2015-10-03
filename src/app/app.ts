import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

// Layout
import {Home} from './layout-components/home/home';
import {TopFrame} from './layout-components/top-frame/topFrame';
import {TopFrameMenu} from './layout-components/top-frame-menu/topFrameMenu';

// Game
import {CreateGame} from './game-components/create-game/createGame';
import {JoinGame} from './game-components/join-game/joinGame';
import {GameStaging} from './game-components/game-staging/gameStaging';
import {ShowQuestion} from './game-components/show-question/showQuestion';
import {ShowAnswers} from './game-components/show-answers/showAnswers';
import {RevealTheTruth} from './game-components/reveal-the-truth/revealTheTruth';
import {ScoreBoard} from './game-components/score-board/scoreBoard';
import {PresentGame} from './game-components/present-game/presentGame';

// CMS
import {CreateQuestion} from './cms-components/create-question/createQuestion';
import {CreateCategory} from './cms-components/create-category/createCategory';
import {ManageCategories} from './cms-components/manage-categories/manageCategories';
import {ManageCategory} from './cms-components/manage-category/manageCategory';

// MDL
import {LoadingMask} from 'app/mdl-components/loadingMask/loadingMask';
import {Snackbar} from 'app/mdl-components/snackbar/snackbar';

import {LoggedInRouterOutlet} from 'app/session/loggedInRouterOutlet';

const snackbarCss = require('app/mdl-components/snackbar/snackbar.scss');

@Component({
    selector: 'app'
})
@View({
    directives: [LoggedInRouterOutlet, TopFrame, TopFrameMenu, LoadingMask, Snackbar],
    template: `
        <loading-mask></loading-mask>
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <top-frame class="mdl-layout__header"> </top-frame>
            <top-frame-menu class="mdl-layout__drawer mdl-color--blue-grey-800" style="border: none;"></top-frame-menu>
            <main class="mdl-layout__content mdl-color--grey-100">
                <router-outlet class="page-content"></router-outlet>
            </main>
            <footer></footer>
            <snackbar></snackbar>
        </div>
     `,
     styles: [snackbarCss]
})
@RouteConfig([
    // Layout
    { path: '/', redirectTo: '/home' },
    { path: '/home', as: 'Home', component: Home, data: { publicRoute: true } },

    // Game
    { path: '/create-game', as: 'CreateGame', component: CreateGame, data: { publicRoute: true } },
    { path: '/join-game', as: 'JoinGame', component: JoinGame },
    { path: '/present-game', as: 'PresentGame', component: PresentGame, data: { publicRoute: true } },
    { path: '/game-staging/:gameName', as: 'GameStaging', component: GameStaging },
    { path: '/show-question/:gameName', as: 'ShowQuestion', component: ShowQuestion },
    { path: '/show-answers/:gameName', as: 'ShowAnswers', component: ShowAnswers },
    { path: '/reveal-the-truth/:gameName', as: 'RevealTheTruth', component: RevealTheTruth },
    { path: '/score-board/:gameName', as: 'ScoreBoard', component: ScoreBoard },

    // CMS
    { path: '/create-question', as: 'CreateQuestion', component: CreateQuestion },
    { path: '/create-category', as: 'CreateCategory', component: CreateCategory },
    { path: '/manage-categories', as: 'ManageCategories', component: ManageCategories },
    { path: '/manage-category/:categoryName', as: 'ManageCategory', component: ManageCategory }

])
export class App {
    constructor() { }
}