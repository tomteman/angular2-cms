import {Injectable} from 'angular2/angular2';

import {Session} from 'app/session/session';

@Injectable()
export class HttpInterceptor {
	constructor() {
  	}

	static checkAuth(response) {
		if (response.status === 401) {
          	Session.signin(location.hash);

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