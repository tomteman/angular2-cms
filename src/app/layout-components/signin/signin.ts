import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';
import * as _ from 'lodash';

const styles = require('./signin.scss');
const template = require('./signin.html');

@Component({
	selector: 'signin'
})
@View({
	directives: [APP_DIRECTIVES, MDL_COMPONENTS],
	styles: [styles],
	template: template
})
export class Signin {
	constructor() {

	}
}