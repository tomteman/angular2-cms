import {HttpWrapper} from './httpWrapper';
import {GameApi} from './repositories/game';
import {QuestionApi} from './repositories/question';

export var datacontextInjectables: Array<any> = [
  HttpWrapper,
  GameApi,
  QuestionApi
];