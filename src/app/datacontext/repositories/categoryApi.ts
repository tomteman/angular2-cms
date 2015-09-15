import {Injectable} from 'angular2/angular2';
import {HttpWrapper} from 'app/datacontext/httpWrapper';
import {Observable} from 'rx';
import * as io from 'socket.io-client';

import {ISeedCategory} from 'app/pof-typings/category';
import {ISeedQuestion} from 'app/pof-typings/question';

let config = require('config.json');

@Injectable()
export class CategoryApi {
	constructor(public http: HttpWrapper) { }

	getAll(noQuestions: boolean) {
		return this.http.get(`/api/categories?noQuestions=${noQuestions}`);
	}

	getMyCategories() {
		return this.http.get('/api/categories/me');
	}

	get(categoryName: string) {
		return this.http.get(`/api/categories/${categoryName}`);
	}

	create(category: ISeedCategory) {
		return this.http.post('/api/categories', category);
	}

	createQuestion(categoryName: string, question: ISeedQuestion) {
		return this.http.post(`/api/categories/${categoryName}/questions/`, question);
	}

	feedByCategoryName(categoryName: string) {
		var socket = io(config.serverLocation);
		return Observable
			.fromEvent(socket, 'category:' + categoryName + ':feed')
			.map(res => JSON.parse(res));
	}

	feedMyCategory(playerId) {
		var socket = io(config.serverLocation);
		return Observable
			.fromEvent(socket, 'myCategory:' + playerId + ':feed')
			.map(res => JSON.parse(res));
	}

}