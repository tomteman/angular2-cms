import {bootstrap} from 'angular2/angular2';
import {FORM_BINDINGS} from 'angular2/angular2';
import {routerInjectables as ROUTER_BINDINGS} from 'angular2/router';

import {App} from './components/app';
import {DATACONTEXT_BINDINGS} from './datacontext/index';
import {SESSION_BINDINGS} from './session/index';

import {HASH_LOCATION_BINDINGS} from '../common/location_bindings';

const UNIVERSAL_BINDINGS = [
    FORM_BINDINGS,
    ROUTER_BINDINGS,
];

const PLATFORM_BINDINGS = [
    HASH_LOCATION_BINDINGS
];

const APP_BINDINGS = [
    DATACONTEXT_BINDINGS,
    SESSION_BINDINGS
]

const ALL_BINDINGS = [
    UNIVERSAL_BINDINGS,
    PLATFORM_BINDINGS,
    APP_BINDINGS
]

bootstrap(
    App,
    ALL_BINDINGS
    );
