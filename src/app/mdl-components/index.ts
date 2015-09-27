import {MdlService} from './mdlService';
import {Chips} from './chips/chips';
import {LoadingMask} from './loadingMask/loadingMask';
import {LoadingMaskService} from './loadingMask/loadingMaskService';
import {Snackbar} from './snackbar/snackbar';
import {Countdown} from './countdown/countdown';

export var MDL_COMPONENTS: Array<any> = [
  Chips,
  LoadingMask,
  Snackbar,
  Countdown
];

export var MDL_BINDINGS: Array<any> = [
  MdlService,
  LoadingMaskService,
];

export {MdlService} from './mdlService';
export {LoadingMaskService} from './loadingMask/loadingMaskService';
export {Snackbar} from './snackbar/snackbar'