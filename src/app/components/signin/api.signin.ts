import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';
import {Observable} from 'rx';


@Injectable()
export class SignInApi {
	constructor(public http: HttpWrapper) {
	}

	isSignedIn() {
		return this.http.get('/api/auth/user');
	}

}