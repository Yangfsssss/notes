/** Memoizing async functions in Javascript */
//https://stackfull.dev/memoizing-async-functions-in-javascript
Function.prototype.log = function (...args) {
    console.log(this(...args));
};
Object.prototype.log = function () {
    console.log(this);
};
//Memoization-------------------------------------------------------------------------------------
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
        console.log('key', key);
        console.log('memo', memo);
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
// memoGetSquare.log(5);
const getDivision = (a, b) => {
    console.log('getDivision executed');
    return a / b;
};
const memoGetDivision = memoize(getDivision, (a, b) => `${a}_${b}`);
// const memoGetDivision = memoize(getDivision, (a, b) => ({a,b}));
// memoGetDivision.log(56, 7);
// memoGetDivision.log(56, 7);
//Memoizing async functions--------------------------------------------------------------------
//一个异步的纯函数
function expensiveOperation(key, operation) {
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(key + 3), 1000);
    }).then(operation);
}
//简单缓存供回调函数调用的昂贵的计算结果
function simpleMemo() {
    let memo = {};
    function memoExpensiveOperation(key, cb) {
        console.log('memo', memo);
        if (memo.hasOwnProperty(key)) {
            cb(memo[key]);
            return;
        }
        expensiveOperation(key, (data) => {
            console.log('expensiveOperation executed');
            memo[key] = data;
            cb(data);
        });
    }
    memoExpensiveOperation(5, (x) => console.log(x, memo));
    memoExpensiveOperation(5, (x) => console.log(x, memo));
    // setTimeout(() => memoExpensiveOperation(5, (x) => console.log(x, memo)),1000)
}
//队列缓存
function queuedMemo() {
    const memo = {};
    //双重标记：如果key已经被标记，则不执行昂贵计算，并将cb推入在首次标记时创建的cb数组
    const progressQueue = {};
    function memoExpensiveOperation(key, cb) {
        if (memo.hasOwnProperty(key)) {
            cb(memo[key]);
            return;
        }
        if (!progressQueue.hasOwnProperty(key)) {
            progressQueue[key] = [cb];
        }
        else {
            progressQueue[key].push(cb);
            return;
        }
        expensiveOperation(key, (data) => {
            console.log('expensiveOperation executed');
            memo[key] = data;
            for (let cb of progressQueue[key]) {
                cb(data);
            }
            delete progressQueue[key];
        });
    }
    memoExpensiveOperation('3', (x) => console.log(3, memo));
    memoExpensiveOperation('5', (x) => console.log(5, memo));
    memoExpensiveOperation('3', (x) => console.log(3, memo));
}
// queuedMemo();
//Create a re-usable helper
const useMemoizeAsync = (fn, getKey) => {
    const memo = {};
    const progressQueues = {};
    return function memoized(...allArgs) {
        const cb = allArgs[allArgs.length - 1];
        const args = allArgs.slice(0, -1);
        const key = getKey(...args);
        if (memo.hasOwnProperty(key)) {
            cb(key);
            return;
        }
        if (!progressQueues.hasOwnProperty(key)) {
            progressQueues[key] = [cb];
        }
        else {
            progressQueues[key].push(cb);
            return;
        }
        fn.call(this, ...args, (data) => {
            memo[key] = data;
            for (const cb of progressQueues[key]) {
                cb(data);
            }
            delete progressQueues[key];
        });
    };
};
const memoExpensiveOperation = useMemoizeAsync(expensiveOperation, (x) => x);
//Promises---------------------------------------------------------------------------------------------------------------------
//Let's say we have a function processData(key) which accepts a key as argument and returns a Promise.
//Let's see how it can be memoized.
function processData(key) {
    console.log('expensiveOperation executed');
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        resolve(Number(key) + 7);
        // }, 1000);
    });
}
//Memoizing the underlying promise:
//Simplest way would be to memoize the promise issued against the key.
function memoizeUnderlyingPromise() {
    const memo = {};
    function memoProcessData(key) {
        if (memo.hasOwnProperty(key)) {
            return memo[key];
        }
        memo[key] = processData(key);
        return memo[key];
    }
}
function memoizeValueReturnedByPromise() {
    const memo = {};
    const progressQueues = {};
    function memoProcessData(key) {
        return new Promise((resolve, reject) => {
            console.log('memo', memo);
            console.log('progressQueues', progressQueues);
            if (memo.hasOwnProperty(key)) {
                resolve(memo[key]);
                return;
            }
            if (!progressQueues.hasOwnProperty(key)) {
                progressQueues[key] = [[resolve, reject]];
            }
            else {
                progressQueues[key].push([resolve, reject]);
                return;
            }
            processData(key)
                .then((data) => {
                memo[key] = data;
                for (const [resolver,] of progressQueues[key]) {
                    resolver(data);
                }
            })
                .catch((error) => {
                for (const [, rejector] of progressQueues[key]) {
                    rejector(error);
                }
            })
                .finally(() => {
                delete progressQueues[key];
            });
        });
    }
    memoProcessData('7').then(console.log);
    memoProcessData('9').then(console.log);
    memoProcessData('7').then(console.log);
}
memoizeValueReturnedByPromise();
