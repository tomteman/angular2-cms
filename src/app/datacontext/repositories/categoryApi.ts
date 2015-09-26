import {Injectable} from 'angular2/angular2';
import {HttpWrapper} from 'app/datacontext/httpWrapper';
import {Observable} from 'rx';
import * as io from 'socket.io-client';

import {ISeedCategory} from 'app/pof-typings/category';
import {ISeedQuestion, IQuestion} from 'app/pof-typings/question';

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

	getPotentialCategoryAdmins(categoryName: string) {
		return this.http.get(`/api/categories/${categoryName}/potentialCategoryAdmins`)
	}

	get(categoryName: string) {
		return this.http.get(`/api/categories/${categoryName}`);
	}

	create(category: ISeedCategory) {
		return this.http.post('/api/categories', category);
	}

	delete(categoryName: string) {
		return this.http.delete(`/api/categories/${categoryName}`);
	}

	createQuestion(categoryName: string, question: ISeedQuestion) {
		return this.http.post(`/api/categories/${categoryName}/questions/`, question);
	}

	updateQuestion(categoryName: string, question: IQuestion) {
		return this.http.post(`/api/categories/${categoryName}/questions/update`, question);
	}

	feedByCategoryName(categoryName: string) {
		var socket = io(config.serverLocation);
		return Observable
			.fromEvent(socket, 'category:' + categoryName + ':feed')
			.map(res => JSON.parse(res));
	}

	myCategoriesFeed(playerId) {
		var socket = io(config.serverLocation);
		return Observable
			.fromEvent(socket, 'myCategories:' + playerId + ':feed')
			.map(res => JSON.parse(res));
	}

	removeAdminFromCategory(categoryName: string, playerId: string) {
		return this.http.get(`/api/categories/${categoryName}/admins/${playerId}/remove`);
	}
	addAdminToCategory(categoryName: string, playerId: string) {
		return this.http.get(`/api/categories/${categoryName}/admins/${playerId}/add`);
	}
}