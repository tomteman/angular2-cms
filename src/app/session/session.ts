import {Injectable} from 'angular2/di';


@Injectable()
export class Session {
	constructor() {
	}

	getUser() {
		var user = localStorage.getItem('sessionData');
		return user ? JSON.parse(user) : null;
	}
	
	getPicture() :string{
		var user = this.getUser();
		return user ? user.picture : '';
	}

}