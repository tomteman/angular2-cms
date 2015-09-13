import {Injectable} from 'angular2/angular2';
import {HttpWrapper} from 'app/datacontext/httpWrapper';

import {ISeedCategory} from 'app/pof-typings/category';

@Injectable()
export class CategoryApi {
	constructor(public http: HttpWrapper) { }

	getAll() {
		return this.http.get('/api/categories');
	}

	get(categoryName: string) {
		return this.http.get(`/api/categories/${categoryName}`);
	}

	create(category: ISeedCategory) {
		return this.http.post('/api/categories', category);
	}

	getQuestionByCategory(categoryName: string) {
		return this.http.get(`/api/categories/${categoryName}/questions`);
	}

}