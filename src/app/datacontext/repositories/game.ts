import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';
import {Observable} from 'rx';
import * as io from 'socket.io-client';

let properties = require('app/properties.json');

@Injectable()
export class GameApi {
	constructor(public http: HttpWrapper) {
	}
	
	get(gameName: string) {
		return this.http.get('/api/games/' + gameName);
	}

	create() {
		return this.http.post('/api/games');
	}

	feed(gameName: string) {
		var socket = io(properties.serverLocation);
		return Observable
			.fromEvent(socket, 'games:feed')
			.map(res => JSON.parse(res));
	}

}