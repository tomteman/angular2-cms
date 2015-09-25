import {Component, View, ElementRef, LifecycleEvent} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import * as _ from 'lodash';

const styles = require('./countdown.css');
const template = require('./countdown.html');

@Component({
	selector: 'countdown',
	properties: ['total', 'panic', 'superPanic'],
	lifecycle: [LifecycleEvent.OnInit]
})
@View({
	directives: [APP_DIRECTIVES],
	styles: [styles],
	template: template
})
export class Countdown {
	total;
	panic;
	superPanic;

	constructor(public elem: ElementRef) {
	}

	onInit() {
		let Timer = new radialTimer();
		Timer.init(this.elem.nativeElement, this.total, this.panic, this.superPanic);
	}

}

function radialTimer() {
	var self = this;

	this.seconds = 0;
	this.count = 0;
	this.degrees = 0;
	this.interval = null;
	this.timerContainer = null;
	this.number = null;
	this.slice = null;
	this.pie = null;
	this.pieRight = null;
	this.pieLeft = null;
	this.quarter = null;

	this.init = function(e, totalTime, panicTime, superPanic) {
		navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
		self.timerContainer = e;

		self.number = self.timerContainer.getElementsByClassName("n")[0];
		self.slice = self.timerContainer.getElementsByClassName("slice")[0];
		self.pieRight = self.timerContainer.getElementsByClassName("r")[0];
		self.pieLeft = self.timerContainer.getElementsByClassName("l")[0];
		self.quarter = self.timerContainer.getElementsByClassName("q")[0];

		// start timer
		self.start(totalTime, panicTime, superPanic);
	}

	this.start = function(totalTime, panicTime, superPanic) {
		self.seconds = totalTime;
		self.interval = window.setInterval(function() {
			self.number.innerHTML = '' + (self.seconds - self.count);
			self.count++;

			if (self.count > (self.seconds - 1)) clearInterval(self.interval);

			if (self.seconds - self.count < panicTime) {
				self.slice.classList.add('panic');
			}

			if ((self.seconds - self.count < superPanic) && navigator.vibrate) {
				navigator.vibrate(300);
			}

			self.degrees = self.degrees + (360 / self.seconds);
			if (self.count >= (self.seconds / 2)) {
				self.slice.classList.add("nc");
				if (!self.slice.classList.contains("mth")) self.pieRight.style.transform = "rotate(180deg)";
				self.pieLeft.style.transform = "rotate(" + self.degrees + "deg)";
				self.slice.classList.add("mth");
				if (self.count >= (self.seconds * 0.75)) self.quarter.remove();
			} else {
				self.pieLeft.style.transform = "rotate(" + self.degrees + "deg)";
				self.pieRight.style.transform = "rotate(" + self.degrees + "deg)";
			}
		}, 1000);
	}
}