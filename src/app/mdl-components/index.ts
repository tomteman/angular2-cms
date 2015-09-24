import {MdlService} from './mdlService';
import {Chips} from './chips/chips';
import {LoadingMask} from './loadingMask/loadingMask';
import {LoadingMaskService} from './loadingMask/loadingMaskService';
import {Snackbar} from './snackbar/snackbar';
import {NotificationService} from './snackbar/notificationService';

export var MDL_COMPONENTS: Array<any> = [
  Chips,
  LoadingMask,
  Snackbar
];

export var MDL_BINDINGS: Array<any> = [
  MdlService,
  LoadingMaskService,
  NotificationService
];

export {MdlService} from './mdlService';
export {LoadingMaskService} from './loadingMask/loadingMaskService';
export {NotificationService} from './snackbar/notificationService';