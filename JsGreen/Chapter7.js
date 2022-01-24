//------------------------------------------------------------------------------

//伪代码
// p = new Promise((resolve, reject) => {
//     /**... */
// })
// promise2 = p.then(resolved, rejected)

// try {
//     //the result proxy by p
//     if (isRejected(p)) {
//         x2 = rejected(result)
//     } else {
//         x2 = resolved(result)
//     }

//     resolve(x2)
//     resolve(onFulfilled(x)||onRejected(x))
// } catch (e2) {
//     reject(e2)
// }

// var x = new Object()
// var p3 = Promise.resolve()

// p5 = p3.finally((value) => {
//     console.log(typeof value)
//     return 100
// })

// p5.then((value) => {
//     console.log('value saved: ', value === x)
// })

// var p = new Promise((resolve, reject) => {
//     const aRandomValue = Math.random().toFixed(2)
//     if (aRandomValue >= 0.5) {
//         console.log('resolved with message:passed')
//         console.log('aRandomValue is ', aRandomValue)
//         resolve('passed')
//             // resolve()
//     } else {
//         console.log('aRandomValue is ', aRandomValue)
//         console.log('rejected with message:failed')
//         reject('failed')
//             // reject()
//     }
// })

// console.log("I'm p ", p)

// const p2 = p.then(
// (value) => {
//     value = value + ' processed by onFulfilled in then()'
//     console.log(value)
// },
//     null,
//     (reason) => {
//         reason = reason + ' processed by onRejected in then()'
//         console.log(reason)
//     }
// )

// p2.then((value) => console.log(value))

// const resolved = (x) => x
// const rejected = (reason) => console.log('+++++', reason.message)

//rejected & reason = { message: 'REJECTED'}
//没有onRejected函数;状态转为resolved,value为未经onRejected处理的{message: 'REJECTED'}
// const p = Promise.reject({ message: 'REJECTED' })

// console.log('p', p) //rejected

// p2 = p.then(resolved, null)
// p2 = p.then(resolved)
//没有validHandler(rejected),会将rejected的状态和reason一同传给下个promise,
//即会触发下个promise的onRejected函数

// console.log('p2', p2)

//resolved & value = {message: 'REJECTED'}
// p3 = p2.catch(rejected)
// p3 = p2.then(resolved, rejected)

// console.log('p3', p3)

// const newP1 = Promise.resolve(1)

// newP2 = newP1.then((value) => {
//     throw value
//         // return value
// })

// newP3 = newP2.then(
//     (value) => {
//         console.log('value', value)
//     },
//     (reason) => console.error('reason', reason)
// )

// const value = 1

// if (value) {
//     if (value === 1) {
//         throw 0
//     }
// } else {
//     console.log('error')
// }

// console.log('executed to here')

// var x = new Object(),
//     p = Promise.resolve(x),
//     p2 = Promise.resolve(p)

// console.log(p === p2)

// p2.then((value) => console.log(value === x))

// class PromiseEx extends Promise {}

// var x = new Object(),
//     p = PromiseEx.resolve(x),
//     p2 = Promise.resolve(p)

// console.log(p)
// console.log(p2)

// console.log(p === p2)
// p2.then((value) => console.log(value === x))

// function Promise1() {
//     this.a = 1
// }

// const obj1 = new Promise1()
// const obj2 = new Promise1()
// console.log(obj1 === obj2)

// var x = new Object()
// var err = (reason) => console.log('REJECTED reason x: ', reason === x)

// var p = Promise.reject(x)

// console.log(p instanceof Promise)

// Promise.resolve(p).then(console.log).catch(err)

// const p = Promise.resolve('Ok')

// Promise.reject(p).catch((x) => {
//     console.log('[REASON] is ', typeof x)
//     console.log('[REASON] is a promise', x instanceof Promise)
// })

// var elements = [0, 1, 2, 3, p]
// Promise.all(elements).then((value) => console.log(value))

// var elements2 = elements.map((x) => Promise.resolve(x))
// Promise.all(elements2).then((value) => console.log(value))

//----------------------------------------------------------------------------------
// const x = {
//     then: function() {
//         console.log('in thenable object...')
//     },
// }

// const p2 = Promise.resolve(x)

// console.log(p2 === x)

//----------------------------------------------------------------------------------
//.catch()

// function doFulfilledAction() {
//     throw new Error('rejected1!')
// }

// function doRejected() {
//     console.log('rejected2!')
// }

// var x = Promise.resolve()
//     // x.then(doFulfilledAction, doRejected)
// x.then(doFulfilledAction).catch(doRejected)
// x.then(doFulfilledAction2).catch(console.log)

// function doFulfilledAction2() {
//     return Promise.reject('rejected promise!')
// }

//----------------------------------------------------------------------------------
//.finally()

// var x = new Object()
// var p3 = Promise.resolve(x)

// var p5 = p3.finally((value) => {
//     console.log(typeof value)
//     return 100
// })

// p5.then((value) => {
//     console.log('value saved: ', value === x)
// })

// p5 = p3.finally(() => {
//     return Promise.reject('finally rewrite')
// })

// p5.catch((reason) => {
//     console.log(`value overridden: rejected, and reason is <${reason}>`)
// })

//----------------------------------------------------------------------------------

function delay() {
    var time1 = 5000,
        time2 = 1000;

    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('a reason');
            console.log('p2 after rejected', p2);
        }, time1);
    });

    setTimeout(() => {
        const p2 = p.then(
            (x) => x,
            (reason) => reason
        );
        console.log('p2 before rejected', p2);
    }, time2);
}

// delay()

//------------------------------------------------------------------------------------------
//7.2.3 Promise的子类

//Symbol.species
//函数值属性，被构造函数用于创建派生对象

//对构造函数（类）而言，它们的实例对象是他们的实例，由实例对象创建的派生对象是其[Symbol.species]
//属性返回值的实例

//构造函数（类）的默认[Symbol.species]指向其自身，但其子类继承的[Symbol.species]属性也指向
//子类自身

// class Array1 extends Array {
//   static get [Symbol.species]() {
//     return Array1;
//   }
// }

// 原始实例对象
// const b = new Array1(1, 2, 3);

// 原始实例对象的派生对象
// const mapped = b.map((x) => x * x);

// console.log('-------------------------------------------------------');

// console.log(b instanceof Array); //true
// console.log(mapped instanceof Array); //true
// console.log(b instanceof Array1); //true
// console.log(mapped instanceof Array1); //false

//函数值属性
// class aClass {
//   constructor(props) {
//     this.a = props.a;
//     this.b = props.b;
//   }

//   static get staticMethod() {
// console.log("I'm a static method");
//   return 'a static method'
// }

//   method() {
//     console.log("I'm a method,not static");
//   }
// }

// const aObj = new aClass({a:1,b:2});

// console.log(aObj);
// aObj.method()

// console.log(aClass.staticMethod);

// aObj.staticMethod()

//7.2.3.1 由Promise()派生的子类------------------------------------------------------------------------
class MyPromise extends Promise {}

var executor = function(resolve, reject) {
    //...;
};

//p是原始实例对象
const p = new MyPromise(executor);

//p2是派生对象
const p2 = p.then(() => {});

// console.log(Promise[Symbol.species]);
// console.log(MyPromise[Symbol.species]);
// console.log(Promise[Symbol.species] === MyPromise[Symbol.species]);

// console.log('-------------------------------------------------------');

// console.log(p instanceof MyPromise);//true
// console.log(p instanceof Promise);//true
// console.log(p2 instanceof MyPromise);//false
// console.log('5',p2 instanceof MyPromise[Symbol.species]);//false
// console.log(p2 instanceof Promise);//true
// console.log('7',p2 instanceof Promise[Symbol.species]);//true

Promise[Symbol.species] = function() {
    return this;
};

const cls = p.constructor[Symbol.species];

// console.log(Object.getOwnPropertyDescriptor(Promise,Symbol.species));

//7.2.3.2 thenable对象或其子类--------------------------------------------------------------

//x为thenable对象
function sttt() {
    p = Promise.resolve(x);
    //等于
    p = new Promise((...args) => x.then(...args));

    p.then(() => x);
    //等于
    p.then(() => {
        var MyPromiseClass = p.constructor[Symbol.species];
        return new MyPromiseClass((...args) => x.then(...args));
    });
}

function sttt2() {
    const x = {
        then: function() {
            console.log("I'm then() in x");
        },
    };

    const p = Promise.resolve(x);

    const p2 = p.then(() => x);
}

// sttt2()

function sttt3() {
    p.then = function(f) {
        var MyPromiseClass = this.constructor[Symbol.species];
        var thenableObj = f();
        return new MyPromiseClass((resolve) => resolve(thenableObj));
    };
}

//7.2.4 执行逻辑----------------------------------------------------------------------
//7.2.4.1 任务队列
//7.2.4.2 执行栈

//7.3 与其他语言特性的交集------------------------------------------------------------------------------
//生成promise
//1，new Promise/Promise.XXX
//2，异步生成器函数
//3，异步箭头函数

//7.3.1 异步的函数----------------------------------------------------------------
//7.3.1.1 异步函数的引入
function stoo() {
    Promise.all([1, 2, 3]).then(([v1, v2, v3]) => {
        //...
    });

    var pendings = [1, 2, 3].map((x) => Promise.resolve(x));
    Promise.all(pendings).then((values) => {
        let [v1, v2, v3] = values;
        //...
    });
}

function stoo2() {
    var p1 = Promise.resolve(1);

    var expand_v2 = (x) => {
        return x < 9 ? '0' + x : x.toString();
    };

    p1.then(expand_v2)
        .then((v2) => {
            return 'v3: ' + v2;
        })
        .then((v4) => console.log(v4));
}

// stoo2();

async function st003() {
    var p1 = Promise.resolve(1);

    var x = await p1;
    return x < 9 ? '0' + x : x.toString();
}

function stoo4() {
    var p3 = st003()
        .then((v2) => {
            return 'v3: ' + v2;
        })
        .then((v4) => console.log(v4));
}

// stoo4()

//7.3.1.2 异步函数的值

function stot({ x }) {
    console.log(x);
}

function stot1() {
    try {
        stot();
    } catch (e) {
        console.log(e.message);
    }
}

// stot1();

async function stot2({ x }) {
    console.log(x);
}

function stot3() {
    const p = stot2();
    void p.catch(console.log);
}

// stot3()

//7.3.1.3 异步函数中的await

//如果promise是rejected状态，那么await会将reject的原因（reason）作为错误抛出。
//而await抛出错误意味着它将潜在地执行一个类似throw e的操作，其中e是任意值，并且可以被try...catch捕获
async function stot4() {
    var x = Promise.reject('error of promise');

    try {
        var v = await x;
    } catch (e) {
        console.log(typeof e, e);
    }

    return 'Done';
}

// stot4().then(console.log)

//7.3.1.4 异步生成器函数

//一般的生成器函数
function stof() {
    function* myGenerator() {
        yield 10;
        yield 20;
    }

    const tor = myGenerator();

    return tor;
}

//异步生成器函数
function stof2() {
    async function* myAsyncGenerator() {
        yield 10;
        yield 20;
    }

    const tor2 = myAsyncGenerator();

    return tor2;
}

function stof3() {
    const tor2 = stof2();

    const p = tor2.next();

    p.then((result) => {
        console.log(result.value);
    });

    const p2 = tor2.next();

    p2.then((result) => {
        console.log(result.value);
    });
}

// stof3()

function stof4() {
    var all = [];
    var output = () => console.log(all);
    var tor2 = stof2();

    function picker(result) {
        if (result.done) {
            return output();
        }

        all.push(result.value);

        return tor2.next().then(picker);
    }

    tor2.next().then(picker);
}

// stof4()

//10;
//20;

function stof5() {
    const output = (all) => console.log(all);
    const tor2 = stof2(); //IteObj

    async function picker2(tor) {
        const all = [];
        const extract = ({ value, done }) => !done && all.push(value);
        while (extract(await tor.next())); //while(...) = while(...){}
        return all;
    }

    picker2(tor2).then(output);
}

// stof5();

// tor.next() =  {value:new Promise((resolve, reject) =>resolve(10)),done:false}
// extract(await tor.next()) = all.push(10)

//7.3.1.5 异步生成器函数中的await
function stof6() {
    function sleep(tag, n, value) {
        console.log(tag);
        return new Promise((resolve) => setTimeout(() => resolve(value), n));
    }

    async function* myAsyncGenerator() {
        yield sleep('yield 1st', 10000, 'value 1 delay 10s');
        //为了避免多个生成值出现不一致的序列，异步生成器函数使每一个yield附带了一个await运算。
        yield sleep('yield 2nd', 1000, 'value 2 now');
    }

    return myAsyncGenerator();
}

function stof7() {
    const tor = stof6();
    const output = ({ value, done }) => console.log(value);

    let values = [tor.next(), tor.next()];
    // console.log('1st values',values);

    values.forEach((p) => p.then(output));
    // console.log('2nd values',values);
}

// stof7()

//7.3.1.6 异步生成器函数与for await of语句
//异步生成器函数调用生成的异步生成器对象与普通生成器对象不同，
//没有[Symbol.iterator]属性，而是[Symbol.asyncIterator]属性，可以支持for await of语句
function stos() {
    function* myGenerator() {
        yield 10;
        yield 20;
    }

    const tor = myGenerator();

    console.log(Symbol.iterator in myGenerator());

    for (const x of tor) {
        console.log(x);
    }

    async function* myAsyncGenerator() {
        yield 11;
        yield 21;
    }

    const tor2 = myAsyncGenerator();

    console.log(Symbol.iterator in tor2);
    console.log(Symbol.asyncIterator in tor2);

    void(async function() {
        for await (const x of tor2) {
            console.log(x);
        }
    })();
}

// stos();

async function stos2() {
    const promises1 = [Promise.resolve(10), Promise.resolve(20)];

    for await (const x of promises1) {
        console.log(x);
    }

    const values = [11, 21];

    for await (const x of values) {
        console.log(x);
    }
}

// stos2();

//7.3.2 与动态特性的交集---------------------------------------------------------
//7.3.2.1 await在语义上的特点
function stto() {
    const p = Promise.resolve(10);

    p.then((value) => {
        console.log(value * 10);
    });

    async function foo() {
        console.log((await p) * 10);
    }

    const resolveObj = Promise.resolve(new Object());

    async function foo2() {
        console.log((await resolveObj).toString());
    }

    console.log([foo(), foo2()]);
}

// stto();

//7.3.2.2 resolve行为与类型模糊
function sttt() {
    const x = new Promise((resolve, reject) => {});

    const p1 = Promise.resolve(x);

    const p2 = new Promise((resolve, reject) => {
        x.then(resolve, reject);
    });

    const p3 = (async function() {
        return await x;
    })();
}

function sttt2() {
    function sleep(tag, n, value) {
        console.log(tag);
        return new Promise((resolve) => setTimeout(() => resolve(value), n));
    }

    const data = new Object();
    const x = sleep('10s', 10 * 1000, data);
    const p = Promise.resolve(x);

    (async function() {
        console.log((await p) === data);
    })();
}

// sttt2()

function sttt3() {
    class MyPromise extends Promise {}

    const p = Promise.resolve('native promise');
    // const x = MyPromise.resolve(p)

    //等于
    const x2 = new MyPromise((resolve, reject) => p.then(resolve));

    // const x = new Promise((resolve, reject) =>{})
    //或者
    const x3 = new MyPromise((resolve, reject) => {
        p.then(resolve, reject);
    });

    return [x2, x3];
}

// console.log(sttt3());

//7.3.2.3 then方法的动态绑定
function sttt4() {
    let Thenabled = Promise.prototype.then;

    const x = Promise.resolve(100);
    const p = new Promise(Thenabled.bind(x));

    class MyPromise extends Promise {}

    const x2 = MyPromise.resolve(200);
    const p2 = new Promise(Thenabled.bind(x2));

    var internal_handles;

    const p3 = new Promise((...args) => (internal_handles = args));

    const x3 = Promise.resolve(100);

    setTimeout(Thenabled.bind(x3, ...internal_handles), 1000);

    p3.then(console.log);
}

// function sttt5(){
// }

//7.3.2.4 通过接口识别的类型（thenable）

//7.3.2.5 通过动态创建函数来驱动异步特性

//7.3.3 对结构化特性带来的冲击--------------------------------------------------------
//7.3.3.1 对执行逻辑的再造

//7.3.3.2 迟来的finally

//7.3.3.3 new Function()风格的异步函数创建
function sttta() {
    const AsyncFunction = (async(x) => x).constructor;

    console.log(AsyncFunction);

    const foo = new AsyncFunction('x,y,p', 'return x + y + await p');

    foo(1, 2, Promise.resolve(3)).then(console.log);
}

// sttta()

//7.3.3.4 异步方法与存取器
function sttf() {
    class ObjectEx {
        async foo() {
            return 1;
        }

        static async foo() {
            return 2;
        }
    }

    const obj = new ObjectEx();

    const obj2 = {
        async foo() {
            return 3;
        },
    };

    obj.foo().then(console.log);
    obj2.foo().then(console.log);
    ObjectEx.foo().then(console.log);
}

// sttf()