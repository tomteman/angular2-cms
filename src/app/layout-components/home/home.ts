import {Component, View, OnDestroy} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {Quotes} from 'app/quotes/quotes';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService} from 'app/mdl-components/index';

let styles = require('./home.scss');
let template = require('./home.html');

@Component({
    selector: 'home',
    bindings: [Quotes]
})
@View({
    directives: [RouterLink, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class Home implements OnDestroy {
    quote: Object;
    intervalSource;

    constructor(public quotes: Quotes) {
        this.getQuotes(15000);
        MdlService.upgradeAllRegistered();
    }

    getQuotes(timeout: number) {
        this.quote = this.quotes.get();
        this.intervalSource = setInterval(()=>{this.updateQuote()}, timeout);
    }

    updateQuote() {
        this.quote = this.quotes.get();

    }
    onDestroy() {
		clearInterval(this.intervalSource);
	}

}
