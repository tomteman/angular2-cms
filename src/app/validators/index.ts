export function answerMaxLength(control) {
	if (control.value.length > 20) {
		return { maxLength: true };
	}
}

export function questionMaxLength(control) {
	if (control.value.length > 20) {
		return { maxLength: true };
	}
}