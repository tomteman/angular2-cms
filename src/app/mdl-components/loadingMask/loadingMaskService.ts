export class LoadingMaskService {

	static show() {
		LoadingMaskService.getLoadingMaskElement().style.display = 'block';
		LoadingMaskService.getLoadingMaskContainerElement().style.display = 'block';
	}

	static hide() {
		LoadingMaskService.getLoadingMaskElement().style.display = 'none';
		LoadingMaskService.getLoadingMaskContainerElement().style.display = 'none';
	}

	static getLoadingMaskElement() {
		return document.getElementsByClassName('pof-loading-mask')[0];
	}

	static getLoadingMaskContainerElement() {
		return document.getElementsByClassName('pof-loading-mask-container')[0];
	}

}