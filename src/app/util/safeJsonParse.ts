export function safeJsonParse(onErrorCb: Function) {
	return (target: Function, key: string, descriptor: any) => {
		var originalMethod = descriptor.value;

		descriptor.value = function(...args: any[]) {
			try {
				return originalMethod.apply(this, args);
			} catch (error) {
				if (onErrorCb) {
					onErrorCb();
				}
			}
		}

		return descriptor;
	}
}