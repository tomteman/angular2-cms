import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';


@Injectable()
export class SessionApi {
	constructor(public http: HttpWrapper) {
	}

	isSignedIn() {
		console.log('isSignedIn!');	
		return http.get('/api/auth/user');
	}

}