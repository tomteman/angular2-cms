export class SnackbarService {
	/**
	 * TODO:
	 * animation
	 * handle queue of messages?
	 *
	 */
	static show(messsage: string) {
		SnackbarService.hide();
		SnackbarService.setSnackbarText(messsage);
		SnackbarService.getSnackbarElement().style.display = 'block';
		setTimeout(SnackbarService.hide, 3000);
	}

	static hide() {
		SnackbarService.getSnackbarElement().style.display = 'none';
	}

	static getSnackbarElement() {
		return document.getElementsByClassName('pof-snackbar')[0];
	}

	static setSnackbarText(message: string) {
		SnackbarService.getSnackbarElement().querySelectorAll('#snackbarMessage')[0].innerHTML = message;
	}
}