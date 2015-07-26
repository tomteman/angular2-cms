import {Injectable, bind} from 'angular2/di';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rx';
import * as io from 'socket.io-client';
import {IQuestion} from './interface.question';

@Injectable()
export class QuestionApi {
	constructor(public http: Http) {
	}

	getQuestions() {
		return this.http.get('http://localhost:3333/api/questions/')
			.toRx()
			.map(res => res.json());
	}

	createQuestion(question: IQuestion) {
		return this.http.post('http://localhost:3333/api/questions/',
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
		var socket = io('http://localhost:3333');
		return Observable
			.fromEvent(socket, 'questions:feed')
			.map(res => JSON.parse(res));
	}
	
	//	getProductions() {
	//		return Observable
	//    		.interval(1000)
	//    		.flatMap(() => this.http.request('http://localhost:3333/api/questions/'))
	//			.map(res => res.json());
	//	}

}