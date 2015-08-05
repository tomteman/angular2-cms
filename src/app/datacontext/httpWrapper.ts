import {Injectable, bind} from 'angular2/di';
import {Observable} from 'rx';

import {checkStatus, parseJSON} from './fetchFunctions';
import {Base64} from 'app/facade/base64';
import {Router} from 'angular2/router';


let properties = require('app/properties.json');

@Injectable()
export class HttpWrapper {

	defaultOptions = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	}
	
	constructor(public router: Router) {
		
	}

	request(url: string, options) {
		var fetchOptions = _.merge({}, this.defaultOptions, options);

		if (fetchOptions.body) {
			fetchOptions.body = JSON.stringify(fetchOptions.body);
		}

		return window
			.fetch(properties.serverLocation + url, fetchOptions)
			.then(checkStatus)
			.then(parseJSON)
			.catch(err => {
				if (err.status === 401) {
					var signInState = Base64.encode(JSON.stringify({ returnUrl: window.location.pathname }));
					this.router.navigate('/signin/' + signInState);
				} else {
					return Promise.reject(err);
				}
			});
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