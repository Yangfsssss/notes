/** Memoizing async functions in Javascript */
//https://stackfull.dev/memoizing-async-functions-in-javascript

Function.prototype.log = function (...args) {
	console.log(this(...args));
};

Object.prototype.log = function () {
	console.log(this);
};

//一个用来计算的纯函数
function getSquare(x) {
	return x * x;
}

//加入缓存功能
const memo = {};
function getSquare1(x) {
	if (memo.hasOwnProperty(x)) {
		return memo[x];
	}

	memo[x] = x * x;

	return memo[x];
}

//使用闭包实现缓存的高阶函数
function memoize(fn, getKey) {
	const memo = {};

	return function memoize(...args) {
		const key = getKey(...args);

		if (memo.hasOwnProperty(key)) {
			return memo[key];
		}

		memo[key] = fn.apply(this, args);
		return memo[key];
	};
}

//getKey：输入的key与实际缓存中的key的映射函数
const getKey = (x) => x;
const memoGetSquare = memoize(getSquare, getKey);
memoGetSquare.log(5);

const getDivision = (a, b) => a / b;
const memoGetDivision = memoize(getDivision, (a, b) => `${a}_${b}`);
memoGetDivision.log(56, 7);

//一个异步的纯函数
function expensiveOperation(key, operation) {
	let result = null;

	new Promise((resolve, reject) => {
		setTimeout(() => resolve(key), 3000);
	}).then(operation);
}

//简单缓存
function simpleMemo() {
	let memo1 = {};
	function memoExpensiveOperation(key, cb) {
		if (memo1.hasOwnProperty(key)) {
			cb(memo1[key]);
			return;
		}

		expensiveOperation(key, (data) => {
			memo1[key] = data;
			cb(data);
		});
	}

	memoExpensiveOperation(5, (x) => console.log(x, memo1));
	// memo1.log();
}

//队列缓存
function queuedMemo() {
	const memo = {};
	const progressQueue = {};

	function memoExpensiveOperation(key, cb) {
		if (memo.hasOwnProperty(key)) {
			cb(memo[key]);
			return;
		}

		if (!progressQueue.hasOwnProperty(key)) {
			progressQueue[key] = [cb];
		} else {
			progressQueue[key].push(cb);
			return;
		}

		expensiveOperation(key, (data) => {
			memo[key] = data;

			for (let cb of progressQueue[key]) {
				cb(data);
			}

			delete progressQueue[key];
		});
	}
}
