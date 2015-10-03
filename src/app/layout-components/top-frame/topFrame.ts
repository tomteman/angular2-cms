import {Component, View} from 'angular2/angular2';

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
