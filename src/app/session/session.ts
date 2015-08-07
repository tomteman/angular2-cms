import {Injectable} from 'angular2/di';

import {Base64} from 'app/facade/base64';
import {isJsObject} from 'app/facade/lang';
import {SessionApi} from 'app/datacontext/repositories/session'

const SESSION_KEY = 'sessionData';

@Injectable()
export class Session {

	constructor(public sessionApi: SessionApi) {
	}

	getUser() {
		var user = localStorage.getItem(SESSION_KEY);
		return user ? JSON.parse(user) : null;
	}

	setUser(user) {
		if (isJsObject(user)) {
			localStorage.setItem(SESSION_KEY, JSON.stringify(user));
		}
	}

	signin(returnUrl) {
		var signInState = Base64.encode(JSON.stringify({ returnUrl: returnUrl }));
		location.href = '/signin/' + signInState;
	}

	signout() {
		this.deleteSession();
		location.href = this.sessionApi.getSignoutUrl();
	}

	deleteSession() {
		localStorage.removeItem(SESSION_KEY);
	}

}