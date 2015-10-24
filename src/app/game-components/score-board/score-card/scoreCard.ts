import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';
import * as _ from 'lodash';

import {IPlayer} from 'app/bs-typings/player';

const styles = require('./scoreCard.scss');
const template = require('./scoreCard.html');

@Component({
	selector: 'score-card',
	inputs: ['player', 'answer', 'index']
})
@View({
	directives: [APP_DIRECTIVES, MDL_COMPONENTS],
	styles: [styles],
	template: template
})
export class ScoreCard {
	player: IPlayer;
	answer;

	constructor() {}
}