'use strict';

const pDefer = require('p-defer');

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
	const deferred = pDefer();
	const recursive = result => {
		if (stop() || continueTest(result) === false) {
			deferred.resolve(true);
		} else {
			pprocess().then(recursive);
		}
	};
	pprocess().then(recursive);
	return deferred.promise;
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
	const deferred = pDefer();
	const recursive = () => {
		if (stop() || list.length <= 0) {
			deferred.resolve(objects);
		} else {
			pprocess(list.pop()).then(recursive);
		}
	};
	recursive();
	return deferred.promise;
}

module.exports = {
	pprocess,
	pprocessList
};
