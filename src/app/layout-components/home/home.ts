import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Quotes} from 'app/quotes/quotes';

let styles = require('./home.css');
let template = require('./home.html');

@Component({
    selector: 'home',
    bindings: [Quotes]
})
@View({
    directives: [ROUTER_DIRECTIVES],
    styles: [styles],
    template: template,
    	lifecycle: [LifecycleEvent.OnDestroy]
})



export class Home {
    quote: Object;
    intervalSource;

    constructor(public quotes: Quotes) {
        this.getQuotes(10000)
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
