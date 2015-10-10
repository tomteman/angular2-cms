import {Directive, ElementRef, OnInit} from 'angular2/angular2';
import {Renderer} from 'angular2/render';
import * as _ from 'lodash';

@Directive({
	selector: '[max-length]',
	inputs: ['length: max-length']
})
export class MaxLength implements OnInit {
	length;

	constructor(public el: ElementRef, public renderer: Renderer) { }

	onInit() {
		if (_.isNumber(this.length)) {
			this.renderer.setElementAttribute(this.el, 'maxlength', this.length);
		}
	}
}