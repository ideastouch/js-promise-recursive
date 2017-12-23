'use strict';
import test from 'ava';
import delay from 'delay';
import * as rPromise from './index';

test('pprocess', async t => {
	const list = [1, 2, 3, 4];
	const pprocess = () => {
		list.pop();
		return delay(1, list);
	};
	const continueTest = l => l.length > 0;
	const result = await rPromise.pprocess(pprocess, continueTest);
	t.is(result, true);
});

test('pprocessList', async t => {
	const list = [1, 2, 3, 4];
	const result = await rPromise.pprocessList(list, delay);
	t.is(result, true);
});
