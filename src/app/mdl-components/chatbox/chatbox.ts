import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import * as _ from 'lodash';

const styles = require('./chatbox.css');
const template = require('./chatbox.html');

@Component({
	selector: 'chatbox',
	properties: ['image', 'author', 'text']
})
@View({
	directives: [APP_DIRECTIVES],
	styles: [styles],
	template: template
})
export class Chatbox {
	image: string;
	author: string;
	text: string;

	constructor() { }
}