import {Injectable} from 'angular2/angular2';
import * as Rx from 'rx';

import {Base64} from 'app/util/base64';
import {isJsObject} from 'app/util/lang';
import {safeJsonParse} from 'app/util/safeJsonParse';
import {IPlayer} from 'app/pof-typings/player'

const SESSION_KEY = 'sessionData';
const PRESENTER_KEY = 'presenter';

let config = require('config.json');

@Injectable()
export class Session {
	activeUser: Rx.Subject<IPlayer> = new Rx.BehaviorSubject<IPlayer>(null);

	constructor() {
		this._initUser();
	}

	@safeJsonParse(Session.signout)
	_initUser() {
		var user = localStorage.getItem(SESSION_KEY);
		if (user) {
			this.activeUser.onNext(JSON.parse(user));
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
		}
	}

	static signin(returnUrl) {
		Session.deleteSession();
		var signInState = Base64.encode(JSON.stringify({ returnUrl: returnUrl }));
		location.href = config.serverLocation + '/api/auth/signin/' + signInState;
	}

	static signout() {
		Session.deleteSession();
		location.href = config.serverLocation + '/api/auth/signout';
	}

	static deletePresenterFlag() {
		sessionStorage.removeItem(PRESENTER_KEY);
	}

	private static deleteSession() {
		localStorage.removeItem(SESSION_KEY);
	}
}