import {Injectable, bind} from 'angular2/di';
import {Observable} from 'rx';

let properties = require('app/properties.json');

@Injectable()
export class HttpWrapper {
	get(url: string, options?) {
		return window
			.fetch(properties.serverLocation + url)
			.then(checkStatus)
			.then(parseJSON);
	}

	post(url: string, body: Object, options?) {
		var fetchOptions = {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
		
		return window
			.fetch(properties.serverLocation + url, fetchOptions)
			.then(checkStatus)
			.then(parseJSON);
	}
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		return response.text().then(function(text) {
			var err = {
				data: JSON.parse(text),
				status: response.status,
				headers: response.headers,
				statusText: response.statusText
			}
			return Promise.reject(err);
		});
	}
}

function parseJSON(response) {
	return response.json();
}

export var httpWrapperInjectables: Array<any> = [
	HttpWrapper
];