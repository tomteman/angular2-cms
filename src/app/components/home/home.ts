import {Component, View} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

let styles = require('./home.css');
let template = require('./home.html');

@Component({
    selector: 'home'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    styles: [styles],
    template: template
})

export class Home {
    constructor() {
        // MDL issue
        componentHandler.upgradeDom();
    }
}
