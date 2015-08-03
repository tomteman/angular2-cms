import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/di';
import {Signin} from '../components/signin/signin';
import {SessionApi} from './api.session';
import {Base64} from 'app/facade/base64';

@Directive({
  selector: 'router-outlet',
  viewInjector: [Base64, SessionApi]
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  
  constructor(public _elementRef: ElementRef, public _loader: DynamicComponentLoader,
      public _parentRouter: Router, @Attribute('name') nameAttr: string) {
      super(_elementRef, _loader, _parentRouter, nameAttr);
      
      this.publicRoutes = {
        'signin': true,
        'create-question': true
      };
  }

  commit(instruction) {
    var url = this._parentRouter.lastNavigationAttempt;
    
    if (!this.publicRoutes[url.split('/')[1]] && !localStorage.getItem('signedIn')) {
        return window
          .fetch('http://pantsonfire.io:3333/api/auth/user')
          .then(checkStatus)
          .then(parseJSON)
          .then(result => {
              console.log(result);
              localStorage.setItem('signedIn', 1);
              return super.commit(instruction);
          })
          .catch(err => {
              console.log('err', err);
              var state = { returnUrl: instruction.capturedUrl }
              instruction.component = Signin;
              return super.commit(instruction);
          });
    } else {
      return super.commit(instruction);
    }
  }
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else if (response.status === 401) {
		var signInState = Base64.encode(JSON.stringify({returnUrl: window.location.pathname}));
		console.log('signInState', signInState);
		location.href = '/signin/' + signInState;
	} else {
		return response.text().then(function(text) {
			var err = {
				data: JSON.parse(text),
				status: response.status,
				headers: response.headers,
				statusText: response.statusText
			}
			return Promise.reject(err);
		});
	}
}

function parseJSON(response) {
	return response.json();
}