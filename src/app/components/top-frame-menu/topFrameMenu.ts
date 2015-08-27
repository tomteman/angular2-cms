import {Component, View} from 'angular2/angular2';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

import {Session} from 'app/session/session';

let styles = require('./topFrameMenu.css');
let template = require('./topFrameMenu.html');

@Component({
    selector: 'top-frame-menu'
})
@View({
    directives: [routerDirectives, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class TopFrameMenu {
    activeUser;

    constructor(public session: Session) {
        session.getUser().subscribe(data => {
            this.activeUser = data;
        });
    }

    signout() {
        this.closeDrawer();
        Session.signout();
    }

    // TODO: should be a directive (mdl-drawer)
    closeDrawer() {
        var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
        drawer.classList.toggle('is-visible');
    }

}
