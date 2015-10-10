import {bootstrap} from 'angular2/angular2';
import {FORM_BINDINGS} from 'angular2/angular2';
import {ROUTER_BINDINGS, routerBindings} from 'angular2/router';

import {App} from './app';
import {DATACONTEXT_BINDINGS} from './datacontext/index';
import {SESSION_BINDINGS} from './session/index';
import {APP_DIRECTIVES} from './directives/index';
import {MDL_BINDINGS} from './mdl-components/index';

/**
 * https://github.com/angular/angular/issues/4506
 * should be fixed in alpha 42
 */
import {BrowserDomAdapter} from 'angular2/src/core/dom/browser_adapter';
BrowserDomAdapter.prototype.createElement = function(tagName, doc) {
    if (doc === void 0) {
        doc = document;
    }

    if(/^(svg|g|use|path|rect|path|text|circle)$/i.test(tagName)) {
        return doc.createElementNS('http://www.w3.org/2000/svg', tagName);
    } else {
        return doc.createElement(tagName);
    }
};

const UNIVERSAL_BINDINGS = [
    FORM_BINDINGS,
    ROUTER_BINDINGS,
    routerBindings(App)
];

const APP_BINDINGS = [
    DATACONTEXT_BINDINGS,
    SESSION_BINDINGS,
    APP_DIRECTIVES,
    MDL_BINDINGS
]

const ALL_BINDINGS = [
    UNIVERSAL_BINDINGS,
    APP_BINDINGS
]

bootstrap(
    App,
    ALL_BINDINGS
    );
