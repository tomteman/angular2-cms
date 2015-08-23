import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

@Injectable()
export class SessionApi {
	constructor(public http: HttpWrapper) { }

	getUserDetails() {
		return this.http.get('/api/auth/user');
	}

}