import {bootstrap} from 'angular2/angular2';
import {FORM_PROVIDERS} from 'angular2/angular2';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app';
import {DATACONTEXT_PROVIDERS} from './datacontext/index';
import {SESSION_PROVIDERS} from './session/index';
import {APP_DIRECTIVES} from './directives/index';
import {MDL_PROVIDERS} from './mdl-components/index';

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

const UNIVERSAL_PROVIDERS = [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS
];

const APP_PROVIDERS = [
    DATACONTEXT_PROVIDERS,
    SESSION_PROVIDERS,
    APP_DIRECTIVES,
    MDL_PROVIDERS
]

const ALL_PROVIDERS = [
    UNIVERSAL_PROVIDERS,
    APP_PROVIDERS
]

bootstrap(
    App,
    ALL_PROVIDERS
    );
