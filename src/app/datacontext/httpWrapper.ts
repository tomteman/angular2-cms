import {Injectable, bind} from 'angular2/di';
import {Observable} from 'rx';

import {checkStatus, parseJSON} from './fetchFunctions';
import {HttpInterceptor} from './httpInterceptor'
import {Session} from 'app/session/session';


let config = require('config.json');

@Injectable()
export class HttpWrapper {

	defaultOptions = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	}

	constructor(public session: Session) { }

	request(url: string, options) {
		if (this.session.isPresenter()) {
			this.defaultOptions.headers['pof-presenter'] = '1';
		}
		
		var fetchOptions = _.merge({}, this.defaultOptions, options);

		if (fetchOptions.body) {
			fetchOptions.body = JSON.stringify(fetchOptions.body);
		}

		return window
			.fetch(config.serverLocation + url, fetchOptions)
			.then(HttpInterceptor.checkAuth)
			.then(checkStatus)
			.then(parseJSON);
	}

	get(url: string, options?) {
		var getOptions = _.merge({}, options, { method: 'get' });
		return this.request(url, getOptions);
	}

	post(url: string, body?: Object, options?) {
		var postOptions = _.merge({}, options, { method: 'post', body: body });
		return this.request(url, postOptions);
	}

	put(url: string, body?: Object, options?) {
		var putOptions = _.merge({}, options, { method: 'put', body: body });
		return this.request(url, putOptions);
	}

	delete(url: string, options?) {
		var deleteOptions = _.merge({}, options, { method: 'delete' });
		return this.request(url, deleteOptions);
	}
}

export var httpWrapperInjectables: Array<any> = [
	HttpWrapper
];