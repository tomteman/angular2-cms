import {Injectable, bind} from 'angular2/di';
import {Observable} from 'rx';
import {Base64} from 'app/facade/base64';

let properties = require('app/properties.json');

@Injectable()
export class HttpWrapper {

	get(url: string, options?) {
		return window
			.fetch(properties.serverLocation + url)
			.then(checkStatus)
			.then(parseJSON);
	}

	post(url: string, body?: Object, options?) {
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
	
	// TODO: create general request
	// TODO: add put & delete
}

// TODO: move to seperated file
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else if (response.status === 401) {
		var signInState = Base64.encode(JSON.stringify({returnUrl: window.location.pathname}));
		// TODO: replace with native Angular Router navigate
		location.href = '/signin/' + signInState;
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

// TODO: move to seperated file
function parseJSON(response) {
	return response.json();
}

export var httpWrapperInjectables: Array<any> = [
	HttpWrapper
];