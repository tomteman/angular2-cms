import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

let properties = require('app/properties.json');

@Injectable()
export class SessionApi {
	constructor(public http: HttpWrapper) {
	}

	// isSignedIn() {
	// 	console.log('isSignedIn!');	
	// 	return http.get('/api/auth/user');
	// }
	
	getSigninUrl(signInState: string) :string {
		return properties.serverLocation + '/api/auth/login/' + signInState
	}

}