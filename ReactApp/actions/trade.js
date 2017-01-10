"use strict";

export function incr(amount) {
	return {
		type: 'PORT_INC',
		count: amount
	}
}

export function decr(amount) {
	return {
		type: 'PORT_DECR',
		count: amount
	}
}