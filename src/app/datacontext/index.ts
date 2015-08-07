import {HttpWrapper} from './httpWrapper';
import {GameApi} from './repositories/gameApi';
import {QuestionApi} from './repositories/questionApi';
import {SessionApi} from './repositories/sessionApi';
import {HttpInterceptor} from './httpInterceptor' 

export var datacontextInjectables: Array<any> = [
  HttpWrapper,
  GameApi,
  QuestionApi,
  SessionApi,
  HttpInterceptor
];