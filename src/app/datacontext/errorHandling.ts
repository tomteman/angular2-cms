export class ErrorHandling {
	static getErrorMessage(response) {
		if (response.data && response.data.message) {
			return response.data.message;
		} else if (__DEV__) {
			return JSON.stringify(response);
		} else {
			return 'Unexpected error';
		}
	}
}