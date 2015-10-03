import {Component, View} from 'angular2/angular2';
import * as _ from 'lodash';

const styles = require('./snackbar.scss');
const template = require('./snackbar.html');

@Component({
	selector: 'snackbar'
})
@View({
	directives: [],
	styles: [styles],
	template: template
})
export class Snackbar {
	static delayedMessages: Array<Message> = [];

	constructor() { }

	/**
	* TODO:
	* animation
	* actions
	*/

	static show(message: string, { hideDuration = 3000, delay = 0 } = {}) {
		let newMessage = new Message(message, hideDuration);
		Snackbar.delayedMessages.push(newMessage);

		setTimeout(() => {
			let message = _.find(Snackbar.delayedMessages, { key: newMessage.key });

			if (message) {
				Snackbar.setSnackbarText(message.text);
				Snackbar.getSnackbarElement().style.display = 'block';
				setTimeout(Snackbar.hide, message.hideDuration);
				Snackbar.remove(message);
			}
		}, delay);

		return newMessage;
	}

	static remove(message: Message) {
		_.remove(Snackbar.delayedMessages, { key: message.key });
	}

	static removeAll() {
		Snackbar.delayedMessages = [];
	}

	static hide() {
		Snackbar.getSnackbarElement().style.display = 'none';
	}

	static getSnackbarElement() {
		return document.getElementsByTagName('snackbar')[0];
	}

	static setSnackbarText(message: string) {
		Snackbar.getSnackbarElement().querySelectorAll('#snackbarMessage')[0].innerHTML = message;
	}
}

class Message {
	key: string;

	constructor(public text, public hideDuration) {
		this.key = _.uniqueId();
	}
}