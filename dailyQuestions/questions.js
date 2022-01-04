Function.prototype.log = function (...args) {
	console.log(this(...args));
};

Object.prototype.log = function (key) {
	console.log(key ? this[key] : this);
};

Array.prototype.log = function () {
	console.log(this);
};

Map.prototype.log = function (key) {
	console.log(this.get(key));
};

WeakMap.prototype.log = function (key) {
	console.log(this.get(key));
};

Boolean.prototype.log = function () {
	console.log(this.toString());
};

//第 162 题：实现对象的 Map 函数类似 Array.prototype.map------------------
function testMapInObject() {
	// const obj = {
	// 	key1: 'value1',
	// 	key2: 'value2',
	// 	key3: 'value3',
	// };

	// obj.map((item, index, obj) => [item + '1', index, obj]);
	// {
	//   key1:['value11',0,obj],
	//   key2:['value21',1,obj],
	//   key3:['value31',2,obj],
	//  }

	//思路一：创建一个新的空对象，将原对象的value依次用cb处理后置入其中
	Object.prototype.map1 = function (cb, thisArg) {
		let newObj = {};

		const keyArray = Object.keys(this);
		const valueArray = Object.values(this);

		for (const value of valueArray) {
			const index = valueArray.indexOf(value);
			const newValue = cb.call(thisArg, value, index, this);

			newObj[keyArray[index]] = newValue;
		}

		return newObj;
	};

	//思路二：创建一个新对象，将原对象的属性和值复制进去，再遍历使用cb处理
	Object.prototype.map2 = function (cb, thisArg) {
		const newObj = Object.assign({}, thisArg || this);

		const keysArray = Object.keys(thisArg || this);

		for (key of keysArray) {
			newObj[key] = cb(newObj[key], keysArray.indexOf(key));
		}

		return newObj;
	};

	const obj1 = {
		key1: 'value1',
		key2: 'value2',
		key3: 'value3',
	};

	const obj2 = {
		anotherKey1: 'anotherValue1',
		anotherKey2: 'anotherValue2',
		anotherKey3: 'anotherValue3',
	};

	// const result = obj1.map1((item, index, obj) => [item + '1', index, obj]);
	const result = obj1.map1(function (item, index, obj) {
		return [item + '1', index, this];
	}, obj2);
	// const result1 = obj1.map((item, index) => item + 'maped' + index, obj2);

	// console.log(obj1 === result);

	return result;
	// return result1;
}

// testMapInObject.log();

//----------------------------------------------------------------------------------------
// parseInt

//----------------------------------------------------------------------------------------
function testMapAndWeakMap() {
	const objAsKey = () => {};
	//weakmap的键必须是至少绑定过一次的引用类型值（array,function,object），
	//一旦该值的所有绑定被解除，其所在的键值对会被回收
	const weakMap = new WeakMap([[objAsKey, 3]]);
	const map = new Map([[{}, 3]]);

	console.log(weakMap);
	console.log(map);
	weakMap.log(objAsKey);
	map.log({});
}

// testMapAndWeakMap();

//----------------------------------------------------------------------------------------
//debounce
function debounce(fn, delay) {
	let timer;

	return () => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			fn.apply(this);
		}, delay);
	};
}

// const fn = debounce(() => console.log(1), 300);
// fn();
// fn();
// fn();
// fn();
// fn();

//throttle
function throttle(fn, delay) {
	let flag = true;

	return () => {
		if (flag === true) {
			fn.apply(this);
			flag = false;

			setTimeout(() => {
				flag = true;
			}, delay);
		}
	};
}

// const fn1 = throttle(() => console.log(2), 500);

// fn1();
// fn1();
// fn1();
// fn1();

// new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve();
// 	}, 3000);
// }).then(fn1);

// fn1();
// fn1();
// fn1();
// fn1();
// fn1();
// fn1();

//深度优先，广度优先，拷贝----------------------------------------------------------------------------------------

//ES5/ES6 继承--------------------------------------------------------------------------------------------------
function ConstructFuncOfES5() {
	//原型链：instance---SubConsFunc---SubConsFunc.prototype(new ConsFunc())---ConsFunc---ConsFunc.prototype
	function Child() {
		// Father.call(this);
		this.level = 1;
	}

	function Father() {
		this.level3 = 3;
	}
	Father.prototype.level4 = 4;

	//##1，将子构造函数的原型设为父构造函数的实例
	Child.prototype = new Father();
	//##2，将子构造函数的原型的constructor属性设置为子构造函数
	Child.prototype.constructor = Child;
	Child.prototype.level2 = 2;

	const child = new Child();

	child.log('level');
	child.log('level2');
	child.log('level3');
	child.log('level4');
	child.log();
	child.__proto__.log();
	child.log('constructor');
}

// ConstructFuncOfES5();

function classOfES6() {
	class Father {
		constructor(props) {
			this.level3 = 3;
			// this.level4 = 4;
		}

		static level4 = 4;

		static aMethod() {}

		anotherMethod() {}
	}

	Father.prototype.levelY = 'y';
	class Child extends Father {
		constructor(props) {
			super(props);
			this.level2 = 2;
		}
	}

	Child.prototype.levelX = 'x';

	const child = new Child();
	child.level = 1;

	// child.log('level');
	// child.hasOwnProperty('level').log();
	// child.log('level2');
	// child.hasOwnProperty('level2').log();
	// child.log('level3');
	// child.hasOwnProperty('level3').log();
	// child.log('level4');
	// child.hasOwnProperty('level4').log();
	// child.log('levelX');
	// child.hasOwnProperty('levelX').log();
	// child.log('levelY');
	// child.hasOwnProperty('levelY').log();
	// child.log();
	// child.__proto__.log();
	// child.log('constructor');

	// Father.hasOwnProperty('level4').log();
	// Father.prototype.hasOwnProperty('level4').log();
	Father.prototype.hasOwnProperty('aMethod').log();
	Father.hasOwnProperty('aMethod').log();
	Father.prototype.hasOwnProperty('anotherMethod').log();
	// Father.log();
}

// classOfES6();

//总结：
//1：使用ES5（构造函数）继承，需要进行##1和##2两步，使用ES6（类）继承不需要（语法预置）
//2：ES6（类）中，带有static关键字属性和方法即为类自身的属性和方法(hasOwnProperty())，
//不带static关键字的属性可视为constructor方法中的this.xxx = xxx
//不带static关键字的方法可视为类的原型方法
//即可以在类中声明其原型方法，但不能声明原型属性，原型属性只能使用Class.prototype.xxx = xxx
//声明

// function useOfInheritionInES5() {}

//setTimeout、promise和async/await有什么区别---------------------------------------------------------
//定义：
//task：任务
//microtask：微任务
function example1() {
	console.log('script start'); //1

	//setTimeout waits for a given delay then schedules a new task for its callback.
	//setTimeout等待一个给定的延时后，为其callback创建一个任务
	setTimeout(() => console.log('setTimeout'), 0); //2

	//Microtasks are usually scheduled for things that should happen straight after the currently
	//executing script, such as reacting to a batch of actions
	//or to make something async without taking the penalty of a whole new task.
	//应当紧接在当前正在执行的脚本之后的操作，比如一些动作的响应
	//或者用于避免创建一个新任务的开销去执行一些异步的操作，

	//The microtask queue is processed after callbacks as long as no other JavaScript is
	//mid-execution, and at the end of each task. Any additional
	//microtasks queued during microtasks are added to the end of the queue and also processed.
	//只要没有剩余代码正在（还需）执行，微任务队列就会开始执行
	//微任务执行过程中新产生的微任务会被添加到当前正在执行的微任务队列的末尾等待一起执行

	//Microtasks include mutation observer callbacks, and as in the above example, promise callbacks.
	//微任务种类包括Mutation Observer的callback和promise的callback

	//Once a promise settles, or if it has already settled, it queues a microtask for its reactionary
	//callbacks. This ensures promise callbacks are async even if the promise has already settled.
	// So calling .then(yey, nay) against a settled promise immediately queues a microtask.
	//当一个promise落定，或者已经落定时，它会为其回调函数入队一个微任务，这能确保尽管
	//promise已经落定，但其callbacks还是异步执行的
	//所以调用一个已经落定的promise的then函数会立即入队一个微任务

	Promise.resolve()
		.then(() => console.log('promise1')) //3
		.then(() => console.log('promise2')); //4

	console.log('script end'); //5
}

// example1();
//1-5-3-4-2

function example2() {
	const outer = document.createElement('div');
	outer.innerHTML = 'outer';
	const inner = document.createElement('div');
	inner.innerHTML = 'inner';
	outer.appendChild(inner);
	document.body.appendChild(outer);
	// document.body.appendChild(inner);

	new MutationObserver(() => console.log('mutate')).observe(outer, { attributes: true });

	function onClick() {
		console.log('click');

		setTimeout(() => console.log('timeOut'), 0);

		Promise.resolve().then(() => console.log('promise'));

		outer.setAttribute('data-random', Math.random());
	}

	inner.addEventListener('click', onClick);
	outer.addEventListener('click', onClick);

	// inner.click();
	inner.click();
}

// example2();
//click-promise-mutate-timeOut-click-promise-mutate-timeOut

//In summary:
//总结：
//Tasks execute in order, and the browser may render between them
//任务顺序执行，任务之间可能会穿插浏览器渲染
//Microtasks execute in order, and are executed:
//1,after every callback, as long as no other JavaScript is mid-execution
//2,at the end of each task
//微任务顺序执行，执行时机为：
//1，在每个callback之后执行，只要没有正在（还需）执行的代码
//2，在每个任务之后执行

//async/await 异步函数
//异步函数封装了“一组promise对象之间的时序性”，并最终“返回一个新的promise对象”(Promise.all)
//时序性可以用then链实现，也可以用异步函数实现
//可以将await视为在特定上下文（异步函数）中将Promise“转换为”它所代理数据的一种方式

async function asyncFunc() {
	const result1 = await Promise.resolve(1);
	const result2 = await Promise.resolve(2);
	const result3 = await Promise.resolve(3);
	return [result1, result2, result3];
}

// asyncFunc.log();

//代码-------------------------------------------------------------------------------------------------------
async function code() {
	async function async1() {
		console.log('async1 start'); //4，同步代码，立即执行
		const result = await async2();
		//5，执行async2。
		//7，await执行取出并置值所处理promise的操作
		//（类似于Promise.resolve(x).then(x=>result = x)）
		//queue一个microtask
		//此时虽然async2返回的promise状态已经落定，但异步操作并未完成
		//（microtask queue中的callback,即then的onFulfilled函数执行后才完成）
		//所以await让出操作权，继续执行余下代码
		console.log('async1 end');
	}

	async function async2() {
		console.log('async2'); //6，同步代码，立即执行
	}

	console.log('script start'); //1，同步代码，立即执行

	setTimeout(() => console.log('setTimeout'), 0); //2，在0ms延时后queue一个task

	async1(); //3，执行async1

	new Promise((resolve, reject) => {
		console.log('promise1'); //8，同步代码，立即执行
		resolve(); //9，立即落定promise的状态,为其callback，即then中的onFulfilled()queue一个microtask
	}).then(() => console.log('promise2'));

	console.log('script end'); //10，同步代码，立即执行
}

// code();
//'script start'---'async1 start'---'async2'---'promise1'---
//'script end'---'async1 end'---'promise2'---'setTimeout'

//added：异步函数的实现原理及其错误处理-------------------------------------------------------------------------------------------------------
async function theImplementationOfAsyncFunc() {
	async function fn(args) {
		//...
	}

	//等同于

	function fn1(args) {
		return spawn(function* () {
			//...
		});
	}
}

//spawn为自动执行器函数
function spawn(genF) {
	const p = new Promise((resolve, reject) => {
		//1，运行传入的生成器函数，获得其迭代器对象
		const gen = genF();

		//定义用来迭代执行的函数step
		function step(nextF) {
			//参数nextF为一个执行结果为开启迭代器执行的函数
			let next;

			try {
				next = nextF(); //执行参数函数，开始迭代器执行，获得执行结果next
			} catch (e) {
				return reject(e);
			}

			//如果next.done的值为true，即迭代器执行完毕，将（最后的）结果置入p
			if (next.done === true) {
				return resolve(next.value);
			}

			//将执行结果next的值置入一个落定的promise，
			//将执行step函数设置为它的onFulfilled函数
			Promise.resolve(next.value).then(
				(v) => {
					step(() => gen.next(v));
				},
				(e) => {
					step(() => gen.throw(e));
				}
			);
		}

		//第一次执行step，开启迭代
		step(() => gen.next(undefined));
	});

	//返回p
	return p;
}

// theImplementationOfAsyncFunc();
function* testGenF() {
	const result1 = yield fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
	const result2 = yield fetch('http://localhost:3001/api/mockedApi/regularData2', { method: 'POST' });
	const result3 = yield fetch('http://localhost:3001/api/mockedApi/regularData3', { method: 'POST' });
	return [result1, result2, result3];
}

function testSpawn() {
	const result = spawn(testGenF);

	//进入promise的executor，获取迭代器
	const gen = testGenF();
	console.log('gen', gen);
	//进入step，获取迭代器第一次执行后的值
	const next = gen.next(undefined);
	console.log('next', next);
	//若迭代器迭代未结束，使用上一轮的迭代结果继续执行迭代器
	const next1 = next.done || gen.next();
	console.log('next1', next1);

	const next2 = next1.done || gen.next(next1.value);
	console.log('next2', next2);

	const next3 = next2.done || gen.next(next2.value);
	console.log('next3', next3);

	const next4 = next3.done || gen.next(next3.value);
	console.log('next4', next4);
	//直到迭代器迭代完成，将promise落定，最后一轮的迭代值置入promise，step函数返回
	//将promise返回，即为异步函数返回的promise

	//##yield运算符之后的表达式的执行依赖于其迭代器的执行，其结果为迭代器执行后返回的
	//对象的value属性，如果将这些结果作为迭代器执行的参数再传入，就可以实现在生成器中
	//操作这些结果
}

//await的错误处理：awaitWrapper
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

//code---------------------------------------------------------------------------------------------------------
async function code1(mode) {
	//已知数组
	var arr = [
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, , 16, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, , 15, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 20, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, , 17, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 19, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, , 18, 13, [14]]]],
		10,
		[1, 2, 3],
		[3, 4, 5, 6],
		[6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
		10,
	];
	//编写一个程序，将数组扁平化，并去除其中重复数据，
	//最终得到一个升序且不重复的数组
	//最终结果：[1,2,3,4,5,6,7,8,9,10,11,12,13,14]

	//思路：递归flatten + 去重（Array.from(new Set(ary))） + （快速）排序

	var arr2 = [1, [2, 3, [4, 5], 6]];

	function quickSort(ary) {
		// console.log('mode', mode);

		if (mode === 'mode1') {
			if (ary.length < 2) {
				return ary;
			}
			let lowerSector = [];
			let upperSector = [];
			const fundamental = ary[Math.floor(ary.length / 2)];

			for (let i = 0; i < ary.length; i++) {
				if (i === Math.floor(ary.length / 2)) {
					continue;
				}

				if (ary[i] <= fundamental) {
					lowerSector.push(ary[i]);
				} else if (ary[i] > fundamental) {
					upperSector.push(ary[i]);
				}
			}

			return quickSort(lowerSector).concat(fundamental).concat(quickSort(upperSector));
		} else if (mode === 'mode2') {
			if (ary.length < 2) {
				return ary;
			}
			let lowerSector = [];
			let upperSector = [];
			const fundamental = ary[0];

			for (let i = 1; i < ary.length; i++) {
				if (ary[i] <= fundamental) {
					lowerSector.push(ary[i]);
				} else if (ary[i] > fundamental) {
					upperSector.push(ary[i]);
				}
			}

			return quickSort(lowerSector).concat(fundamental).concat(quickSort(upperSector));
		}

		//使用for...of无法准确定位到fundamental的索引位置并将其忽略
		// for (let i of ary) {
		//   if(i === fundamental) {}

		// 	if (i <= fundamental) {
		// 		lowerSector.push(i);
		// 	} else if (i > fundamental) {
		// 		upperSector.push(i);
		// 	}
		// }

		// return quickSort(lowerSector).concat(fundamental).concat(quickSort(upperSector));
	}

	let newAry = [];
	function flatten(ary) {
		for (let i of ary) {
			if (i instanceof Array) {
				flatten(i);
			} else {
				newAry.push(i);
			}
		}

		return newAry;
	}

	const startTime = Date.now();
	console.log('startTime', startTime);
	const result = quickSort(Array.from(new Set(flatten(arr))));
	// const result = quickSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 10]);

	await new Promise((resolve) => setTimeout(() => resolve(), 1000));

	const endTime = Date.now();
	console.log('endTime', endTime);

	console.log('timeCost', endTime - startTime - 1000);

	return result;
	// console.log(result);

	// return flatten(arr);
	// return Array.from(new Set(flatten(arr)))
	// return quickSort(Array.from(new Set(flatten(arr))));
	// return quickSort(flatten(arr));
}

// code1.log('mode1');
// code1.log('mode2');

//实现一个new运算符--------------------------------------------------------------------------------------------------
//思路：实现一个new函数，参数为构造函数和其参数，返回构造函数的实例
//要点：
//1：参数校验
//2：设置返回实例的原型
//3：判断参数函数是否有对象返回值

//##构造函数一般不指定返回值，使用new运算符调用时，默认返回其实例
//若指定返回值，当返回值为原始值时，仍然返回其实例
//当返回值为引用类型值时，用该值代替其实例返回
function AConsFunc(props) {
	this.a = props.a;
	this.b = props.b;
	this.c = props.c;

	// return {};
}

function mockedNewOperator(ConsFn, ...args) {
	if (!(ConsFn instanceof Function)) {
		throw new TypeError('new operator must be followed by a function');
	}

	const instance = new Object();

	const result = ConsFn.apply(instance, args);

	//1
	// instance.__proto__ = ConsFn.prototype;
	//或2
	Object.setPrototypeOf(instance, ConsFn.prototype);

	console.log(instance instanceof ConsFn);

	return result instanceof Object ? result : instance;
}

// mockedNewOperator.log(AConsFunc, { a: 1, b: 2, c: 3 });

// (({} instanceof Object).log());

//-----------------------------------------------------------------------------------------------------------------------
//比较Object.prototype.toString.call()、isArray()、instanceof

//isArray() >= Object.prototype.toString.call() > instanceof
//isArray()和Object.prototype.toString.call()可以检测出iframe，但instanceof不能
//这三个方法都不能检测出typedArray
function testMethodsOfDeterminingAArray() {
	function isArrayPolyfill(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	}

	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	xArray = window.frames[window.frames.length - 1].Array;
	var arr = new xArray(1, 2, 3); // [1,2,3]

	//iframe
	// Correctly checking for Array
	Array.isArray(arr).log(); // true
	// Considered harmful, because doesn't work though iframes
	(arr instanceof Array).log(); // false
	isArrayPolyfill.log(arr);

	//typedArray
	const typedArr = new Int8Array();
	Array.isArray(typedArr).log();
	(typedArr instanceof Array).log();
	isArrayPolyfill.log(typedArr);

	//typedArray(arguments)
	function func() {
		Array.isArray(arguments).log();
		(arguments instanceof Array).log();
		isArrayPolyfill.log(arguments);
	}

	func();
}

// testMethodsOfDeterminingAArray();

//-----------------------------------------------------------------------------------------------------------------------
//改造下面的代码，使之输出0-9，写出尽量多的解法
function printZeroToNine() {
	//wrong,all 10
	for (var i = 0; i < 10; i++) {
		setTimeout(() => console.log(i), 1000);
	}

	//1，使用let将变量i声明在块级作用域
	for (let i = 0; i < 10; i++) {
		setTimeout(() => console.log(1, i), 1000);
	}

	//2，使用IIFE将变量i重新声明至函数作用域
	for (var i = 0; i < 10; i++) {
		((i) => {
			setTimeout(() => console.log(2, i), 1000);
		})(i);
	}

	//3，使用try...catch将变量i置入try...catch的独立作用域，并作为错误抛出
	for (var i = 0; i < 10; i++) {
		try {
			throw new Error(i);
		} catch (i) {
			setTimeout(() => console.log(3, i.message), 1000);
		}
	}

	//4，使用with将变量i置入with的独立作用域
	for (var i = 0; i < 10; i++) {
		with ({ i }) {
			setTimeout(() => console.log(4, i), 1000);
		}
	}

	//5，使用promise维护每次循环中变量i的值，并将其用来打印
	for (var i = 0; i < 10; i++) {
		Promise.resolve(i).then((i) => setTimeout(() => console.log(5, i), 1000));
	}

	//6，使用generator将每次循环中变量i的值注入，并将其用来打印
	for (var i = 0; i < 10; i++) {
		function* gen() {
			const value1 = yield 123;
			yield setTimeout(() => console.log(6, value1), 1000);
		}

		const ite = gen();
		ite.next();
		ite.next(i);
	}

	//补充：
	//7，setTimeout的第三个参数可作为callback执行的参数
	//在循环中置入其每一轮的参数值即可
	for (var i = 0; i < 10; i++) {
		setTimeout((i) => console.log(7, i), 1000, i);
	}

	//8，利用bind预置参数
	for (var i = 0; i < 10; i++) {
		//预置setTimeout自身
		// setTimeout.bind(null, (i) => console.log(8,i), 1000, i)();

		//预置callback
		setTimeout(((i) => console.log(8, i)).bind(null, i), 1000);
	}

	//9，浏览器环境下，setTimeout的第一个参数传入undefined，
	//可以使console.log(i)同步运行
	for (var i = 0; i < 10; i++) {
		setTimeout(undefined, console.log(9, i), 1000);
	}

	//10，在7的基础上，将console.log(i)这个表达式作为setTimeout的
	//第三个参数，这个表达式会同步执行，其返回值undefined作为
	//callback的参数
	for (var i = 0; i < 10; i++) {
		setTimeout(
			(x) => {
				//callback不做任何操作
				// console.log(x);
			},
			1000,
			console.log(10, i)
		);
	}

	//11，改写console.log()
	const log = console.log;
	let x = 0;
	console.logx = function (i) {
		log(11, x++);
	};

	for (var i = 0; i < 10; i++) {
		setTimeout(() => console.logx(), 1000);
	}

	//12，以 i = 10为基准，利用 ++ 和 % 运算符获得 0-9，然后打印
	for (var i = 0; i < 10; i++) {
		setTimeout(() => console.log(12, i++ % 10), 1000);
	}

	//变式
	//在 i循环递增至9后将其重置为0，然后异步依次打印 i++
	for (var i = 0; i < 10; i++) {
		setTimeout(() => console.log(13, i++), 1000);
	}
	i = 0;
}

// printZeroToNine();

//code：下面的代码打印什么内容，为什么？-----------------------------------------------------------------------------------------------------------------------
function code2() {
	var b = 10;
	(function b() {
		//作用域链上b的顺序为函数名b--->变量名b
		//函数名为只读属性
		//configurable: true,
		//enumerable: false,
		//value: "b",
		//writable: false
		b = 20;
		console.log(b);
		// console.log(Object.getOwnPropertyDescriptor(b,'name'));
	})();
	console.log(b);
}

// code2();

//简单改造下面的代码，使之分别打印 10 和 20。
function code3() {
	b = 10;
	// var b = 10;
	(function b() {
		var b = 20;
		console.log(window.b); //打印10
		// console.log(b); //打印20
	})();
}

// code3();

//code：下面代码中 a 在什么情况下会打印 1？-----------------------------------------------------------------------------------------------------------------------
function code4() {
	var a = x;
	if (a == 1 && a == 2 && a == 3) {
		console.log(1);
	}
}

//code：下面代码输出什么？----------------------------------------------------------------------------------------------------------------
function code5() {
	a = 10;
	// var a = 10;
	(function () {
		console.log(a); //undefined
		a = 5;
		console.log(window.a); //10
		console.log(a); //5
		var a = 20; //变量声明会提升，但不包括其值的绑定
		console.log(a); //20
	})();
}

// code5();

//code：实现一个sleep函数（Promise、generator、async/await）----------------------------------------------------------------------------------------------------------------
//async/await
async function sleep(ms) {
	await new Promise((resolve) => setTimeout(() => resolve(), ms));
}

//generator
function* sleep1(ms) {
	yield new Promise((resolve) => setTimeout(() => resolve(), ms));
}

//Promise
function sleep2(ms) {
	return new Promise((resolve) => setTimeout(() => resolve(), ms));
	// return Promise.resolve().then(() => setTimeout(() => console.log('sleep end'), ms));
}

async function testSleep() {
	console.log(0, Date.now());
	await sleep(1000);
	console.log(0, Date.now());

	console.log(1, Date.now());
	await sleep1(2000).next().value;
	console.log(1, Date.now());

	console.log(2, Date.now());
	await sleep2(3000);
	console.log(2, Date.now());
}

//本质是让await等待一个ms后落定的promise后再继续执行
// testSleep();

//排序：[3, 15, 8, 29, 102, 22] ----------------------------------------------------------------------------------------------------------------
function sort() {
	function quickSort(ary) {
		if (ary.length < 2) {
			return ary;
		}

		let fundamental = ary[Math.floor(ary.length / 2)];

		let lowerSector = [];
		let upperSector = [];

		for (let i = 0; i < ary.length; i++) {
			if (i === Math.floor(ary.length / 2)) {
				continue;
			}

			if (ary[i] <= fundamental) {
				lowerSector.push(ary[i]);
			} else if (ary[i] > fundamental) {
				upperSector.push(ary[i]);
			}
		}

		return quickSort(lowerSector).concat(fundamental).concat(quickSort(upperSector));
	}

	return quickSort([3, 15, 8, 29, 102, 22]);
}

// sort.log()

//输出以下代码执行的结果并解释为什么 ----------------------------------------------------------------------------------------------------------------
function code6() {
	var obj = {
		2: 3,
		3: 4,
		length: 2,
		splice: Array.prototype.splice,
		push: Array.prototype.push,
	};

	//存在length为2，则从2之后的第三个位置（索引为2）插入(2:1)
	obj.push(1); //Array.prototype.push.call(obj,1)
	//插入(3:2)，并维护length属性为4
	//且索引0和1为空
	obj.push(2);

	console.log(obj);
}

//MDN：
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push
//描述：
//push 方法具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。
//push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，
//则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
//唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，
//因为字符串是不可改变的。
// code6();

//实现 (5).add(3).minus(2) 功能。 ----------------------------------------------------------------------------------------------------------------
//例： 5 + 3 - 2，结果为 6
function addAndMinus() {
	Number.prototype.add = function (num) {
		return this + num;
	};

	Number.prototype.minus = function (num) {
		return this - num;
	};

	console.log((5).add(3).minus(2));
}

//原理：包装对象
// addAndMinus();

//---------------------------------------------------------------------------------------------------------------------------
function code7() {
	var a = { n: 1 }; //a 指向 {n:1}
	var b = a; //b 指向 {n:1}

	console.log('b === a', b === a);

	a.x = a = { n: 2 };
	//equals to
	//a.x = (a = {n:2})

	//1，创建a.x属性，即a指向的{n:1}变为{n:1,x:undefined}
	//2，a的指向改变至{n:2}
	//3，将a.x的指向改为{n:2}，即b.x的指向改为{n:2}

	//##当a.x被创建时，它代表一个引用位置，不会随a的改变而改变

	console.log(a.x);
	console.log(b.x);
}

// code7();

//---------------------------------------------------------------------------------------------------------------------------
// let ary = [3, 4, 1, 2];
// let ary = [3, 15, 8, 29, 102, 22];
// let result = [];
function bubbleSort(ary) {
	if (ary.length < 2) {
		result.unshift(...ary);
		return result;
	}

	for (let i = 0; i < ary.length; i++) {
		if (ary[i] > ary[i + 1]) {
			const t = ary[i];
			ary[i] = ary[i + 1];
			ary[i + 1] = t;
		}
	}

	result.unshift(ary.pop());
	bubbleSort(ary);

	console.log(result);
}

// bubbleSort(ary);

//---------------------------------------------------------------------------------------------------------------------------
function lazyManClass() {
	class LazyMan {
		constructor(props) {
			// super(props);
			this.taskQueue = new Map();
			this.timer = null;
			console.log('Hi I am', props);
		}

		executeTaskQueue() {
			this.timer = setTimeout(async () => {
				if (this.taskQueue.has('sleepFirst')) {
					await this.taskQueue.get('sleepFirst')();
					this.taskQueue.delete('sleepFirst');
				}

				for (const task of this.taskQueue.values()) {
					await task();
				}
			}, 0);
		}

		sleepFirst(s) {
			clearTimeout(this.timer);

			this.taskQueue.set('sleepFirst', () => new Promise((resolve) => setTimeout(() => resolve(console.log(s + 's firstSleep end')), s * 1000)));

			this.executeTaskQueue();

			return this;
		}

		sleep(s) {
			clearTimeout(this.timer);

			// this.taskQueue.set('sleep', () => Promise.resolve().then(() => setTimeout(() => console.log('sleep end'), s * 1000)));
			this.taskQueue.set('sleep', () => new Promise((resolve) => setTimeout(() => resolve(console.log(s + 's sleep end')), s * 1000)));

			this.executeTaskQueue();

			return this;
		}

		eat(food) {
			clearTimeout(this.timer);

			this.taskQueue.set({}, () => Promise.resolve().then(() => setTimeout(() => console.log('I am eating', food), 0)));

			this.executeTaskQueue();

			return this;
		}
	}

	function init() {
		// new LazyMan('Tony');
		// Hi I am Tony

		// new LazyMan('Tony').sleep(10).eat('lunch');
		// Hi I am Tony
		// 等待了10秒...
		// I am eating lunch

		// new LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
		// Hi I am Tony
		// I am eating lunch
		// 等待了10秒...
		// I am eating diner

		new LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
		// Hi I am Tony
		// 等待了5秒...
		// I am eating lunch
		// I am eating dinner
		// 等待了10秒...
		// I am eating junk food
	}

	init();

	// const John = new LazyMan('John');
	// console.log(John);

	// console.log(John.sleep(3));
	// console.log(John.sleep(3).eat('lunch'));
}

// lazyManClass();

//---------------------------------------------------------------------------------------------------------------------------
function calculateIntersectionOfTwoArrays(array1, array2) {
	const ary1 = [1, 2, 1, 2];
	const ary2 = [2, 2];
	//[2,2]

	//思路：
	//1，length找出较短数组
	//2，创建一个新数组result = []，遍历短数组的元素，indexOf看是否存在于长数组，若存在，推入result
	//补充：若元素在短数组中有重复，且存在于长数组，会有短数组元素多对一的情况

	//①
	function calculate(ary1, ary2) {
		const shorterAry = ary1.length <= ary2.length ? new Array(...ary1) : new Array(...ary2);
		const longerAry = ary1.length >= ary2.length ? new Array(...ary1) : new Array(...ary2);

		console.log('shorterAry', shorterAry);
		console.log('longerAry', longerAry);

		let result = [];
		let times = 0;

		for (let i = 0; i < shorterAry.length; i++) {
			let index = longerAry.indexOf(shorterAry[i]);
			times++;

			if (index !== -1) {
				result.push(shorterAry[i]);
				longerAry[index] = '';
			}
		}

		console.log('times', times);
		return result;
	}

	//②
	const intersect = (nums1, nums2) => {
		const map = {};
		const res = [];

		for (let n of nums1) {
			if (map[n]) {
				map[n]++;
			} else {
				map[n] = 1;
			}
		}

		for (let n of nums2) {
			if (map[n] > 0) {
				res.push(n);
				map[n]--;
			}
		}

		return res;
	};

	// return calculate(array1, array2);
	return intersect(array1, array2);
}

// calculateIntersectionOfTwoArrays.log([1, 2, 1, 1, 9, 9, 6, 1, 1, 3, 3], [2, 2, 9, 9, 6]);

//---------------------------------------------------------------------------------------------------------------------------
//<img src="1.jpg" style="width:480px!important;”>

//<img src="1.jpg" style="width:480px!important; max-width: 300px" />
//<img src="1.jpg" style="width:480px!important; transform: scale(0.625, 1);" />
//<img src="1.jpg" style="width:480px!important; padding:0 90px; box-sizing: border-box; " />
//<img src="1.jpg" style="width:480px!important; width:300px!important;" />

//---------------------------------------------------------------------------------------------------------------------------
function promiseFinally() {
	//Promise.prototype.finally
	//要点：
	//1，接受一个参数cb，返回一个新的promise
	//2，调用cb
	//3，保留调用它的promise的状态和值（resolved-value,rejected-reason）并将其注入返回的新promise

	Promise.prototype.finally1 = function (cb) {
		const P = this.constructor;

		return this.then(
			(value) => P.resolve(cb()).then(() => value),
			(reason) =>
				P.resolve(cb()).then(() => {
					throw reason;
				})
		);
	};

	const p = Promise.reject(3);

	const p1 = p
		.then((res) => ++res)
		.catch(console.log)
		.finally1(() => console.log(5));

	console.log(p1);
}

// promiseFinally();

//---------------------------------------------------------------------------------------------------------------------------
//Proxy
function testProxy() {
	const objA = {};

	const handler = {
		//handler可以含有至多13个方法，对应13种对目标对象拦截的操作
		get(target, propertyName, proxy) {
			return 3;
		},
		set(target, propertyName, propertyValue, proxy) {},
		apply(target, thisArg, [...args]) {},
		has(target, propertyName) {},
		construct(target, [...args]) {},
		deleteProperty(target, key) {},
		defineProperty(target, key, descriptor) {},
		getOwnPropertyDescriptor(target, key) {},
		getPrototypeOf(target) {},
		setPrototypeOf(target, proto) {},
		isExtensible(target) {},
		ownKeys(target) {},
		preventExtensions(target) {},
	};

	const proxy = new Proxy(objA, handler);

	console.log(proxy.x);
}

// testProxy();

function dataBind() {
	//存在一个数据源，比如const data = {x: 1};---model
	//存在一个能够显示数据的dom，比如input，##其显示数据来源于数据源;---view
	//当dom的显示数据由交互事件改变时，##数据源的数据同步改变
	//当数据源的数据被改变时，##dom的显示数据同步改变

	const dataSource = {
		x: 3,
		y: 5,
	};

	const dataSourceProxy = new Proxy(dataSource, {
		set(target, propertyName, propertyValue, proxy) {
			Reflect.set(target, propertyName, propertyValue);
			input.value = propertyValue;
		},
		get(target, propertyName, proxy) {
			return Reflect.get(target, propertyName);
		},
	});

	const input = document.createElement('input');
	document.body.appendChild(input);

	input.value = dataSourceProxy.x;

	input.oninput = function (e) {
		console.log(e.target.value);
		dataSource.x = e.target.value;
		console.log(dataSource);
	};

	dataSourceProxy.x = 8;
}

// dataBind();

//---------------------------------------------------------------------------------------------------------------------------
function objectAsKey() {
	function example1() {
		var a = {};
		var b = '123';
		var c = 123;
		a[b] = 'b'; //a:{123:'b'}
		a[c] = 'c'; //a:{123:'c'}
		console.log(a[b]); //'c'
	}

	function example2() {
		var a = {};
		var b = Symbol('123');
		var c = Symbol('123');
		a[b] = 'b'; //a:{[Symbol]:'b'}
		a[c] = 'c'; //a:{[Symbol]:'c'}
		console.log(a[b]); //'b'
	}

	function example3() {
		var a = {};
		var b = { key: '123' };
		var c = { key: '456' };
		a[b] = 'b'; //a:{[object Object]:'b'}
		a[c] = 'c'; //a:{[object Object]:'c'} (new Object()).toString() === [object Object]
		console.log(a[b]); //'b'
	}

	// example1(); //'c'
	// example2(); //'b'
	example3(); //'b' xxxx --> 'c'
}

// objectAsKey();

//---------------------------------------------------------------------------------------------------------------------------
function promiseAll() {
	//Promise.all
	//要点：
	//1，接受一个成员均为promise的数组参数，可以不是数组，但具有iterator接口；可以不是promise，函数内部会调用Promise.resolve()处理
	//2，当所有成员promise均落定为resolved时，返回一个新的promise，状态为resolved，其值为各个成员promise所落定的值的数组
	//3，当有一个成员promise落定为rejected时，返回一个新的promise，状态为rejected，其值为rejected成员的reason
	Promise.all1 = async function (promises) {
		if (!(Symbol.iterator in promises)) {
			throw new Error('argument is not iterable');
		}

		let result = [];
		let reason;

		for (let promise of promises) {
			if (!(promise instanceof Promise)) {
				promise = Promise.resolve(promise);
			}

			try {
				result.push(await promise);
			} catch (err) {
				reason = err;
				break;
			}

			// promise
			// 	.then(
			// 		async (res) => await result.push(res),
			// 		async (err) => {
			// 			await (reason = err);
			// 			return;
			// 		}
			// 	)
			// .catch((err) => {
			// 	reason = err;
			// 	return;
			// })
			// .finally(() => {
			// 	console.log(reason);
			// return Promise.resolve(reason || result);
			// });
		}

		console.log('reason', reason);
		const p = reason === undefined ? result : Promise.reject(reason);

		return p;
	};

	const p1 = Promise.resolve(3);
	const p2 = new Promise((resolve, reject) => setTimeout(() => resolve(5), 2000));
	const p3 = fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
	const p4 = Promise.reject(7);
	const p5 = new Promise((resolve, reject) => setTimeout(() => reject(9), 2000));

	// Promise.all1([p4]).then(console.log);
	// Promise.all1([p5]).then(console.log);
	// Promise.all1([p1, p2, p3]).then(console.log);
	// Promise.all1([p1, p4]).then(console.log);
	// Promise.all1([p1, p2]).then(console.log);
	// Promise.all1([p1, p2, p3, p4]).then(console.log);
	// console.log(Promise.all1([p1, p2, p3]));
	// console.log(Promise.all1([p1, p2, p3, p4]));
	// console.log(Promise.all1([p4]));
	// Promise.all1([p1, p2, p3, p4, p5]).then(console.log);
}

// promiseAll();

//---------------------------------------------------------------------------------------------------------------------------
function testAddFunc() {
	// function add(...args) {

	// 	return (...args)=>{

	//   };
	// }

	const curryReducer = (fn) => {
		return (...args) => {
			let runned = false;
			const chain = (...args) => {
				if (!args.length) return chain;
				chain.acc = (runned ? [chain.acc] : []).concat(args).reduce(fn);
				!runned && (runned = true);
				return chain;
			};
			chain.acc = undefined;
			chain.toString = () => chain.acc;
			return chain(...args);
		};
	};
	// * ---------------- simple add function

	const add = curryReducer((a, e) => a + e);

	console.log('' + add(1)); // 1
	console.log(add(1).toString()); // 1
	console.log(add(1)(2).toString()); // 1
	// add(1)(2); // 3
	// add().log(1); // 1
	// add().log(1); // 1
	// add().log(1).log(2); // 3
	// add(1)(2)(3); // 6
	// add(1)(2, 3); // 6
	// add(1, 2)(3); // 6
	// add(1, 2, 3); // 6
}

// testAddFunc();

//---------------------------------------------------------------------------------------------------------------------------

function code9() {
	function Foo() {
		Foo.a = function () {
			console.log(1);
		};

		this.a = function () {
			console.log(2);
		};
	}

	Foo.prototype.a = function () {
		console.log(3);
	};

	Foo.a = function () {
		console.log(4);
	};

	Foo.a(); //4

	let obj = new Foo();

	obj.a(); //2
	Foo.a(); //1
}

// code9();

//---------------------------------------------------------------------------------------------------------------------------
function code10() {
	function reverse(num) {
		if (num <= 9) {
			return num.toString();
		}

		let str = num.toString();
		let length = num.toString().length;

		return reverse(str.substring(1, length)) + str[0];
	}

	console.log(reverse(1234));
	console.log(reverse(328472938472));
}

// code10();

//---------------------------------------------------------------------------------------------------------------------------
function code11() {
	function changeObjProperty(o) {
		o.siteUrl = 'http://1';
		o = new Object();
		o.siteUrl = 'http://2';
	}

	let webSite = new Object();

	changeObjProperty(webSite);

	console.log(webSite.siteUrl); //1
}

// code11();

//---------------------------------------------------------------------------------------------------------------------------
function code12() {
	Promise.race = function (promises) {
		const p = new Promise((resolve, reject) => {
			for (const promise of promises) {
				promise.then((value) => resolve(value)).catch((reason) => reject(reason));
			}
		});

		return p;
	};

	const p1 = Promise.resolve(3);
	const p2 = new Promise((resolve, reject) => setTimeout(() => resolve(5), 1000));
	const p3 = fetch('http://localhost:3001/api/mockedApi/regularData1', { method: 'POST' });
	const p4 = Promise.reject(7);
	const p5 = new Promise((resolve, reject) => setTimeout(() => reject(9), 2000));

	Promise.race([p1, p2]).then((value) => console.log('1', value)); //3
	Promise.race([p4, p5]).then(null, (value) => console.log('2', value)); //7
	Promise.race([p2, p5]).then((value) => console.log('3', value)); //5
}

// code12();

//---------------------------------------------------------------------------------------------------------------------------
function code13() {
	//访问其属性时能执行特定操作

	const obj = {
		a: 3,
		// b: {
		// 	c: 5,
		// },
		// d: {
		// 	e: {
		// 		f: 7,
		// 	},
		// 	g: 9,
		// },
	};

	const extraOperation = (key, value, obj) => {
		// console.log(`get/set ${key} from ${obj} value = ${value}`);
		console.log(1);
	};

	function makeObservable(obj) {
		const copyObj = Object.assign({}, obj);

		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				makeObservable(obj[key]);
			}

			Object.defineProperty(obj, key, {
				get: () => {
					// extraOperation(key, obj[key], obj);
					return copyObj[key];
					// return 1;
				},
				set: (value) => {
					// extraOperation(key, obj[key], obj);
					obj[key] = value;
				},
			});
		});
	}

	makeObservable(obj);

	console.log(obj.a);
	console.log(obj.b.c);
}

code13();
