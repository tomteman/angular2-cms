import {Component, View} from 'angular2/angular2';
import * as _ from 'lodash';

const styles = require('./snackbar.css');
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
	constructor() {

	}
}