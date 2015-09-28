export function isJsObject(o: any): boolean {
  return o !== null && (typeof o === "function" || typeof o === "object");
}

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

export function isString(obj: any): boolean {
  return typeof obj === "string";
}

export function isFunction(obj: any): boolean {
  return typeof obj === "function";
}

export function isType(obj: any): boolean {
  return isFunction(obj);
}

export function isStringMap(obj: any): boolean {
  return typeof obj === 'object' && obj !== null;
}

export function isPromise(obj: any): boolean {
  return obj instanceof (<any>_global).Promise;
}

export function isArray(obj: any): boolean {
  return Array.isArray(obj);
}

export function isNumber(obj): boolean {
  return typeof obj === 'number';
}

export function isDate(obj): boolean {
  return obj instanceof Date && !isNaN(obj.valueOf());
}

export function timeDiff(from, to): number {
    let toTime = new Date(to);
    let fromTime = new Date(from);
    return Math.abs(fromTime.getTime() - toTime.getTime());
}