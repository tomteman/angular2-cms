import {Component, View} from 'angular2/angular2';

let styles = require('./topFrame.css');
let template = require('./topFrame.html');

@Component({
    selector: 'top-frame'
})
@View({
    styles: [styles],
    template: template
})
export class TopFrame {

}
