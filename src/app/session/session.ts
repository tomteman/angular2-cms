import {Injectable} from 'angular2/di';

import {Base64} from 'app/facade/base64';
import {isJsObject} from 'app/facade/lang';

const SESSION_KEY = 'sessionData';
let properties = require('app/properties.json');

@Injectable()
export class Session {

	constructor() {
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

	static signin(returnUrl) {
		var signInState = Base64.encode(JSON.stringify({ returnUrl: returnUrl }));
		location.href = '/signin/' + signInState;
	}

	static signout() {
		this.deleteSession();
		location.href = Session.getSignoutUrl();
	}

	static deleteSession() {
		localStorage.removeItem(SESSION_KEY);
	}
	
	static getSigninUrl(signInState: string) :string {
		return properties.serverLocation + '/api/auth/signin/' + signInState;
	}
	
	static getSignoutUrl() :string {
		return properties.serverLocation + '/api/auth/signout';
	}

}