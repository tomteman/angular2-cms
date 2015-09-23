import {Component, View} from 'angular2/angular2';

const styles = require('./loadingMask.css');
const template = require('./loadingMask.html');

@Component({
	selector: 'loading-mask'
})
@View({
	styles: [styles],
	template: template
})
export class LoadingMask {
	constructor() { }
}