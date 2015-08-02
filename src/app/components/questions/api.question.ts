import {Injectable, bind} from 'angular2/di';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rx';
import * as io from 'socket.io-client';
import {ISeedQuestion} from './IQuestion';

let properties = require('app/properties.json');

@Injectable()
export class QuestionApi {
	constructor(public http: Http) {
	}

	getQuestions() {
		return this.http.get(properties.serverLocation + '/api/questions/')
			.toRx()
			.map(res => res.json());
	}

	createQuestion(question: ISeedQuestion) {
		return this.http.post(properties.serverLocation + '/api/questions/',
			JSON.stringify(question),
			{
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.toRx()
			.map(res => res.json());
	}

	getQuestionsFeed() {
		var socket = io(properties.serverLocation);
		return Observable
			.fromEvent(socket, 'questions:feed')
			.map(res => JSON.parse(res));
	}

}