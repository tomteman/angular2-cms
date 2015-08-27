import {Injectable} from 'angular2/angular2';
import {HttpWrapper} from 'app/datacontext/httpWrapper';
import {Observable} from 'rx';
import * as io from 'socket.io-client';

let config = require('config.json');

@Injectable()
export class QuestionApi {
	constructor(public http: HttpWrapper) {
	}

	get() {
		return this.http.get('/api/questions');
	}

	create(question) {
		return this.http.post('/api/questions', question);
	}

	feed() {
		var socket = io(config.serverLocation);
		return Observable
			.fromEvent(socket, 'questions:feed')
			.map(res => JSON.parse(res));
	}

}