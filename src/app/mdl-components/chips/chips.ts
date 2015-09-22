import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import * as _ from 'lodash';

import {MdlService} from 'app/mdl-components/index';

const styles = require('./chips.css');
const template = require('./chips.html');

@Component({
	selector: 'chips',
	properties: ['collection', 'label', 'grid'],
	lifecycle: [LifecycleEvent.OnInit]
})
@View({
	directives: [APP_DIRECTIVES],
	styles: [styles],
	template: template
})
export class Chips {
	collection: Array<string>;

	constructor() {}

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
    }
}