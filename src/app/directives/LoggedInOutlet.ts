import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/di';
import {Signin} from '../components/signin/signin';
import {SignInApi} from '../components/signin/api.signin';
import {Base64} from 'app/facade/base64';

@Directive({
  selector: 'router-outlet',
  viewInjector: [Base64],
  hostInjector: [SignInApi]
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any
  constructor(public _elementRef: ElementRef, public _loader: DynamicComponentLoader,
    public _parentRouter: Router, @Attribute('name') nameAttr: string, public signInApi: SignInApi) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    console.log('constructor');
    this.publicRoutes = {
      'signin': true,
      'create-question': true
    };

  }

  commit(instruction) {
    console.log('activate');
    var url = this._parentRouter.lastNavigationAttempt;
    console.log('instruction', instruction);
    if (!this.publicRoutes[url.split('/')[1]] && !localStorage.getItem('signedIn')) {
      signInApi.isSignedIn().then(function(res) {
        console.log(res);
        localStorage.setItem('signedIn', 'true');
        return super.commit(instruction);
      })
        .catch(function(err) {
          console.log('401');
          var state = {
            returnUrl: instruction.capturedUrl
          }
          localStorage.setItem('signedIn', 'true');
          location.href = '/signin/' + Base64.encode(JSON.stringify(state));
        });
    } else {
      return super.commit(instruction);
    }
  }
}
