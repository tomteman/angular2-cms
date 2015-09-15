import {HttpWrapper} from './httpWrapper';
import {GameApi} from './repositories/gameApi';
import {CategoryApi} from './repositories/categoryApi';
import {SessionApi} from './repositories/sessionApi';
import {HttpInterceptor} from './httpInterceptor'

export var DATACONTEXT_BINDINGS: Array<any> = [
    HttpWrapper,
    GameApi,
    CategoryApi,
    SessionApi,
    HttpInterceptor
];