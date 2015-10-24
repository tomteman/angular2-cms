import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';
import * as _ from 'lodash';

const style = require('./playerPicture.scss');

@Component({
	selector: 'player-picture',
	inputs: ['src']
})
@View({
	styles: [style],
	template: `
		<img class="player-picture" [src]="src">
	`
})
export class PlayerPicture {
	constructor() {

	}
}