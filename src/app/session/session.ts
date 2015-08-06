import {Injectable} from 'angular2/di';

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
	
	signout() {
		this.deleteSession();
    	location.href = this.sessionApi.getSignoutUrl();
	}
	
	deleteSession() {
		localStorage.removeItem(SESSION_KEY);
	}

}