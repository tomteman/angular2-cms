export class MdlService {

	static upgradeAllRegistered() {
		setTimeout(() => componentHandler.upgradeAllRegistered(), 0);
	}

	static checkInputsDirty() {
		let inputs = document.querySelectorAll('input[type=text]')

		setTimeout(() => {
			for (let input of inputs) {
				if (input.value && input.value.length > 0) {
					input.parentElement.classList.add('is-dirty');
				} else {
					input.parentElement.classList.remove('is-dirty');
				}
			}
		}, 0);
	}

	static clearRadioButtons(radioButtons) {
		for (let btn of radioButtons) {
            btn.checked = false;
            btn.parentElement.classList.remove('is-checked');
        }
	}
}