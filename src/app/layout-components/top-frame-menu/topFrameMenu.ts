import {Component, View} from 'angular2/angular2';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {Session} from 'app/session/session';
import {IPlayer} from 'app/bs-typings/player'

const styles = require('./topFrameMenu.scss');
const template = require('./topFrameMenu.html');

@Component({
    selector: 'top-frame-menu'
})
@View({
    directives: [RouterLink, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class TopFrameMenu {
    activeUser: IPlayer;

    constructor(public session: Session) {
        session.activeUser.subscribe((player: IPlayer) => {
            this.activeUser = player;
        });
    }

    signout() {
        this.closeDrawer();
        Session.signout();
    }

    closeDrawer() {
        var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
        drawer.classList.toggle('is-visible');
    }

}
