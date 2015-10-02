import {Component, View, ElementRef, LifecycleEvent} from 'angular2/angular2';
import * as _ from 'lodash';

const styles = require('./countdown.css');
const template = require('./countdown.html');

@Component({
	selector: 'countdown',
	properties: ['total', 'panic', 'superPanic', 'currentTime'],
	lifecycle: [LifecycleEvent.OnInit, LifecycleEvent.OnDestroy]
})
@View({
	styles: [styles],
	template: template
})
export class Countdown {
	total;
	panic;
	superPanic;
	currentTime;

	intervalSource;
	percentTime;
	timerText;
	timerCircle;

	constructor(public elem: ElementRef) {
	}

	onInit() {
		navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
		this.currentTime = this.currentTime || this.total;
		this.percentTime = Math.round((this.currentTime / this.total) * 100);
		this.timerText = document.querySelector('.text');
		this.timerCircle = document.querySelector('.circle');

		requestAnimationFrame(() => { this.timerId() });

		this.intervalSource = setInterval(() => {
			requestAnimationFrame(() => { this.timerId() });
		}, 1000);

	}

	timerId() {
        if (this.currentTime === -1) {
			clearInterval(this.intervalSource);
			return;
		}

		if (this.currentTime <= this.panic) {
			this.timerCircle.classList.add('panic');
		} else {
			this.timerCircle.classList.remove('panic');
		}

		if (this.currentTime <= this.superPanic && navigator.vibrate) {
			navigator.vibrate(300);
		}

        this.timerText.textContent = this.currentTime;
        this.percentTime = Math.round((this.currentTime / this.total) * 100);
        this.timerCircle.style.strokeDashoffset = this.percentTime - 100;

		this.currentTime -= 1;
    };

	onDestroy() {
		clearInterval(this.intervalSource);
		this.timerCircle.style.strokeDashoffset = 0;
		this.timerCircle.classList.remove('panic');
	}

}