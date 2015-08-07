import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

let properties = require('app/properties.json');

@Injectable()
export class SessionApi {
	constructor(public http: HttpWrapper) { }
	
	getUserDetails() {
		return this.http.get('/api/auth/user');
	}	

}