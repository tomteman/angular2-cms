import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';
import * as _ from 'lodash';

const styles = require('./truthbox.css');
const template = require('./truthbox.html');

@Component({
	selector: 'truthbox',
	properties: ['answer', 'finishCallback']
})
@View({
	directives: [APP_DIRECTIVES, MDL_COMPONENTS],
	styles: [styles],
	template: template,
	lifecycle: [LifecycleEvent.OnInit]
})
export class Truthbox {
	maskedPicture = 'http://i.imgur.com/qGDAIEYs.jpg';
	answer;
	chatboxData: ChatboxData;

	constructor() {
		this.revealSelectedBy();
		setTimeout(() => {
			this.revealAuthors().then(() => {
				console.log('then');
			});
		}, 1000);
	}

	onInit() {
		this.chatboxData = new ChatboxData(this.answer.text, '', this.maskedPicture);
	}

	revealSelectedBy() {

	}

	revealAuthors(i = 0) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.chatboxData = new ChatboxData(this.answer.text, this.answer.createdBy[i].name, this.answer.createdBy[i].picture);
				i++;
				if (i < this.answer.createdBy.length) {
					return this.revealAuthors(i);
				} else {
					resolve();
				}
			}, 1000);
		})

	}

}

class ChatboxData {
	constructor(public text: string, public author: string, public image: string) { }
}