import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/di';
import {Signin} from '../components/signin/signin';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any
  constructor(public _elementRef: ElementRef, public _loader: DynamicComponentLoader,
              public _parentRouter: Router, @Attribute('name') nameAttr: string) {
      super(_elementRef, _loader, _parentRouter, nameAttr);
      console.log('constructor');
      this.publicRoutes = {
        '/signin': true
      };

  }

  commit(instruction) {
    console.log('activate');
    var url = this._parentRouter.lastNavigationAttempt;
    console.log('instruction', instruction);
    if (!this.publicRoutes[url] && !localStorage.getItem('signedIn')) { 
      instruction.component = Signin;
    }
    return super.commit(instruction);
  }
}
