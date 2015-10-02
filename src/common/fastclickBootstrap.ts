import * as FastClick from 'fastclick';

export function fastclickBootstrap() {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}