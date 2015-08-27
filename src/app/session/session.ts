import {Injectable} from 'angular2/angular2';
import * as Rx from 'rx';

import {Base64} from 'app/facade/base64';
import {getCookie} from 'app/facade/cookie';
import {isJsObject} from 'app/facade/lang';

const SESSION_KEY = 'sessionData';
const PRESENTER_KEY = 'presenter';
let config = require('config.json');

@Injectable()
export class Session {
	activeUser = new Rx.Subject();

	constructor() {
	}

	getUser() {
		var user = localStorage.getItem(SESSION_KEY);
		if (user) {
			return { subscribe: cb => { return cb(JSON.parse(user)) } };
		} else {
			return this.activeUser;
		}
	}

	isPlayer() {
		return !!localStorage.getItem(SESSION_KEY);
	}

	isPresenter() {
		return !!sessionStorage.getItem(PRESENTER_KEY);
	}

	setPresenter() {
		sessionStorage.setItem(PRESENTER_KEY, '1');
	}

	setUser(user) {
		if (isJsObject(user)) {
			localStorage.setItem(SESSION_KEY, JSON.stringify(user));
			this.activeUser.onNext(user);
			this.activeUser.onCompleted();
		}
	}

	static signin(returnUrl) {
		this.deleteSession();
		var signInState = Base64.encode(JSON.stringify({ returnUrl: returnUrl }));
		location.href = config.serverLocation + '/api/auth/signin/' + signInState;
	}

	static signout() {
		this.deleteSession();
		location.href = config.serverLocation + '/api/auth/signout';
	}

	private static deleteSession() {
		localStorage.removeItem(SESSION_KEY);
	}

}