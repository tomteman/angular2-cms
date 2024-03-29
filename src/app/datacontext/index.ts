import {HttpWrapper} from './httpWrapper';
import {GameApi} from './repositories/gameApi';
import {CategoryApi} from './repositories/categoryApi';
import {SessionApi} from './repositories/sessionApi';
import {HttpInterceptor} from './httpInterceptor'

export var DATACONTEXT_PROVIDERS: Array<any> = [
    HttpWrapper,
    GameApi,
    CategoryApi,
    SessionApi,
    HttpInterceptor
];

export {ErrorHandling} from './errorHandling';
export {GameApi} from './repositories/gameApi';
export {CategoryApi} from './repositories/categoryApi';
export {SessionApi} from './repositories/sessionApi';