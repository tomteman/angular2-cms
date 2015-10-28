import {Component, View, OnInit} from 'angular2/angular2';
import {Router} from 'angular2/router';
import * as _ from 'lodash';

import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';

let styles = require('./home.scss');
let template = require('./home.html');

@Component({
    selector: 'home'
})
@View({
    directives: [MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class Home implements OnInit {
    constructor(public router: Router) { }

    onClick(destination) {
        animateClick().then(() => {
            this.router.navigate([destination]);
        });
    }

    onInit() {
        var tl = new TimelineLite();
        tl.set('.mdl-button', { y: 0 })
            .staggerFrom('.mdl-button', 2, { scale: 0.5, opacity: 0, delay: 0.5, ease: Elastic.easeOut }, 0.2);
    }
}

function animateClick() {
    return new Promise((res, rej) => {
        var tl = new TimelineLite();
        tl.staggerTo('.mdl-button', 0.5, { y: -400, autoAlpha: 1, ease: Back.easeIn }, 0.1)
            .eventCallback('onComplete', res);
    });
}
