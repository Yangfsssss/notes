// console.log(+'' === 0)

// const odd = 0.01

// let obj1 = { wait: false, pass: false, fail: false, done: false };

// let obj2 = { wait: true };

// console.log(Object.assign(obj1,obj2));
// console.log();

// const addTwoNumbers = (l1, l2) => {
//   let resStr =
//     Number(l1.reverse().join("")) + Number(l2.reverse().join("")) + "";
//   let result = [];
//   for (let i = 0; i < resStr.length; i++) {
//     result[i] = Number(resStr[i]);
//   }
//   return result;
// };

// addTwoNumbers([2, 4, 3], [5, 6, 4]);

// const distanceFormat = (distance,precision)=>{
//   return Math.round(+distance + 'e' + precision) / Math.pow(10, precision);
// }

// const distanceFormat = (number, precision)=> {
//   return Math.round((+number)/1000 + 'e' + precision) / Math.pow(10, precision);
// }

// console.log(distanceFormat(15063.63,2));

// const numberFormat = (arg)=>{
//   return isNumber(arg * 100)
// }

// console.log(typeof 09 === 'number');

// const date = new Date(1621764163000)

// console.log(date);

// class MyClass {
//   constructor(){
//     this.prop = 456
//   }

//   get prop(){
//     return 'I\'m a getter'
//   }

//   set prop(value){
//     console.log('setter: ' + value);
//   }
// }

// let inst = new MyClass();

// console.log(inst.prop);

// inst.prop = 123
// inst.prop

// let list

// let result = list.map(item=>item++)

// console.log(result);

// console.log(window.location);
// console.log(window.history);

//----------------------------------------------------------------------------
// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'http://localhost:3001/api/dailyLearningStuff');

// xhr.addEventListener('progress', (e) => {
//   const { lengthComputable, loaded, total } = e;

//   if (lengthComputable) {
//     console.log(`Downloaded ${loaded} of ${total} (${((loaded / total) * 100).toFixed(2)}%)`);
//   } else {
//     console.log(`Downloaded ${loaded}`);
//   }
// });

// xhr.send();

//-------------------------------------------------------------------------------
// const controller = new AbortController();

// const signal = controller.signal;

// fetch('http://localhost:3001/api/dailyLearningStuff', { signal }).then((res) => console.log(res));

// signal.onabort = () => console.log('aborted');

// setTimeout(()=>controller.abort(),1000)

//--------------------------------------------------------------------------------------
// let total = null;
// let loaded = 0;

// const logProgress = (reader) => {
//   return reader.read().then(({ value, done }) => {
//     if (done) {
//       console.log('Download completed');
//       return;
//     }

//     loaded += value.length;

//     if (total === null) {
//       console.log(`Downloaded ${loaded}`);
//     } else {
//       console.log(`Downloaded ${loaded} of ${total} (${((loaded / total) * 100).toFixed(2)}%)`);
//     }

//     return logProgress(reader);
//   });
// };

// fetch('http://localhost:3001/api/dailyLearningStuff')
//   .then((res) => {
//     total = res.headers.get('content-length');
//     return res.body.getReader();
//   })
//   .then(logProgress);

//-----------------------------------------------------------------------------------------
// let aborter = null;

// const abortHandler = (res) => {
//   const reader = res.body.getReader();

//   const stream = new ReadableStream({
//     strat(controller) {
//       let aborted = false;
//       const push = () => {
//         reader.read().then(({ value, done }) => {
//           if (done) {
//             if (!aborted) {
//               controller.close();
//             }
//             return;
//           }
//           controller.enqueue(value);
//           push();
//         });
//       };

//       (aborter = () => {
//         reader.cancel();
//         controller.error(new Error('Fetch aborted'));
//         aborted = true;
//       }),
//         push();
//     },
//   });

//   return new Response(stream, { headers: res.headers });
// };

// fetch('http://localhost:3001/api/dailyLearningStuff')
//   .then(abortHandler)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
// //   .then(aborter)

// aborter()

//--------------------------------------------------------------------------

// const obj = {
//   key1:'value1',
//   key2:'value2'
// }

// const result = Object.values(obj)

// console.log(result);
// console.log(Array.isArray(result));

//--------------------------------------------------------------------------

// const headers = new Headers();

// console.log(headers);

// const obj = new Object()

// console.log(obj);

//--------------------------------------------------------------------------

// console.log(new Array() instanceof Object);

// console.log(Object.prototype.toString.call(new Object()));
// console.log(Object.prototype.toString.call(new Object()).toLowerCase());

//--------------------------------------------------------------------------

// const data = {
//   a: 'aaa',
//   b: undefined,
//   c: Symbol('dd'),
//   fn: function () {
//     return true;
//   },
//   d: 'ddd',
// };

// console.log(JSON.stringify(data));

// const result2 = JSON.stringify([
//   'aaa',
//   undefined,
//   function aa() {
//     return true;
//   },
//   Symbol('dd'),
//   'eee',
// ]);

// console.log(result2);

//转换值如果有toJSON函数，该函数返回什么值，序列化结果就是什么值，并忽略其他属性的值

// const result3 = JSON.stringify({
//   say: 'hello JSON.stringify',
//   toJSON: function () {
//     return 'today i learn';
//   },
// });

// console.log(result3);

//JSON.stringify会正常序列化Date的值

// const result4 = JSON.stringify({
//   now: new Date(),
// });

// console.log(result4);

/** NaN 和Infinity 格式的数值及null 都会被当作null */

// const resultArray = [JSON.stringify(NaN), JSON.stringify(null), JSON.stringify(Infinity)];

// console.log(resultArray);

/** 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值 */

// const resultArray2 = JSON.stringify([new Number(1), new String('false'), new Boolean(false)]);

// console.log(resultArray2);

/** 其他类型的对象，包括Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性*/

// const result5 = JSON.stringify(
//   Object.create(null, {
//     x: { value: 'json', enumerable: false },
//     y: { value: 'stringify', enumerable: true },
//   })
// );

// console.log(result5);

//-----------------------------------------------------------------------------------------

// const promise = new Promise((resolve, reject) =>{
//   setTimeout(() =>resolve(5),1000)
// })

// promise
//   .then((result) =>result)
//   // .then((result) =>console.log(result))

//   const func = (resolve, reject) =>{
//     setTimeout(() =>resolve(5),1000)
//   }

//   func()

//--------------------------------------------------------------------------

//Generator函数是一个状态机，封装了多个内部状态。
//执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。
//返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。
//Generator函数内部使用yield表达式，定义不同的内部状态
//Generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行

const getData = (cb) => {
  let data;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://localhost:3001/api/basic');

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.responseType = 'json';

  xhr.withCredentials = false;

  // xhr.addEventListener('load', () => {
  //   data = xhr.response;
  // });

  xhr.addEventListener('load', () => cb(xhr.response));

  xhr.send();

  return data;
};

// console.log(getData());

// function* generator() {
//   console.log('1st execution');
//   const data = getData();
//   yield data;

//   console.log('2nd execution');
//   yield 'second';

//   console.log('3rd execution');
//   return 'end';
// }

// const iteObj = generator();

// console.log(iteObj);
// console.log(iteObj.next());
// console.log(iteObj.next());
// console.log(iteObj.next());
// console.log(iteObj.next());
// console.log(iteObj.next());

// let arr = [1, [[2, 3], 4], [5, 6]];

// const flat = function* (a) {
//   const length = a.length;

//   for (let i = 0; i < length; i++) {
//     let item = a[i];

//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   }
// };

// for (let f of flat(arr)) {
//   console.log(f);
// }

// const flatIteObj = flat(arr);

// console.log(flatIteObj.next());
// console.log(flatIteObj.next());
// console.log(flatIteObj.next());

// function* f() {
//   for (let i = 0; true; i++) {
//     let reset = yield i;
//     if (reset) {
//       i = -1;
//     }
//   }
// }

// const fIteObj = f()

// console.log(fIteObj.next());
// console.log(fIteObj.next());
// console.log(fIteObj.next(true));

//i=0,reset = undefined
//i=1,reset = undefined
//reset = true i = -1 i++

// function* foo(x){
//   let y = 2 * (yield (x + 1))
//   let z = yield (y / 3)

//   return (x + y + z)
// }

// let a = foo(5)

// console.log(a.next());//6
// console.log(a.next());//NaN
// console.log(a.next());//NaN

// console.log('-----------------------------------------');
// let b = foo(5)

// console.log(b.next());//6
// console.log(b.next(12));//8
// console.log(b.next(13));//42

// function* dataConsumer(){
//   console.log('Started');
//   console.log(`1. ${yield}`);
//   console.log(`2. ${yield}`);
//   return 'result'
// }

// let genObj = dataConsumer()

// console.log(genObj.next());
//Started

// console.log(genObj.next('a'));

// console.log(genObj.next('b'));

// function wrapper(generatorFunction) {
//   return function(...args){
//     let generatorObj = generatorFunction(...args);
//     generatorObj.next();
//     return generatorObj
//   }
// }

// const wrapped = wrapper(
//   function* (){
//     console.log(`First input: ${yield}`);
//     return 'DONE'
//   }
// )

// wrapped().next('first arg')

// function* foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;

//   return 6;
// }

// for (let v of foo()) {
//   console.log(v);
// }

// function* fibonacci() {
//   let [prev, curr] = [0, 1];
//   for (;;) {
//     yield curr;
//     [prev, curr] = [curr, prev + curr];
//   }
// }

// for (let n of fibonacci()) {
//   if (n > 1000) {
//     break;
//   }
//   console.log(n);
// }

function* main() {
  let result = yield (function () {
    console.log(it);
    getData((res) => it.next(res));
  })();
  console.log(result);
}

let it = main();

// function request() {
//   getData((response)=>it.next(response))
// }
// console.log('before it.next');
// console.log(it);
// it.next();

//yield 作为标记，暂停代码执行；同时作为运算符，执行yield标记后代码或抛出yield标记后的表达式结果（互斥，二选一）
//生成器依靠它首次调用返回的可迭代对象来依次遍历它其中的状态们，遍历操作一定在返回可迭代对象之后，
//所以遍历操作中能够获取到可迭代对象
function* generator() {
  // yield console.log('value');
  yield 1 + 1;

  console.log('over');

  return 'end';
}

const gen = generator();

// console.log(gen.next());
// gen.next()
// console.log(gen.next());

const aFunc = (cb) => {
  // console.log();
  cb();
};

// aFunc()

function anotherFunc() {
  aFunc(() => aValue.next());
}

// anotherFunc()

let aValue = {
  next: () => {
    console.log("I'm next");
  },
};

//IIFE-----------------------------------------------------------------------------------------------

// (function(){
//   console.log('IIFE0')
// })();

// (function () {
// console.log('IIFE1');
// let a = 1
// })();

// var result = (function () {
// var name = 'Barry';
// return name;
//   console.log('IIFE2');
// })();

// (function () {
// var name = "Barry";
// return name;
// console.log('IIFE3');
// })();

// console.log(typeof result);

//for of 消费可迭代对象----------------------------------------------------------------------

// function* forOf(){
//   yield 1
//   yield 2
//   yield 3
//   yield 4
//   yield 5

// return 'end'
// }

// const forOfIteObj = forOf()

// console.log(forOfIteObj.next());
// console.log(forOfIteObj.next());
// console.log(forOfIteObj.next());
// console.log(forOfIteObj.next());
// console.log(forOfIteObj.next());
// console.log(forOfIteObj.next());
// console.log(forOfIteObj.next());

// for(status of forOfIteObj){
//   console.log(status);
// }

//利用for of实现斐波那契数列----------------------------------------------------------------------------

// function* fibonacci() {
//   let [prev, curr] = [0, 1];

//   for (;;) {
//     yield curr;
//     [prev, curr] = [curr, prev + curr]
//   }
// }

// const fiboIteObj = fibonacci();

// for(item of fiboIteObj){
//   if(item > 1000){
//     break
//   }

//   console.log(item);
// }

//为原生对象添加Iterator接口----------------------------------------------------------------------------

// const obj = {
//   key1: 'value1',
//   key2: 'value2',
//   key3: 'value3',
//   key4: 'value4',
//   key5: 'value5',
//   [Symbol('key6')]: 'value6',
// };

//1，用生成器消费obj
function* objectEntries1(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

const objIteObj = objectEntries1(obj);

// for(value of objIteObj){
//   console.log(value);
// }

//2，将生成器置为obj的[Symbol.iterator]属性
function* objectEntries2() {
  let propKeys = Reflect.ownKeys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

obj[Symbol.iterator] = objectEntries2;

// for (value of obj) {
//   console.log(value);
// }

// console.log('------------------------------------------------------------------');

//3,其他消费可迭代对象的方法
function* numbers() {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}

const numbersIteObj = numbers();

//拓展运算符
// console.log([...numbers()]);

//Array.from方法
// console.log(Array.from(numbers()));

//解构赋值
let [x, y] = numbers();
// console.log(x,y);

//Generator.prototype.throw--------------------------------------------------------------------------------
//可迭代对象都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获

// const g = function* () {
//   try {
//     yield;
//   } catch (e) {
//     console.log('内部捕获', e);
//   }
// };

// let i = g();

// i.next();

// try {
// i.throw('a');
// i.throw('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }

// i.throw(new Error('出错了！'))

// const g = function* () {
//   while (true) {
//     try {
//       yield;
//     } catch (e) {
//       if (e !== 'a') {
//         throw e;
//       }
//       console.log('内部捕获', e);
//     }
//   }
// };

// let i = g();

// i.next();

// try {
//   throw new Error('a');
//   throw new Error('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }

//throw方法被捕获之后，会附带执行下一条yield表达式，即会附带执行一次next方法
const gen1 = function* () {
  try {
    yield console.log('a');
  } catch (e) {}

  yield console.log('b');
  yield console.log('c');
};

const g = gen1();

// g.next();
// g.throw();
// g.next();

//若抛出的错误没有被内部捕获，则认为这个Generator运行结束，调用next方法将返回{value:undefined,done:true}
//若抛出的错误没有被内部捕获，但被外部捕获，也认为运行结束
const gen2 = function* () {
  yield console.log('1');
  yield console.log('2');
  yield console.log('3');
};

const g2 = gen2();

// g2.next();

// try {
// g2.throw()
// } catch (e) {
//   console.log('外部捕获');
// }

// g2.next();
// g2.next();
// console.log(g2.next());

//Generator.prototype.return---------------------------------------------------------------------------
//Generator函数返回的可迭代对象，还有一个return()方法，可以返回给定的值，并且终结遍历Generator函数
function* gen3() {
  yield 1;
  yield 2;
  yield 3;
}

const g3 = gen3();

// console.log(g3.next());
// console.log(g3.return('foo'));
// console.log(g3.next());

//如果Generator函数内部有try...finally代码块，且正在执行try代码块，那么return()方法会导致立刻进入
//finall代码块，执行完以后，再返回return()方法指定的值，整个函数才会结束
function* numbers() {
  yield 1;

  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }

  yield 6;
}

const g4 = numbers();
// console.log(g4.next());
// console.log(g4.next());
// console.log(g4.return(7));
// console.log(g4.next());
// console.log(g4.next());

//next()、throw()、return()的共同点
// next()是将yield表达式替换成一个值
//throw()是将yield表达式替换成一个throw语句
//return()是将yield表达式替换成一个return语句

//yield*表达式--------------------------------------------------------------------------------------------
//如果在Generator函数内部，调用另一个Generator函数。需要在前者的函数体内部，自己手动完成遍历
// function* foo() {
//   yield 'a';
//   yield 'b';
// }

// function* bar() {
//   yield 'x';

// for (let i of foo()) {
//   console.log(i);
// }

//   yield* foo();

//   yield 'y';
// }

// for (let v of bar()) {
//   console.log(v);
// }

function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

const outer1IteObj = outer1();

// console.log(outer1IteObj.next().value);
// console.log(outer1IteObj.next().value);
// console.log(outer1IteObj.next().value);

function* outer2() {
  yield 'open';
  yield* inner();
  yield 'close';
}

const outer2IteObj = outer2();

// console.log(outer2IteObj.next().value);
// console.log(outer2IteObj.next().value);
// console.log(outer2IteObj.next().value);

//如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据
function* foo() {
  yield 2;
  yield 3;
  return 'foo';
}

function* bar() {
  yield 1;
  let v = yield* foo();
  console.log('v: ' + v);
  yield 4;
}

const barIteObj = bar();

// console.log(barIteObj.next());
// console.log(barIteObj.next(5));
// console.log(barIteObj.next(6));
// console.log(barIteObj.next(7));
// console.log(barIteObj.next(8));

function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}

function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

// [...logReturned(genFuncWithReturn())]

// console.log([...logReturned(genFuncWithReturn())]);

function* a() {
  yield 1;
  yield 2;
  yield 3;
  return 'The result';
}

// for(let i of a()){
//   console.log(i);
// }

const aIteObj = a();

// console.log(aIteObj.next());
// console.log(aIteObj.next());
// console.log(aIteObj.next());
// console.log(aIteObj.next());
// console.log(aIteObj.next());
// console.log(aIteObj.next());

function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = ['a', ['b', 'c'], ['d', 'e']];

// for (let x of iterTree(tree)) {
//   console.log(x);
// }

// console.log(...iterTree(tree));

//作为对象属性的Generator函数-------------------------------------------------------------------------------
let obj1 = {
  *myGeneratorMethod() {},
};

let obj2 = {
  myGeneratorMethod: function* () {},
};

//Generator函数的this--------------------------------------------------------------------------------------------
//Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，
//也继承了Generator函数的prototype对象上的方法
function* gx() {}

gx.prototype.hello = function () {
  return 'hi!';
};

let objx = gx();

objx instanceof gx;
// console.log(objx.hello());

//使Generator函数返回一个正常的实例，既可以使用next方法，又可以获得正常的this
function* geny() {
  this.a = 1;
  yield (this.b = 2);
  yield (this.c = 3);
}

let objy = {};

// let f = F.call(objy);

function F() {
  return geny.call(geny.prototype);
}

let f = new F();

// console.log(f.next());
// console.log(f.next());
// console.log(f.next());

// console.log(objy.a);
// console.log(objy.b);
// console.log(objy.c);

// console.log(f.a);
// console.log(f.b);
// console.log(f.c);

//Generator与状态机-----------------------------------------------------------------------
function* generator() {
  while (true) {
    console.log('tick');
    yield;
    console.log('tock');
    yield;
  }
}

const iteObj = generator();

// iteObj.next();
// iteObj.next();
// iteObj.next();
// iteObj.next();
// iteObj.next();
// iteObj.next();
// iteObj.next();
// iteObj.next();

//Generator函数的异步应用--------------------------------------------------------------------
function* getGen() {
  const url = 'http://localhost:3001/api/dailyLearningStuff';
  const result = yield fetch(url);

  console.log('result', result);
}

// const gz = getGen();
// const result = gz.next();
// console.log(result.value);
// result.value.then(value =>console.log(value))
// result.value
//   .then(function (data) {
//       console.log(result);
//       return data.json();
//     })
//   .then(function(data){
//     gz.next(data);
//   })

//JS中的Thunk函数

//针对某个参数的Thunk
const aThunk = function (fileName) {
  return function (cb) {
    return fs.readFile(fileName, cb);
  };
};

//运行，置入参数，得到Thunkify形式的待用函数
// const readFileThunk = aThunk(fileName);

//使用
// readFileThunk(cb);

//Thunk函数转换器

//ES5
const Thunk1 = function (fn) {
  return function () {
    const args = Array.prototype.slice.call(arguments);
    return function (cb) {
      args.push(cb);
      return fn.apply(this, args);
    };
  };
};

//ES6
const Thunk2 = function (fn) {
  return function (...args) {
    return function (cb) {
      return fn.call(this, ...args, cb);
    };
  };
};

// const readFileThunk2 = Thunk(fs.readFile);

// readFileThunk2(fileA)(cb)

function ff(a, cb) {
  cb(a);
}

const ft = Thunk2(ff);

// ft(2)(console.log)

//Generator函数的流程管理---------------------------------------------------------------
function* genz() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  yield 6;
}

// const genzIO = genz()

// let res = genzIO.next()

// while (!res.done) {
//   console.log(res.value);
//   res = genzIO.next();
// }

// const genj = function*() {
// const r1 = yield fetch('http://localhost:3001/api/dailyLearningStuff')
// const r1 = yield

// function(cb) {
//     console.log('r1 executed')
//     cb()
// }

// console.log(r1)

// const r2 = yield fetch('http://localhost:3001/api/basic')
//     const r2 = yield

//     function(cb) {
//         console.log('r2 executed')
//         cb()
//     }

//     console.log(r2)
// }

// const genjIO = genj()

// const e1 = genjIO.next();

// console.log('value',e1.value);

// e1.value(function (err, data) {
//   if (err) {
//     throw err;
//   }

//   const e2 = genjIO.next(data);

//   e2.value(function (err, data) {
//     if (err) {
//       throw err;
//     }

//     genjIO.next(data);
//   });
// });

// const obj5 = {
//   key1: 'value1',
//   key2: 'value2',
//   key3: 'value3',
// }

// console.log(...obj5);

//Promise继发
function logInOrder(urls) {
  const textPromises = urls.map((url) => {
    return fetch(url).then((response) => response.text());
  });

  textPromises.reduce((chain, textPromises) => {
    return chain.then(() => textPromises).then((text) => console.log(text));
  }, Promise.resolve());
}

//async继发
async function logInOrder2(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}

//async并发
async function logInOrder3(urls) {
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url);
    return response.text();
  });

  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}

//-----------------------------------------------------------------------
//No.160
const list = [1, 2, 3];

//返回一个1s后resolve的promise，值为参数的平方
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

// function test() {
//   list.forEach(async x=> {
//     const res = await square(x)
//     console.log(res)
//   })
// }

//forEach默认并行执行，无法实现串行 ×
// function test() {
//   list.forEach((x) => {
//     const res = await square(x);
//     console.log(res);
//   });
// }

//异步函数串行执行 √
// async function test() {
//   for (const x of list) {
//     const res = await square(x);
//     console.log(res);
//   }
// }

//promise的链式调用 √
let promise = Promise.resolve();

function test(i = 0) {
  if (i === list.length) {
    return;
  }

  promise = promise.then(() => square(list[i]).then((i) => console.log(i)));

  test(i + 1);
}

// test();
//1s后打印1,4,9

//-------------------------------------------------------------------------------------------
//No.159 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
Promise.retry = function (fn, times, i = 0, ...args) {
  let p = Promise.resolve(fn(...args));

  if (i >= times) {
    return p.catch((reason) => console.log(reason));
  }

  p.then(
    (value) => console.log(value),
    (reason) => {
      i++;
      Promise.retry(fn, times, i, ...args);
    }
  );
};

function test1(x) {
  return Promise.reject(x);
}

// Promise.retry(test1, 3,0, 555);

// async function asyncFunc(){
//   console.log('executed!');
// }

// Promise.resolve(asyncFunc)

Promise.retry2 = function (fn, times, ...args) {
  const fnArray = Array(times).fill(fn(...args));

  Promise.any(fnArray).then(
    (value) => console.log(value),
    (reasons) => console.log(reasons)
  );
};

// Promise.retry2(test1,10,'error')

// console.log(Promise.any);

//-------------------------------------------------------------------------------------------------
Array.prototype.splice = function () {};

//-----------------------------------------------------------------------------------
// flex:flex-grow flex-shrink flex-basis
// flex-grow:将父元素的剩余空间按子元素flex-grow值的比例分配，值越大，分配越多
// flex-shrink:若子元素占用空间之和大于父元素，则将子元素按其flex-shrink值缩小，值越大，缩小越多
// flex-basis:指定元素在主轴方向上的初始大小，优先级大于width或height
// 占用空间为宽还是高由flex-direction决定

//---------------------------------------------------------------------------------------
//No.153 实现一个批量请求函数 multiRequest(urls, maxNum)
//要求如下：
//要求最大并发数 maxNum
//每当有一个请求返回，就留下一个空位，可以增加新的请求
//所有请求完成后，结果按照 urls 里面的顺序依次打出

//--------------------------------------------------------------------------------------------------

// console.log(true+false);

const baseUrl = 'http://localhost:3001/api';

// const getRecords = async (cb) => {
//   let res = await fetch(`${baseUrl}/basic`);

//   let result = await res.json();

//   cb(result);

//   return result;
// };

function* getRecords(cb) {
  const res = yield fetch(`${baseUrl}/basic`);

  // let result

  // res.then(value=>result = value)

  // cb(result);

  // return result;
}

function* handleFetchRecords() {
  try {
    console.log('start');
    const data = yield getRecords((response) => hanIO.next(response));
    console.log('recordsData', data);
    return data;
  } catch (e) {}
}

// const hanIO = handleFetchRecords();//①

// const getIO = hanIO.next().value//②

// const recordsPromise = getIO.next().value//③

// const result = hanIO.next(recordsPromise).value//④

// let res2;

// result.then(value => value.json().then(value=>console.log(value)))

// console.log(res2);

// console.log(result.then(value=>value));

// console.log('round1Result: getIO',round1Result);

// let getResult

// round1Result.next().value.then(value => console.log(value.json().then(value=>getResult = value)));

// console.log('round1Result.next():getIO.next()-1',round1Result.next().value.then(value => value.json().then(value=>console.log(value))));
// console.log('round1Result.next():getIO.next()-2',round1Result.next().value);
// //getIO

// console.log(hanIO.next());

// const map = new Map('1','2');

// console.log(map);

// const p1  = new Promise((resolve, reject) =>{
//   for(let i = 0; i < 1000000000;i++){
//     if(Math.random().toFixed(2) === odd){
//       resolve(i)
//     }
//   }

// reject()
// })

// p1.then((i) => {
//   console.log(i);
// })

// p1.catch(err => {
//   console.log(err);
// })

// console.log(Math.random().toFixed(2));

// let delayResolve
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
// class MyPromise extends Promise {}

// var executor = function (resolve, reject) {
//...;
// };

//p是原始实例对象
// const p = new MyPromise(executor);

//p2是派生对象
// const p2 = p.then(() => {});

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

// Promise[Symbol.species] = function () {
// 	return this;
// };

// const cls = p.constructor[Symbol.species];

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
    then: function () {
      console.log("I'm then() in x");
    },
  };

  const p = Promise.resolve(x);

  const p2 = p.then(() => x);
}

// sttt2()

function sttt3() {
  p.then = function (f) {
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

  void (async function () {
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

  const p3 = (async function () {
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

  (async function () {
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
  const AsyncFunction = (async (x) => x).constructor;

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

// console.log(new Date(1626246647000));

// console.log(![])
// console.log(Boolean(![]))
// console.log(Boolean(undefined))
// console.log(Boolean(null))
// console.log(typeof [].toString())
// console.log('' == false)
// console.log(Boolean(''))
// console.log(Boolean(NaN))

// console.log([] == ![])
// console.log([] == false)
// console.log(Boolean([].toString()) == false)

//"!"运算等于Boolean()方法并取反
//'',undefined,null,Nan 使用Boolean()方法转换的布尔值为false
//"[]"是引用类型，参与"=="运算时会调用toString()方法转换为值类型，其值为''（空字符串）

function returnInThenFunc() {
  const p = Promise.resolve('ok');

  p.then((value) => {
    console.log('resolved value is ' + value);
    return 'okkk';
  }).then((value2) => {
    console.log('my value is ' + value2);
  });
}

// returnInThenFunc()

function AsPrototype() {
  const A = {};

  console.log(A instanceof Object);
}

// AsPrototype()

function sliceCallTypedArray() {
  const result = [].slice.call(arguments);

  console.log(arguments);
  console.log(Array.isArray(arguments));
  console.log(result);
  console.log(Array.isArray(result));
}

// sliceCallTypedArray(1,2,3,4,5,6,7)

// console.log(Number('-300'));

function functionDeclareOrder() {
  function a() {
    console.log("I'm firstly declared");
  }

  function a() {
    console.log("I'm secondly declared");
  }

  a();
}

// functionDeclareOrder()

function b() {
  console.log("I'm firstly declared");
}

function b() {
  console.log("I'm secondly declared");
}

// b()
function aPromise() {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('outer reject');
    }, 2000);
  })
    .then((res) => {
      if (res) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('inner reject');
          }, 2000);
        }).then((res) => console.log(res));
        // .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

//什么是回调函数（callback）？-----------------------------------------------------
//不由用户代码执行的函数为回调函数
//例如：setTimeout(fn,delay)中的fn
//            new Promise(executor)中的executor

//Understanding the function equality check
function understandTheFunctionEqualityCheck() {
  function factory() {
    return (a, b) => a + b;
  }

  const sum1 = factory();
  const sum2 = factory();

  sum1(1, 2);
  sum2(1, 2);

  //factory运行一次返回一个引用类型的值，储存在某一位置
  //factory再运行一次返回另一个引用类型的值，储存在另一位置
  //这两个值显然不相等，实质是储存值的内存地址不同
  //在JavaScript中，一个对象只会与它自己相等
  console.log(sum1 === sum2);
  console.log(sum1 === sum1);
}

// understandTheFunctionEqualityCheck();

function thePurposeOfUseCallback() {
  //需要持久化的函数实例的场景
  //1，一个被useMemo包裹的函数组件，需要一个函数入参
  //2，其他hooks需要一个函数形式的依赖
  //3，函数拥有自己的内部状态，比如闭包
}

function aGoodUseCase() {
  //将函数、组件依赖的变量分离，设为useCallback的依赖项
  //将不变的DOM和处理逻辑用Memo包裹
  //
}

function aBadUseCase() {
  //useCallback在每次re-render时都会执行
  //即每次re-render，useCallback都会花费一定的开销去创建持久化的函数实例
  //当每次useCallback创建一个持久化的函数实例的开销大于
  //每次re-render直接创建新函数实例时，使用useCallback没有意义
}

function summary() {
  //优化操作会增加复杂度
  //优化过的代码可能会更改多次，任何过早的优化都有风险
  //useCallback适用于缓存很重的子组件
  //权衡优化的效果与增加的复杂度
}

//How to Memoize with React.useMemo()------------------------------------------
function useMemoHook() {
  //useMemo(compute,dependencies)
  //在第一次render时，useMemo会执行compute函数，返回并缓存执行结果
  //①在之后的re-render中，如果dependencies没有变化，useMemo不会执行
  //compute函数，并返回之前缓存的结果
  //②在之后的re-render中，如果dependencies有变化，useMemo会重新执行
  //compute函数，返回并重新缓存执行结果
}

function anUseMemoExample() {
  //结果同上
}

function useMemoVsUseCallback() {
  //useCallback在每次re-render时会根据deps的变化与否来判断
  //是否创建一个持久化的函数实例以供使用
  //useMemo在每次re-render时会根据deps的变化与否来判断
  //是否执行被其包裹的函数以获得并缓存新的计算结果以供使用
  //事实上一个持久化的函数实例也是一个计算结果，所以有
  //useCallback(fn,deps) === useMemo(()=>fn,deps)
  //亦即useCallback是useMemo的一个特殊形式
}

function useMemoizationWithCare() {
  //权衡优化的效果与开销
}

function conclusion() {
  //useMemo用来缓存昂贵的计算结果
}

function test() {
  const a = void 0;

  const b = a && '';
  const c = a || '';

  console.log(b);
  console.log(c);

  const d = true;

  const e = d && '';
  const f = d || '';

  console.log(e);
  console.log(f);
}

// test();

// const result = ['1','2'].join(',')

// console.log(result);

function methods() {
  let ary = ['1', '2', '3', '4', '5'];

  // const splice = Array.prototype.splice;

  //从第arguments[0]位开始删除（包括arguments[0]位），删除arguments[1]个元素
  ary.splice(2, 1);

  console.log(ary);

  const split = String.prototype.split;

  const shift = Array.prototype.shift;

  const unshift = Array.prototype.unshift;

  const join = Array.prototype.join;

  const slice = Array.prototype.slice;
}

// methods();

// const ary = [1,2,3,4,5]

// ary.splice(2,1)

// console.log(ary);

/** 测试hook的返回格式 */
function test0902() {
  const returnedArrayAndObjectTest = () => {
    const value1 = 1;
    const value2 = 3;

    const funcInArray = () => {
      value1 += 1;
    };

    // return [value1, value2, funcInArray];
    // 等于
    // return { 0: value1, 1: value2, 2: funcInArray };
    // 等于
    return { value1: value1, value2: value2, funcInArray: funcInArray };
  };

  // const [v1, v2, func] = returnedArrayAndObjectTest();
  // 等于
  // const { 0: v1, 1: v2, 2: func } = returnedArrayAndObjectTest();
  //等于
  const { v1, v2, func } = returnedArrayAndObjectTest();

  console.log(v1, v2, func);
}

/** 测试while循环中return的效果 */
//执行return语句后会退出while循环
function whileTest() {
  let i = 0;

  while (i < 10) {
    i++;

    if (i === 8) {
      return 'return';
    }

    console.log(i);
  }
}

// whileTest();

/** 测试if语句中表达式的执行效果 */
function expressionInIf() {
  let obj = {
    aProperty: '888',
  };

  Object.defineProperty(obj, 'aProperty', { configurable: false });

  if (!Reflect.deleteProperty(obj, 'aProperty')) {
    console.log('cannot be deleted');
  }

  console.log(obj);
}

// expressionInIf();

/** 测试Reflect.deleteProperty遍历原型删除属性是否会被
 * configurable-false属性阻断
 */
function deleteProperty() {
  var getPropertyOwner = function f(obj, key) {
    return !obj ? null : obj.hasOwnProperty(key) ? obj : f(Object.getPrototypeOf(obj), key);
  };

  //原型链：instanceL1---classL1---protoL1---classL2---protoL2---classL3---protoL3---classL4--protoL4
  const protoL4 = {};
  const protoL3 = Object.create(protoL4);
  const protoL2 = Object.create(protoL3);
  const protoL1 = Object.create(protoL2);

  protoL4.aProperty = '888';
  protoL3.aProperty = '777';
  protoL2.aProperty = '666';
  protoL1.aProperty = '555';

  function deleteP(obj, key) {
    if (!(key in obj)) {
      console.log('key not in obj');
      return false;
    }

    while ((obj = getPropertyOwner(obj, key))) {
      if (!Reflect.deleteProperty(obj, key)) {
        console.log('interrupted');
        return false;
      }
    }

    return true;
  }

  console.log(protoL1.aProperty);

  Object.defineProperty(protoL3, 'aProperty', { configurable: false });

  deleteP(protoL1, 'aProperty');

  console.log(protoL1.aProperty);
  console.log(protoL2.aProperty);
  console.log(protoL3.aProperty);
  console.log(protoL4.aProperty);
}

// deleteProperty();

/** 测试toFixed()四舍五入问题 */
//fixed()方法先将
function toFixed() {
  let n1 = 20.222;
  let n2 = 20.333;

  let n3 = 20.444;
  let n4 = 20.888;

  const add = (n1, n2) => {
    return n1 + n2;
  };

  console.log(add(n1, n2).toFixed(2));
  console.log(add(n3, n4).toFixed(2));
}

// toFixed();

// console.log(0.1 + 0.2);

//前端核心原则
function keyPrinciple() {
  const UI1 = f(data1);
  const UI2 = f(data2);
  const UI3 = f(data3);
  const UI4 = f(data4);
  const UI5 = f(data5);
  const UI6 = f(data6);
  //...
  const UIn = f(datan);
}

/** 引用的动态取值 */
function dynamicProperty() {
  const objFunc = () => {
    const obj = {
      aKey: 'value1',
    };

    const changeObj = () => {
      obj.aKey = 'value2';
    };

    return {
      changeObj,
      check: obj.aKey === 'value1',
      obj,
    };
  };

  const { check, changeObj, obj } = objFunc();
  const returnedObj = objFunc();

  // console.log(check, obj);
  // console.log(returnedObj.check, obj);
  console.log(returnedObj);

  returnedObj.changeObj();

  // console.log(check, obj);
  // console.log(returnedObj.check, obj);
  console.log(returnedObj);
}

// dynamicProperty();

// console.log(Number(NaN + 1));

const num = Number((Number('2,246') + Number('1,045')).toFixed(2));

// console.log(num);

const changeObjKey = (ary) => {
  ary.forEach((item) => {
    item.value = item.areaCode;
    item.label = item.areaName;

    if (item.childList) {
      item.children = item.childList;
      changeObjKey(item.childList);
    }
  });

  return ary;
};

/** 测试Promise和async函数中的错误处理 */
//1，在then链中，用catch捕获错误
//2，在async函数中，用try...catch捕获错误
//3，try...catch不能捕获rejected的promise
//4，但是在async函数中可以在await后使用.catch捕获错误
async function testThrowErrorByPromiseInTryCatch() {
  // Promise.reject('1st error').catch(console.log);
  // Promise.reject('1st error').then(null, console.log);

  // try {
  const res = await Promise.reject('2nd error').catch(console.log);
  console.log('res', res);
  // const res = await new Error('2nd error');
  // throw new Error('2nd error');
  // 	Promise.reject('2st error');
  // } catch (e) {
  // 	console.log('errorLog', e);
  // }
}

// testThrowErrorByPromiseInTryCatch();

// console.log(Date.str(1631011960000));
function downloadFile(content, fileName) {
  //下载base64图片
  var base64ToBlob = function (code) {
    let parts = code.split(';base64,');
    console.log('parts', parts);

    let contentType = parts[0].split(':')[1];
    console.log('contentType', contentType);

    let raw = window.atob(parts[1]);
    console.log('raw', raw);

    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    console.log('uInt8Array', uInt8Array);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: contentType,
    });
  };

  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); //new Blob([content]);
  let evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
}

// downloadFile(base64Img);

function useState(initial) {
  const hook = {
    state: initial,
    queue: [],
  };

  const actions = [];

  const setState = (action) => {
    hook.queue.push(action);

    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);

  hookIndex++;

  return [hook.state, setState];
}

// Promise.resolve(1).then(()=>{}).catch()
// var myValue = '4';

// 即使是同一函数，其引用形式不同导致的调用方式不同也会影响传入其中的this
function testThisInDifferentRefsWithTheSameFunction() {
  this.myValue = '6';

  const obj = {
    myValue: '3',
    myFunc() {
      console.log('this in myFunc', this);
      console.log(this.myValue);
    },
  };

  obj.myFunc(); // this指向obj

  const f = obj.myFunc;

  f(); // this指向window
  // console.log(window.myValue);
}

// testThisInDifferentRefsWithTheSameFunction();

function thisInConstructorClass() {
  this.id = 'id in window';

  class C {
    constructor(id) {
      this.id = id;
    }

    get foo() {
      return function () {
        console.log(this.id);
      };
    }
  }

  C.id = 'id in C';

  Object.defineProperty(D, 'foo', {
    get() {
      return function () {
        console.log(this.id);
      };
    },
  });

  console.log(C);

  new C().foo();
  const f = new C().foo;
  f();
}

// thisInConstructorClass();

function thisInConstructorFunc() {
  this.id = 'id in window';

  function D() {
    this.id = id;
  }

  D.id = 'id in D';

  Object.defineProperty(D.prototype, 'foo', {
    get() {
      return function () {
        console.log(this.id);
      };
    },
  });

  console.log(D);

  new D().foo();
  const g = new D().foo;
  g();
}

// thisInConstructorFunc();

// dermacare shampoo for dry scalp coconut & hydration anti-dandruff shampoo
// const aaa = !null && 2
// console.log(aaa);

async function testAsyncSequenceTasks() {
  const taskSequence = (function () {
    return [
      () => setTimeout(() => console.log(1), 4000),
      () => setTimeout(() => console.log(2), 3000),
      () => setTimeout(() => console.log(3), 2000),
      () => setTimeout(() => console.log(4), 1000),
    ];
  })();

  for await (const task of taskSequence) {
    task();
  }
}

// testAsyncSequenceTasks();

function testAsyncSequenceTasks1() {
  const taskSequence = (async function* () {
    yield new Promise((resolve) => {
      setTimeout(resolve, 4000);
    }).then(() => console.log(1));

    yield new Promise((resolve) => {
      setTimeout(resolve, 3000);
    }).then(() => console.log(2));

    yield new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => console.log(3));

    yield new Promise((resolve) => {
      setTimeout(resolve, 1000);
    }).then(() => console.log(4));
    // yield () => setTimeout(() => console.log(1), 1000);
    // yield () => setTimeout(() => console.log(2), 1000);
    // yield () => setTimeout(() => console.log(3), 1000);
    // yield () => setTimeout(() => console.log(4), 1000);
  })();

  (async function () {
    for await (const task of taskSequence) {
      // task();
    }
  })();
}

// testAsyncSequenceTasks1();

//----------------------------------------------------------------------------------------
function testErrorInOnfulfilled() {
  const p = Promise.resolve(3);

  const onFulfilled = () => {
    throw new Error('error in onFulfilled');
  };

  const onRejected = (error) => {
    console.log('error caught', error);
  };

  p.then(onFulfilled, onRejected).catch((error) => console.log('error caught again', error));
}

// testErrorInOnfulfilled();

//----------------------------------------------------------------------------------------
function testDeleteRefsAndValuesInObj() {
  const obj = {
    key1: 'value1',
    key2: 'value2',
  };

  delete obj.key1;
  console.log('obj1', obj);

  delete obj['key2'];
  console.log('obj2', obj);

  const ary = ['x', 'y'];

  delete ary[0];
  console.log('ary1', ary);

  const y = ary.pop();
  ary.push('y');
  console.log('ary2', ary);
  // delete y;
  console.log('ary3', ary);
}

// testDeleteRefsAndValuesInObj();

//----------------------------------------------------------------------------------------
Function.prototype.log = function (...args) {
  console.log(this(...args));
};

Array.prototype.log = function () {
  console.log(this);
};

/** 实现一个map */
function implementAMap() {
  const array = [1, 2, 3];

  const mappedArray = array.map((item, index, array) => {
    return [item + 1, index, array];
  });

  mappedArray.log();
  array.log();

  Array.prototype.map1 = function (cb, thisArg) {
    let result = [];

    for (const currentValue of this) {
      result.push(cb.call(thisArg, currentValue, this.indexOf(currentValue), this));
    }

    return result;
  };

  const mappedArray1 = array.map1((item, index, array) => {
    item++;
    array = [2, 3, 4];
    return [item + 1, index, array];
  });

  mappedArray1.log();
  array.log();
}

// implementAMap()

//----------------------------------------------------------------------------------------
function square1(n) {
  let k = 0;

  while (true) {
    // console.log(k);
    // console.log(n*n);

    if (k === n * n) {
      return k;
    }

    k++;
  }
}

// square1.log(9)

//----------------------------------------------------------------------------------------
/** 处理金额携带2位小数时的精度问题 */
function testAccuracy() {
  // console.log(1029.6 * 100);

  console.log(Number.parseInt(1029.61 * 100, 10));
  // console.log(parseFloat(1029.62 * 100));
  // console.log(parseFloat(1029.63 * 100));
  // console.log(parseFloat(1029.64 * 100));
  console.log(parseFloat(1029.61 * 100).toFixed(10));
  // console.log(parseFloat(1029.62 * 100).toFixed(10));
  // console.log(parseFloat(1029.63 * 100).toFixed(2));
  // console.log(parseFloat(1029.64 * 100).toFixed(2));
}

// testAccuracy.log()

//----------------------------------------------------------------------------------------
/** 广度优先遍历 */
//1---2(2-1,2-2)---3(3-1,3-2(3-2-1,3-2-2),3-3)---4(4-1(4-1-1,4-1-2),4-2)---5(5-1)---
// function bfs(){
//   const targetObj = {
//     Key1:{
//       parent: targetObj,
//       value:1,
//       children:[]
//     },
//     Key2:{
//       parent: targetObj,
//       value:2,
//       children:[
//         {
//           parent: key2,
//           value:21,
//           children:[]
//         },
//         {
//           parent: key2,
//           value:22,
//           children:[]
//         },
//       ]
//     },
//     Key3:{
//       parent: targetObj,
//       value:3,
//       children:[
//         {
//           parent: key3,
//           value:31,
//           children:[]
//         },
//         {
//           parent: key3,
//           value:32,
//           children:[
//             {
//               parent: key32,
//               value:321,
//               children:[]
//             }
//           ]
//         },
//         {
//           parent: key3,
//           value:33,
//           children:[]
//         },
//       ]
//     },
//   };

//   const resultObj = {};

//   const valueAry = [];
//   function copy(result = {},target){
//     if(target.children.length === 0){
//       return result;
//     }

//     for(const key of Object.keys(target)){
//       result[key] = target[key];
//       valueAry.push(target[key].value);
//     }

//     copy(result, target.children);
//   }

// }
function testSimpleCopy() {
  function simpleCopy(target) {
    let obj = {};

    for (const key of Object.keys(target)) {
      obj[key] = target[key];
    }

    // obj.complexValue = target.complexValue

    // console.log(obj.complexValue === target.complexValue);

    return obj;
  }

  const obj = {
    simpleValue: 3,
    complexValue: {
      key: 'value',
    },
  };

  const resultObj = simpleCopy(obj);

  // return [resultObj, obj];
  return resultObj;
}

// testSimpleCopy.log()

function testObjValue() {
  const obj = {
    simpleValue: 3,
    complexValue: {
      key: 'value',
    },
  };

  const obj1 = {
    simpleValue: 4,
    complexValue: obj.complexValue,
  };

  const obj2 = {
    simpleValue: 5,
    complexValue: obj.complexValue,
  };

  obj1.complexValue.key = 'newValue';

  console.log(obj1);
  console.log(obj2);

  console.log(obj1.complexValue === obj2.complexValue);
}

// testObjValue();

function testRefsValueInSwitch() {
  const obj1 = {
    key1: 'value1',
    key11: 'value11',
  };

  const obj2 = {
    key2: 'value2',
    key22: 'value22',
  };

  function switchObj(obj) {
    switch (obj) {
      case { key1: 'value1', key11: 'value11' }: {
        return 1;
      }
      case { key2: 'value2', key22: 'value22' }: {
        return 2;
      }
      default:
        break;
    }
  }

  console.log(switchObj(obj1));
  switchObj.log(obj2);
}

// testRefsValueInSwitch()

//------------------------------------------------------------------------------------------------------
//在then链中，then函数总是返回新的promise对象，其维护的值x只与链上每个then函数的
//onFulfilled/onRejected处理函数有关，两者是独立的
function testRegularValueReturnedInThenFunc() {
  const p = Promise.resolve(3);

  const p2 = p.then((res) => res);

  p2.then((res) => console.log(res instanceof Promise, typeof res));
}

// testRegularValueReturnedInThenFunc()

//------------------------------------------------------------------------------------------------------
//HTTP 204 No Content 成功状态响应码，表示该请求已经成功了，
//但是客户端客户不需要离开当前页面。
//默认情况下 204 响应是可缓存的。一个 ETag 标头包含在此类响应中。
//使用惯例是，在 PUT 请求中进行资源更新，但是不需要改变当前展示给用户的页面，
//那么返回 204 No Content。如果创建了资源，则返回 201 Created 。
//如果应将页面更改为新更新的页面，则应改用 200 。
function testReadableStreamInFetch() {
  // fetch('https://lf3-static.bytednsdoc.com/obj/eden-cn/beeh7uvzhq/users.json')
  fetch('http://localhost:3001/api/mockedApi/testReadableStreamInFetch', { method: 'POST' }).then((res) => {
    const { status } = res;

    if (status === 204) {
      // console.log(res);
      console.log(res.json());
    }

    if (status === 200) {
      console.log(res.json());
    }
  });
}

// testReadableStreamInFetch()

//------------------------------------------------------------------------------------------------------
//在异步函数中，返回值分3类：
//1，未指定返回值，异步函数返回状态为resolved,值为undefined的promise
//2，返回值不为promise，异步函数返回状态为resolved,值为指定的返回值的promise
//3，返回值为promise，异步函数不做处理，原样返回promise
async function testPromiseReturnedInAsyncFunc() {
  const result = await fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
  console.log(await result.json());
  // return Promise.resolve(1)
}

// testPromiseReturnedInAsyncFunc.log()

//------------------------------------------------------------------------------------------------------
//构造函数一般不指定返回值，使用new运算符调用时，默认返回其实例
//若指定返回值，当返回值为原始值时，仍然返回其实例
//当返回值为引用类型值时，用该值代替其实例返回
function testValuesReturnedInConsFn() {
  function AConsFn(props) {
    this.a = props.a;

    return () => {};
  }

  const value = new AConsFn({ a: 7 });

  return value;
}

// testValuesReturnedInConsFn.log()

//------------------------------------------------------------------------------------------------------
function testSwitchARejectedPromiseToResolved() {
  const p1 = Promise.reject(3).catch((x) => Promise.resolve(x));

  return p1;
}

// testSwitchARejectedPromiseToResolved()

function awaitWrapper(promise) {
  if (!(promise instanceof Promise)) {
    return promise;
  }

  //onRejected响应函数执行完毕后会隐式执行待返回的promise的resolve()方法
  //即rejected状态的promise被then中的onRejected响应后，then返回的下一个promise
  //状态是resolved

  //但finally()方法不会执行该步骤，它返回的新promise会继承其链中上一个promise
  //的状态和值

  // return promise.finally(x=>Promise.resolve(x))
  return promise.catch((x) => Promise.resolve(x));
}

async function testAwaitWrapper() {
  const p = Promise.reject(3);

  console.log('before p');
  // const result = await p;
  const result = await awaitWrapper(p);
  console.log('after p');

  console.log(result);

  return result;
}

// testAwaitWrapper()

//------------------------------------------------------------------------------------------------------
function testFunctionNamesAndPropertyNames() {
  var b = 30;
  // let b = 30;
  function b() {}

  console.log(b);
}

// testFunctionNamesAndPropertyNames()

//------------------------------------------------------------------------------------------------------
function testDotOperator() {
  let a = {};
  a.x = 5;
  console.log(a);
  console.log(a.x);

  let b = 3;
  b.y;
  console.log(b);
}

// testDotOperator();

//------------------------------------------------------------------------------------------------------
function testContinualEqualOperator() {
  let a = { x: 3 };
  let b = 8;
  let c = 123;

  a.y = b = c;

  console.log('a', a);
  console.log('b', b);
  console.log('c', c);
}

// testContinualEqualOperator()

//------------------------------------------------------------------------------------------------------
function testRefsPosition() {
  let a = { a: 3 };
  let b = (a.x = { b: 4 });
  let c = a;

  a = { x: 7 };

  console.log(a.x);
  console.log(b);
  console.log(c);
}

// testRefsPosition()

//------------------------------------------------------------------------------------------------------
function testArrayConsFunc() {
  const ary = [1, 2, 3];

  const ary2 = new Array(ary);

  console.log('ary2', ary2);
  console.log('ary2 === ary', ary2 === ary);
}

// testArrayConsFunc()

//------------------------------------------------------------------------------------------------------
function testThrowErrorInResolvedPromise() {
  const p = Promise.resolve(3);

  const p1 = p.then((value) =>
    // null
    {
      throw value;
    }
  );

  p1.then(
    (value) => console.log('resolved', value),
    (reason) => console.log('rejected', reason)
  );
}

// testThrowErrorInResolvedPromise()

//------------------------------------------------------------------------------------------------------
function testObjAsKey() {
  const a = {};

  const b = { key: '123' };

  a[b] = 3;

  // console.log(a);
  // console.log(a[b]);
  // console.log(b.toString());
  console.log(Object.keys(a)[0]);
  console.log(typeof Object.keys(a)[0]);
}

// testObjAsKey()

//------------------------------------------------------------------------------------------------------
function testIterateObj() {
  const obj = {};
  const ary = [1, 2, 3];
  // console.log(ary.hasOwnProperty([Symbol.iterator]));
  console.log(Symbol.iterator in ary);
  console.log(Object.keys(ary));
  console.log(ary);

  // for(const item of obj){}
}

// testIterateObj()

//------------------------------------------------------------------------------------------------------
// function promiseAllll() {
//思路：
//1，创建一个新的promise（new Promise()）
//2，在它的executor里创建一个计数值和一个结果数组，遍历参数promises，将每个promise的then函数设置为：
//onFulfilled:计数加1，值置入结果数组，判断：如果计数值等于参数promises数组长度，即所有promise均为resolved，以结果数组为值resolve新promise
//onRejected:以reason为值reject新promise
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('argument must be an array'));
    }

    let countNum = 0;
    const promiseNum = promises.length;
    let resolvedValues = new Array(promiseNum);

    for (let i = 0; i < promiseNum; i++) {
      if (!(promise[i] instanceof Promise)) {
        promise[i] = Promise.resolve(promise);
      }

      promises[i].then(
        (value) => {
          countNum++;
          resolvedValues[i] = value;
          if (countNum === promiseNum) {
            return resolve(resolvedValues);
          }
        },
        (reason) => reject(reason)
      );
    }
  });
}

// const p1 = Promise.resolve(3);
// const p2 = new Promise((resolve, reject) => setTimeout(() => resolve(5), 2000));
// const p3 = fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
// const p4 = Promise.reject(7);
// const p5 = new Promise((resolve, reject) => setTimeout(() => reject(9), 2000));

// promiseAll([p4]).then(console.log);
// promiseAll([p5]).then(console.log);
// promiseAll([p1, p2, p3]).then(console.log);
// promiseAll([p1, p4]).then(console.log);
// promiseAll([p1, p2]).then(console.log);
// promiseAll([p1, p2, p3, p4]).then(console.log,console.log);
// console.log(promiseAll([p1, p2, p3, p4]));
// console.log(promiseAll([p4]));
// console.log(promiseAll([p2,p5]));
// promiseAll([p1, p2, p3, p4, p5]).then(console.log);
// }

// promiseAllll();

//------------------------------------------------------------------------------------------------------
function testStringAndNewString() {
  console.log(typeof String(3));
  console.log(typeof new String(3));
  console.log((5678).toString().length);

  console.log(Math.floor(5 / 2));
}

//String()和toString()都返回一个被转化后的字符串
//区别：
//1：定义的位置不同
//2：String()可以处理null和undefined
//3：Number.prototype.toString()支持不同进制数字的转换
//其他：
//.作为浮点符号和属性访问符
//纯小数的小数点后面存在6个及以上的0时，小数将被表示为科学计数法
//浮点数的整数部分的位数大于21时，浮点数将被表示为科学计数法
// testStringAndNewString()

//------------------------------------------------------------------------------------------------------
function testArgumentsInFunc() {
  function func(a) {
    'use strict';

    // const a = 7;

    console.log(Object.getOwnPropertyDescriptor(func, 'arguments'));

    console.log(a);
    console.log(arguments);
    a = 3;
    console.log(a);
    // console.log(arguments,arguments.callee,func.caller);
    console.log(arguments);
  }

  func(1);
}

//无论函数是否在严格模式下，参数的值都能被重写，但arguments对象无法被重写
//不在严格模式下时，能用Object.getOwnPropertyDescriptor()访问到arguments
//、arguments.callee、function.caller
//在严格模式下时，可以访问到arguments对象，但无法使用Object.getOwnPropertyDescriptor()
//方法访问，访问arguments.callee、function.caller等属性会抛出错误
// testArgumentsInFunc()

//------------------------------------------------------------------------------------------------------
function testIfTwoTypesOfValueCanCoExistInAObj() {
  const source = {};

  source.a = 3;
  source.b = 5;

  const proxy = {};

  function interceptor(key, value) {
    Object.defineProperty(proxy, key, {
      get: () => source[key],
      set: () => (source[key] = value),
    });
  }

  // console.log(obj.a);
  obj.a = 9;
  console.log(Object.values(obj));
}

// testIfTwoTypesOfValueCanCoExistInAObj()

//------------------------------------------------------------------------------------------------------
function testDifferentLogs() {
  console.log(' '.length);

  console.log(Number(undefined) / 100 || '');
  console.log(undefined / 100);

  console.log(new Function() instanceof Object);
  console.log(new Array() instanceof Object);
  console.log(new Object() instanceof Object);

  console.log('new Object()' instanceof Object);
  console.log(123 instanceof Object);
  console.log(null instanceof Object);
  console.log((undefined && [undefined]) || 1);

  console.log(JSON.stringify({ key1: 'value1', key2: undefined }));
}

// testDifferentLogs()

//------------------------------------------------------------------------------------------------------
function testValuesPassedToAFunc() {
  function add(a, b) {
    // return a + b;
  }

  //表达式的结果是一个立刻计算出的值
  //将表达式（即其值）置入函数，作为函数的返回值
  //即可实现通过执行函数手动获取这个表达式的值
  //亦即是可指定在何时何处获取一个特定的值
  //这里的函数被称为Thunk函数
  add.log((() => console.log(3))(), 8);

  //在JavaScript中，Thunk函数替换一个单参数函数，这个单参数函数替换多参数函数的返回值
  //用第一个参数调用Thunk，得到预置了这个参数的单参数函数
  //再用第二个参数调用这个单参数函数，得到多参数函数的值
  //从形式上可以表现为Thunk函数的连续调用
  function multipleArgsFunc(argA, argB) {
    return argA * argB;
  }

  function singleArgsFunc(argA) {
    return multipleArgsFunc(argA, argB);
  }

  const thunk = function (argB) {
    return function singleArgsFunc(argA) {
      return multipleArgsFunc(argA, argB);
    };
  };

  console.log(thunk(4)(8));
  // thunk(4)(8).log();

  // function returnItSelf() {
  // 	return returnItSelf();
  // }

  // returnItSelf();
}

// testValuesPassedToAFunc();

Boolean.prototype.log = function () {
  console.log(this.toString());
};

function testPropertiesInAObjectInstance() {
  new Object().hasOwnProperty('toString').log();
  new Object().hasOwnProperty('constructor').log();
  new Object().hasOwnProperty('valueOf').log();
  new Object().hasOwnProperty('hasOwnProperty').log();
}

// testPropertiesInAObjectInstance()

function testDivAppendAnotherAiv() {
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');

  document.body.appendChild(div1);

  div1.appendChild(div2);
}

// testDivAppendAnotherAiv();

Function.prototype.log = function () {
  console.log(this);
};

function prototypePropertyInFunctionInstance() {
  (() => {}).prototype?.log();
  (() => {}).hasOwnProperty('prototype').log();

  (async () => {}).prototype?.log();
  (async () => {}).hasOwnProperty('prototype').log();

  new Object({ method() {} }).method.prototype?.log();
  new Object({ method() {} }).hasOwnProperty('prototype').log();

  (async function () {}.prototype?.log());
  (async function () {}.hasOwnProperty('prototype').log());

  console.log(function* () {}.prototype);
  (function* () {}.hasOwnProperty('prototype').log());

  console.log(async function* () {}.prototype);
  (async function* () {}.hasOwnProperty('prototype').log());
}

// prototypePropertyInFunctionInstance();

function testFunctionInClassForm() {
  class ClassWhoseInstanceIsFunction extends Function {}

  // var k;

  const aFunc = new ClassWhoseInstanceIsFunction(
    'x',
    'y',
    `
    var k = x + y;
    console.log('calculated: ',k );
    return {k};
  `
  );

  aFunc(1, 2);
}

// testFunctionInClassForm();

function testDifferentFormsOfKeysInObj() {
  const str = 'str';
  const num = 3;
  const obj = {};
  const func = () => {};
  const ary = [];
  const sym = Symbol();
  const und = undefined;
  const nul = null;

  const toStr = [num, str, obj, func, ary, sym, und, nul].map((x) => x?.toString());

  const testObj = {
    [str]: 1,
    [num]: 1,
    [obj]: 1,
    [func]: 1,
    [ary]: 1,
    [sym]: 1,
    [und]: 1,
    [nul]: 1,
  };

  const testObjKeys = Object.keys(testObj);
  console.log(testObjKeys);

  for (let i = 0; i < toStr.length; i++) {
    console.log(i + 1);
    console.log(toStr[i], testObjKeys[i]);
    console.log(toStr[i] === testObjKeys[i]);
  }
}

// testDifferentFormsOfKeysInObj();

function testThisInArrowFunction() {
  function wrapper() {
    console.log('this in wrapper function', this);

    const that = this;

    (() => {
      console.log('this in arrow function', this, this === that);
    })();
  }

  // wrapper();

  Object.assign({}, { wrapper }).wrapper();

  wrapper.call(new Object());
}

// testThisInArrowFunction()

function testCompose() {
  function compose(...funcs) {
    if (funcs.length === 0) {
      return (arg) => arg;
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce(
      (a, b) =>
        (...args) =>
          a(b(...args))
    );
  }

  const a = (bx) => (action1) => {
    // console.log('a',action1);
    // console.log(cb(arg * arg));
    const action1x = action1 + 100;
    console.log('action1x', action1x);
    const returnedValue = bx(action1x);

    return returnedValue;
  };

  const b = (dispatch) => (action2) => {
    // console.log('b',next2);
    // console.log('b',action2);
    // console.log(cb(arg * arg * arg));
    const action2x = action2 + 100;
    console.log('action2x', action2x);

    const returnedValue = dispatch(action2x);
    return returnedValue;
  };

  const dispatch = (finalAction) => {
    console.log('finalAction', finalAction);
    // console.log('c',action3);

    // return action3
  };

  //(arg) => a(b(arg))
  //value = a(b(c)) = a(b) = a = dispatch
  //dispatch(x)
  const finalDispatch = compose(a, b)(dispatch);

  //1st m(a,b) = n
  //2nd m(n,b) = n(n,b)
  // console.log('composed',composed);
  // console.log('composed',composed);
  // console.log('composed',composed);

  // composed(3)(console.log)

  finalDispatch(100);
}

// testCompose()

// console.log([] instanceof Object);
// console.log([] instanceof Array);
// console.log(typeof [] === 'object');
// console.log(typeof [] === );
// console.log();

function test21123() {
  const a = 3;
  const b = 5;

  const [c, d] = Object.values({ a, b });

  console.log('c', c);
  console.log('d', d);
}

// test21123()

function testThisInInheritChain() {
  class Super {
    superMethod() {
      console.log('this in superMethod', this === instance);
    }
  }

  class Sub extends Super {
    constructor() {
      super();
    }

    subMethod() {
      console.log('this in subMethod', this === instance);
    }
  }

  const instance = new Sub();

  instance.subMethod();
  instance.superMethod();
}

// testThisInInheritChain();

function testThisInCallback() {
  const button = document.createElement('button');
  // button.onclick = function () {
  //   console.log('this in callback',this === button);
  // }

  button.addEventListener('click', function () {
    console.log('this in callback', this === button);
  });

  document.body.appendChild(button);

  //-------------------------------------------------------------------
  class TestCallback {
    handleChange() {
      console.log('this in handleChange', this);
    }

    render() {
      const input = document.createElement('input');
      input.addEventListener('click', this.handleChange);
      input.addEventListener('onchange', this.handleChange);
      // input.addEventListener('onchange', () => {});
      // input.onchange = () => {}
      // input.onchange = this.handleChange

      document.body.appendChild(input);

      console.log(input);
    }
  }

  const instance = new TestCallback();

  instance.render();
}

// testThisInCallback();

function testValueToRef() {
  // console.log(Object(1234));

  // console.log(Symbol());

  // console.log(Number(''));
  // console.log(Number('[object Object]'));

  // console.log({} === {});
  // console.log([] === []);
  // console.log((() => {}) === (() => {}));

  // const x = {
  //   valueOf(){console.log('valueOf executed')},
  //   toString(){console.log('toString executed')}
  // }

  const z = {};

  Object.defineProperty(z, 'x', {
    get: Symbol,
  });

  console.log(z.x);
  console.log(z.x === z.x);

  console.log(x);
}

// testValueToRef();

function testHowAsyncFunctionWorks() {
  (async function asyncTask() {
    await fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
    console.log('async task executed');
  })();

  (function syncTask1() {
    queueMicrotask(() => console.log('microtask in syncTask1 executed'));

    new Promise((resolve, reject) => {
      resolve();
    }).then(() => {
      const start = Date.now();
      new Array(80000000).map((e) => (document.createElement('p').innerHTML = e));
      console.log('time cost', Date.now() - start);
      console.log('expensive promise resolved');
    });

    setTimeout(() => {
      console.log('task in syncTask1 executed');
      queueMicrotask(() => console.log('microtask in task1 executed'));
    }, 0);
    console.log('sync task1 executed');
  })();

  (function syncTask2() {
    queueMicrotask(() => console.log('microtask in syncTask2 executed'));
    setTimeout(() => {
      console.log('task in syncTask2 executed');
      queueMicrotask(() => console.log('microtask in task2 executed'));
    }, 30);
    console.log('sync task2 executed');
  })();
}

testHowAsyncFunctionWorks();
//异步函数执行至await时，先执行await之后的表达式，
//然后暂停异步函数的执行，让出控制权，等待该表达式返回的promise落定
//当返回的promise落定时，异步函数以microtask的形式恢复执行
//重复以上步骤，直到异步函数执行完毕

// async function testOnce() {
  function testOnce() {
    const once = (promiseGenerator) => {
      let promise;
  
      return async (...args) => {
        console.log('promise1', promise);
        promise = promise || promiseGenerator(...args);
        console.log('promise2', promise);
  
        const res = await promise;
        promise = undefined;
  
        console.log('promise3', promise);
        console.log('res', res);
  
        return res;
      };
    };
  
    const generateAPromise = async () => {
      const result = await fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
      console.log('result', result);
      return result;
    };
  
    const onceFunc = once(generateAPromise);
    // await onceFunc();
    // await onceFunc();
    // await onceFunc();
    onceFunc();
    // onceFunc();
    setTimeout(() => onceFunc(), 3000);
    // onceFunc();
  
    // once(generateAPromise)()
    // once(generateAPromise)()
    // once(generateAPromise)()
    // once(generateAPromise)()
    // generateAPromise()
  }
  
  // testOnce()
  
  async function testMemoResultOfAsyncFunc() {
    const async = async () => {
      const result = await fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
      console.log('async executed', result);
      return result.json();
    };
  
    const memoAsyncResult = (asyncFunc) => {
      let result;
  
      return async function memoedAsync() {
        console.log('result before', result);
        if (result) {
          return result;
        }
  
        result = await asyncFunc();
        console.log('result after', result);
  
        return result;
      };
    };
  
    const memoedAsync = memoAsyncResult(async);
  
    const result = await memoedAsync();
  
    setTimeout(async () => await memoedAsync(), 3000);
    // const result2 = await memoedAsync();
    // const result3 = await memoedAsync();
    // const result4 = await memoedAsync();
    // const result5 = await memoedAsync();
  
    console.log('final result', result);
  }
  
  //异步函数用于异步求值，求异步值
  //如果求异步值，则必须等待（await）
  //如果只执行副作用，不求值，则不需要使用异步函数
  //获得网络请求成功与否的标识值也是求异步值
  // testMemoResultOfAsyncFunc();
  
  function testFuncInValueForm() {
    'use strict';
  
    const obj = {
      methodA: function () {
        console.log('this', this);
        console.log(this === obj);
  
        (0,
        () => {
          console.log('this in arrow func', this);
          console.log(this === obj);
        })();
      },
    };
  
    obj.methodA();
    // (obj.methodA)();
    // (0,obj.methodA).call({});
    (0, obj.methodA)();
  }
  
  //函数以值而非引用的形式调用时,this指向global
  //箭头函数的this指向外层最近的this,不管它是以什么形式调用
  // testFuncInValueForm();
  
  function testDelete() {
    const result = delete zxc;
  
    console.log(result);
  
    const obj = {};
  
    Object.defineProperty(obj, 'y', {
      value: 3,
      enumerable: true,
      configurable: false,
      writable: false,
    });
  
    console.log(obj);
  
    delete obj.y;
  
    console.log(obj);
  }
  
  // testDelete();
  
  function testObjectApi() {
    const obj = {
      a: 3,
      b: 5,
      c: 7,
    };
  
    const entries = Object.entries(obj);
    console.log('entries', entries);
  
    const map = new Map(entries);
    console.log('map', map);
  
    const fromEntries = Object.fromEntries(entries);
    console.log('fromEntries', fromEntries);
    console.log('fromEntries', fromEntries === obj);
  }
  
  // Object.entries()：将object转换为[key:value][]，即iterable
  // Object.fromEntries()：将iterable转换为object
  // testObjectApi();
  
  function testHowValuesChangeInPromise() {
    const p = new Promise((resolve, reject) => {
      resolve(3);
    })
      .then((value) => {
        console.log('2', value);
        return 5;
      })
      .then((value) => {
        console.log('3', value);
        return 7;
      });
  
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 1000);
    });
  
    console.log('[ p1 ] >', p1);
  
    const thatP1 = p1;
  
    console.log('[ thatP1 ] >', thatP1);
  
    setTimeout(() => console.log('equals', thatP1 === p1), 2000);
  }
  
  // promise是一个同步值，但其维护的内部值是异步值
  // 这个异步值可以且仅会随promise状态的改变而变化
  //promise可以调用其方法（then、catch、finally）
  //在其状态落定时来处理落定为不同状态的不同值
  //并返回一个包含处理过的新值的新的promise
  // testHowValuesChangeInPromise();
