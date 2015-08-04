import {HttpWrapper} from './httpWrapper';
import {GameApi} from './repositories/game';

export var datacontextInjectables: Array<any> = [
  HttpWrapper,
  GameApi
];