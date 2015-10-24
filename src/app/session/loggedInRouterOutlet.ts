import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/angular2';

import {Session} from './session';
import {SessionApi} from 'app/datacontext/repositories/sessionApi';

@Directive({
    selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {

    constructor(public _elementRef: ElementRef, public _loader: DynamicComponentLoader,
        public _parentRouter: Router, @Attribute('name') nameAttr: string,
        public session: Session, public sessionApi: SessionApi) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
    }

    activate(instruction) {
        if (!this.isPublicBaseUrl(instruction) && !this.session.isPlayer() && !this.session.isPresenter()) {
            return this.sessionApi.getUserDetails()
                .then(user => {
                    this.session.setUser(user);
                    return super.activate(instruction);
                })
                .catch(err => {
                    Session.signin('/' + instruction.urlPath);
                });
        } else {
            return super.activate(instruction);
        }
    }

    isPublicBaseUrl(instruction) {
        return instruction._recognizer.handler.data && instruction._recognizer.handler.data.publicRoute;
    }
}