export class NotificationService {
	/**
	 * TODO:
	 * animation
	 * handle queue of messages?
	 * push content on top
	 */

	/**
	 * should return instance - add ability to hide(/dismiss/abort)
	 * should have timeout param
	 */
	static show(messsage: string) {
		NotificationService.hide();
		NotificationService.setSnackbarText(messsage);
		NotificationService.getSnackbarElement().style.display = 'block';
		setTimeout(NotificationService.hide, 3000);
	}

	static hide() {
		NotificationService.getSnackbarElement().style.display = 'none';
	}

	static getSnackbarElement() {
		return document.getElementsByClassName('pof-snackbar')[0];
	}

	static setSnackbarText(message: string) {
		NotificationService.getSnackbarElement().querySelectorAll('#snackbarMessage')[0].innerHTML = message;
	}
}