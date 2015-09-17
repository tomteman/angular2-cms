import {Injectable} from 'angular2/angular2';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

@Injectable()
export class FacebookApi {
	constructor(public http: HttpWrapper) { }

	getFacebookFriends() {
		return this.http.get(`/api/facebook/friends`);
	}

}