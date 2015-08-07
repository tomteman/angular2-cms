import {Component, View} from 'angular2/angular2';
import {coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

import {Session} from 'app/session/session';

let styles = require('./topFrame.css');
let template = require('./topFrame.html');

@Component({
  selector: 'top-frame'
})
@View({
  directives: [routerDirectives, coreDirectives],
  styles: [styles],
  template: template
})
export class TopFrame {
  activeUser;

  constructor(public session: Session) {
    this.activeUser = session.getUser(); 
  }
  
  signout() {
    Session.signout();
  }

}
