
export function checkStatus(response) {
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

export function parseJSON(response) {
	return response.json();
}