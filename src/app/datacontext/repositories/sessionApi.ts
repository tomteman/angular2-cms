import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

@Injectable()
export class SessionApi {
	constructor(public http: HttpWrapper) { }

	getUserDetails() {
		return this.http.get('/api/auth/user');
	}

	presenterSignout() {
		return this.http.get('/api/auth/presenterSignout');
	}

	getPlayers(ids: Array<string>) {
		return this.http.post('/api/auth/players', { 'ids': ids });
	}

}