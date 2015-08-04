import {Base64} from 'app/facade/base64';

export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else if (response.status === 401) {
		var signInState = Base64.encode(JSON.stringify({ returnUrl: window.location.pathname }));
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

export function parseJSON(response) {
	return response.json();
}