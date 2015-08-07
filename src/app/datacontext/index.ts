import {HttpWrapper} from './httpWrapper';
import {GameApi} from './repositories/game';
import {QuestionApi} from './repositories/question';
import {SessionApi} from './repositories/session';
import {HttpInterceptor} from './httpInterceptor' 

export var datacontextInjectables: Array<any> = [
  HttpWrapper,
  GameApi,
  QuestionApi,
  SessionApi,
  HttpInterceptor
];