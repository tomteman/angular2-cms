
export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	} else {
		return response.text().then(function(text) {
			var data;
			
			try {
				data = JSON.parse(text);
			} catch (e) {
				data = text;				
			}
			
			var err = {
				data: data,
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