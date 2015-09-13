import {Component, View} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {GameApi} from 'app/datacontext/repositories/gameApi';
import {Session} from 'app/session/session';

let styles = require('./createGame.css');
let template = require('./createGame.html');

@Component({
    selector: 'create-game'
})
@View({
    styles: [styles],
    template: template
})
export class CreateGame {
    constructor(public gameApi: GameApi, public router: Router,
                public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        this.createGame();
    }

    createGame() {
        this.gameApi.create()
            .then(result => {
                this.session.setPresenter();
                this.router.navigate('/game-staging/' + result.name);
            })
            .catch(err => {
                console.log(err);
            })
    }
}
