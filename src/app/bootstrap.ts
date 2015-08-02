import {bootstrap} from 'angular2/angular2';
import {httpInjectables} from 'angular2/http';
import {formInjectables} from 'angular2/forms';
import {routerInjectables} from 'angular2/router';

import {App} from './components/app';

import {
  nativeShadowDomInjectables,
  emulatedScopedShadowDomInjectables,
  emulatedUnscopedShadowDomInjectables
} from '../common/shadowDomInjectables';
import {
  jitInjectables,
  dynamicInjectables,
  preGeneratedInjectables
} from '../common/changeDetectionInjectables';

var universalInjectables = [
  httpInjectables,
  formInjectables,
  routerInjectables,
];

var platformInjectables = [
  // if we want to use the Just-In-Time change detection
  // bestChangeDetectionInjectables,

  // nativeShadowDomInjectables
];

bootstrap(
  App,

  [
    universalInjectables,
    platformInjectables
  ]
);
