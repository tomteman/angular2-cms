import {Directive, ElementRef} from 'angular2/angular2';
import {Renderer} from 'angular2/render';

@Directive({
    selector: '[autofocus]'
})
export class Autofocus {
    constructor(el: ElementRef, renderer: Renderer) {
        renderer.invokeElementMethod(el, 'focus', []);
    }
}