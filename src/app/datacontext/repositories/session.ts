import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

let properties = require('app/properties.json');

@Injectable()
export class SessionApi {
	constructor(public http: HttpWrapper) { }
	
	getSigninUrl(signInState: string) :string {
		return properties.serverLocation + '/api/auth/signin/' + signInState;
	}
	
	getSignoutUrl() :string {
		return properties.serverLocation + '/api/auth/signout';
	}

}