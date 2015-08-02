import {Injectable} from 'angular2/di';
import {HttpWrapper} from 'app/datacontext/httpWrapper';
import {Observable} from 'rx';
import * as io from 'socket.io-client';
import {ISeedQuestion} from './IQuestion';

let properties = require('app/properties.json');



@Injectable()
export class QuestionApi {
	constructor(public http: HttpWrapper) {
	}

	getQuestions() {
		return this.http.get('/api/questions');
	}

	createQuestion(question: ISeedQuestion) {
		return this.http.post('/api/questions', question);
	}

	getQuestionsFeed() {
		var socket = io(properties.serverLocation);
		return Observable
			.fromEvent(socket, 'questions:feed')
			.map(res => JSON.parse(res));
	}

}