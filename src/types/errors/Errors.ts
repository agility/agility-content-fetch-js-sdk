

export class EvalError extends Error {
	constructor(message?: string, asserter = undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}


export class RangeError extends Error {
	constructor(message?: string, asserter = undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}


export class ReferenceError extends Error {
	constructor(message?: string, asserter = undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}


export class SyntaxError extends Error {
	constructor(message?: string, asserter = undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}

export class TypeError extends Error {
	/**
	 * @param {string} message The error message
	 * @param {Function} [asserter] The assertion function that threw the error. Removes stack-trace noise if provided.
	 */
	constructor(message: string, asserter?: any) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}


export class URIError extends Error {
	constructor(message?: string, asserter = undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}
