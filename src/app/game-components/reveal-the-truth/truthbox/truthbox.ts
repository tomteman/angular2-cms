import {Component, View, OnInit, EventEmitter} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';
import * as _ from 'lodash';

const styles = require('./truthbox.scss');
const template = require('./truthbox.html');

@Component({
	selector: 'truthbox',
	inputs: ['answers'],
	outputs: ['onFinish']
})
@View({
	directives: [APP_DIRECTIVES, MDL_COMPONENTS],
	styles: [styles],
	template: template
})
export class Truthbox implements OnInit {
	answers;
	answer;
	answerIndex = -1;
	houseLie;
	playersLie;
	onFinish: EventEmitter = new EventEmitter();

	constructor() { }

	onInit() {
		this.tickAnswer();
	}

	tickAnswer() {
		if (this.answerIndex === this.answers.length - 1) {
			this.onFinish.next();
		} else {
			this.answerIndex++;
			this.answer = this.answers[this.answerIndex];
			this.houseLie = !this.answer.truth && this.answer.createdBy[0].id === 'house';
			this.playersLie = !this.answer.truth && this.answer.createdBy[0].id !== 'house';
			this.animateAnswer().then(() => {
				this.tickAnswer();
			})
		}
	}

	animateAnswer() {
		return new Promise((res, rej) => {
			setTimeout(() => {
				var tl = new TimelineLite();
				tl.set('.truthbox', { visibility: 'visible' })
					.fromTo('#answerText', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
					.staggerFromTo('.selected-by-player img', 1, { rotation: -180, autoAlpha: 0 }, { rotation: 0, autoAlpha: 1 }, 1)
					.staggerFromTo('.created-by-player img', 2, { rotation: -180, autoAlpha: 0 }, { rotation: 0, autoAlpha: 1 }, 1)
					.fromTo('#pointsForLiars', 1, { autoAlpha: 0 }, { autoAlpha: 1 }, 'points')
					.fromTo('#pointsForTruth', 1, { autoAlpha: 0 }, { autoAlpha: 1 }, 'points')
					.fromTo('#pointsForHouseLie', 1, { autoAlpha: 0 }, { autoAlpha: 1 }, 'points')
					.to('#answerText, #pointsForLiars, #pointsForTruth, #pointsForHouseLie, .selected-by-player img, .created-by-player img', 1, { autoAlpha: 0 })
					.eventCallback('onComplete', res);
			});
		});
	}

}