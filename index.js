'use strict';

const Promise = require('promise');

/**
 *
 * @param {() => Promise} pprocess, return a promise that is resolved with the results when the pprocess completes.
 * @param {* => Bool} continueTest
 * @param {() => Bool} stop
 */
function pprocess(pprocess, continueTest, stop) {
	if (stop === undefined) {
		stop = () => false;
	}
	const recursive = result => {
		if (stop() || continueTest(result) === false) {
			return Promise.resolve(true);
		} else {
			return pprocess().then(recursive, Promise.reject);
		}
	};
	return pprocess().then(recursive, Promise.reject);
}

/**
 *
 * @param {[]} objects
 * @param {([], resolve, reject) => ()} pprocess, , return a promise that is resolved with the objects when the pprocess completes.
 * @param {() => Bool} stop
 */
function pprocessList(objects, pprocess, stop) {
	if (stop === undefined) {
		stop = () => false;
	}
	const list = objects.slice(0, objects.length).reverse();
	const recursive = () => {
		if (stop() || list.length <= 0) {
			return Promise.resolve(objects);
		} else {
			return pprocess(list.pop()).then(recursive, Promise.reject);
		}
	};
	return recursive();
}

module.exports = {
	pprocess,
	pprocessList
};
