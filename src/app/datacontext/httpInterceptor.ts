import {Injectable, bind} from 'angular2/di';

import {Session} from 'app/session/session';

@Injectable()
export class HttpInterceptor {
	constructor() {
  	}

	static checkAuth(response) {
		if (response.status === 401) {
          	Session.signin(location.pathname);
			
			var err = {
				data: 'unauthenticated',
				status: response.status,
				headers: response.headers,
				statusText: response.statusText
			}
			
			return Promise.reject(err);
		} else {
			return Promise.resolve(response);
		}
	}
}