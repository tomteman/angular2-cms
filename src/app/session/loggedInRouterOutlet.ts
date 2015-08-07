import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/di';

import {Session} from './session';
import {SessionApi} from 'app/datacontext/repositories/session';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;

  constructor(public _elementRef: ElementRef, public _loader: DynamicComponentLoader,
    public _parentRouter: Router, @Attribute('name') nameAttr: string,
    public session: Session, public sessionApi: SessionApi) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    
    this.publicRoutes = {
      'signin': true,
      'create-game': true,
      'game-staging': true,
      '/': true
    };
  }

  commit(instruction) {
    var url = this._parentRouter.lastNavigationAttempt;

    if (url !== '' && url !== '/' && !this.publicRoutes[url.split('/')[1]] && !localStorage.getItem('sessionData')) {
      // TODO: sometimes this is null..
      this.sessionApi.getUserDetails()
        .then(user => {
          this.session.setUser(user);
          return super.commit(instruction);
        })
        .catch(err => {
          console.log('err', err);
          this.session.deleteSession();
          this.session.signin(instruction.capturedUrl);
        });
    } else {
      return super.commit(instruction);
    }
  }
}