import {Component, View, OnInit} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import * as _ from 'lodash';

import {MdlService} from 'app/mdl-components/index';

const styles = require('./chips.scss');
const template = require('./chips.html');

@Component({
	selector: 'chips',
	inputs: ['collection', 'label', 'grid', 'maxLength']
})
@View({
	directives: [APP_DIRECTIVES],
	styles: [styles],
	template: template
})
export class Chips implements OnInit {
	collection: Array<string>;

	constructor() { }

	onInit() {
		if (!_.isArray(this.collection)) {
			throw Error(`Chips: collection must be an array! (given '${typeof this.collection}')`);
		} else if (!this.collection.length) {
			this.collection.push('');
		}
	}

	addItem() {
        this.collection.push('');
		MdlService.upgradeAllRegistered();
    }

    onBlur(event, index) {
        this.collection[index] = event.target.value;
		MdlService.checkInputsDirty();

		if (event.relatedTarget && event.relatedTarget.id === 'addItem') {
			setTimeout(this.addItem.bind(this), 0);
		}
    }
}