//6.1 概述--------------------------------------------------------
//6.1.1 动态数据类型的起源
//6.1.2 动态执行系统
//6.1.3 脚本系统的起源
//6.1.4 脚本只是表现形式

//···JavaScript是嵌入式的语言
//···JavaScript用作页面包含语言
//···是解释而非编译
//···可以重写标识符
//···使用动态类型系统
//···支持动态执行
//···支持丰富的数据外部展示

//6.2 动态类型：对象与值类型之间的转换------------------------------------------
function st() {
	const boolean = Boolean(false);

	const number = Number(100);

	const string = String('a string');

	const symbol = Symbol();

	console.log(boolean);
	console.log(typeof boolean);
	console.log(boolean === false);
	console.log(number);
	console.log(typeof number);
	console.log(number === 100);
	console.log(string);
	console.log(typeof string);
	console.log(string === 'a string');
	console.log(symbol);
	console.log(typeof symbol);
}

// st();

//6.2.1 包装类：面向对象的妥协
//6.2.1.1显式创建
//用自身的构造函数包装
function stoo() {
	console.log(new Number(3));

	var values = [100, 'a string', true];
	var types = { number: Number, string: String, boolean: Boolean };

	values.map((value) => new types[typeof value](value)).forEach((obj) => console.log(typeof obj, obj));
}

// sto()

//6.2.1.2 显式包装
//用Object()构造函数包装
function stot() {
	console.log(new Object(3));

	var values = [100, 'a string', true, Symbol()];
	values.map((value) => new Object(value)).forEach((obj) => console.log(typeof obj, obj));
}

// stot()

//6.2.1.3 隐式包装的过程与检测方法
function stot2() {
	var x = 100;

	//不包装
	console.log(x instanceof Number);

	//不包装
	try {
		console.log('toString' in x);
	} catch (e) {
		console.log(e);
	}

	//包装
	console.log(x.constructor);
	console.log(x['constructor']);

	//包装
	console.log(x.toString());

	//包装
	console.log(delete x.toString);
}

// stot2();

function stot3() {
	var x = 100;

	Object.prototype.getSelf = function () {
		return this;
	};

	var me = x.getSelf();

	console.log(typeof me, me);

	Object.prototype.getClass = function () {
		return this.constructor;
	};

	Object.prototype.getTypeof = function () {
		return typeof this;
	};

	Object.prototype.getInstanceof = function () {
		return this instanceof this.getClass();
	};

	var samples = [
		' ', //字符串
		100, //数值
		true, //布尔值
		function () {}, //函数
		{}, //对象
		[], //数组
		/./, //正则
	];

	samples.push(Symbol());

	console.log(samples[0]);
	console.log(typeof samples[0]);
	console.log(samples[0].getSelf());
	console.log(samples[0].getClass());

	var getAttr = (v, v2, cls) => [
		// return [typeof v, v2.getTypeof(), v instanceof cls, v2.getInstanceof()];
		typeof v,
		v2.getTypeof(),
		v instanceof cls,
		v2.getInstanceof(),
	];

	//   console.log(getAttr(samples[0], samples[0].getSelf(),samples[0].getClass()));
	//   console.log(  samples
	// .map((v) => [typeof v, getAttr(v, v.getSelf(), v.getClass())]));

	samples
		.map((v) => [typeof v, getAttr(v, v.getSelf(), v.getClass())])
		.forEach(([metaName, attr]) => {
			console.log(metaName, ': ', attr);
		});
}

// stot3();

//6.2.1.4 包装值类型数据的必要性与问题
function stof() {
	Number.prototype.showDataType = function () {
		console.log('value: ' + this + ', type: ' + typeof this);
	};

	var n1 = 100;
	console.log(typeof n1);
	n1.showDataType(); //等于Object(n1).showDataType()

	var str = 'abc';
	str.toString = function () {
		return ' ';
	};

	console.log(str);
	console.log(str.toString());

	var str2 = 'abcde';

	function newToString(str) {
		return 'a string';
	}

	function func(x) {
		x.toString = newToString;
	}

	func(str2);
	console.log(str2);
}

// stof();

//6.2.1.5 其他字面量与相应的构造器
//function,object,array,regexp

//6.2.1.6 函数特例

//6.2.2 从对象到值
//6.2.2.1 对象到值的隐式转换规则
function stto() {
	[Number, String, Boolean].map((Class) => new Class(null)).forEach((x) => console.log(x));
}

// stto() //0,'null',false

function stto2() {
	var x = new String('123');

	x.toString = function () {
		return new Object();
	};

	x.valueOf = function () {
		return new Object();
	};

	console.log(+x);
}

// stto2()

function stto3() {
	var typeHint,
		x = new String('123');
	var methods = ['toString', 'valueOf'];

	if (typeHint == 'number') {
		methods = methods.reverse();
	}

	let result;
	for (let method of methods.map((key) => x[key])) {
		if (method && method.call) {
			result = method.call(x);

			if (result === null || result instanceof Object) {
				continue;
			}

			console.log('got value: ', result);
			break;
		}

		throw new TypeError('cannot convert ... to primitive value');
	}
}

// stto3();

//6.2.2.2 直接的值运算不受包装类的方法影响
//6.2.2.3 什么是“转换的预期”
function sttt() {
	const x = { toString: () => '10', valueOf: () => -1 };

	console.log(parseInt(x));

	console.log(Math.abs(x));

	delete x.valueOf;
	console.log(1 + x);

	console.log('1' + x);
}

// sttt()

//6.2.2.4 深入探究valueOf方法
//6.2.2.5 布尔运算的特例
//任何对象在进行布尔运算时，都是作为对象使用的
//在进行数值或字符串运算时，都是按隐式规则使用valueOf()和toString()来转换为值使用的
function sttf() {
	const x = new Object(false);
	// const x = new Boolean(false);

	console.log(x.valueOf());

	console.log(!!x);

	console.log('value is: ', x);

	console.log(+x);
}

// sttf();

//6.2.2.6 符号Symbol.toPrimitive的效果
function stts() {
	var x = new Number(100);

	console.log(+x);

	x.valueOf = () => 101;
	console.log(+x);

	x[Symbol.toPrimitive] = () => 0;
	console.log(+x);

	x[Symbol.toPrimitive] = () => '012';
	console.log(+x);
	console.log(x + 100);
}

// stts();

//6.2.3 显式的转换
// Object(x),
// Number(x),
// Boolean(x),
// String(x),
// Symbol(x),

//6.2.3.1 显式转换的语法含义
//6.2.3.2 对“转换预期”的显式表示
function sttt() {
	var x = {};
	x.toString = () => new Object();
	x.valueOf = () => 2;

	console.log('string value', String(x));
	console.log('number value', Number(x));
	console.log('boolean value', Boolean(x));

	var xx = [false, new Boolean(false), new Object(), 0, 1, +0, -0];

	xx.forEach((x) => console.log(x + '\t->' + Boolean(x)));
}

// sttt();

//6.2.3.3 关于符号值的补充说明
function sttt() {
	var x = Object(Symbol());

	console.log(typeof x);

	console.log(x instanceof Symbol);
}

// sttt();

//6.3 动态类型：值类型的转换--------------------------------------------------------------------

//6.3.1 值运算：类型转换的基础
//对于计算系统来说，引用类型的价值是：
// ■ 标识一组值数据。
// ■ 提供一组存取值数据的规则。
// ■ 在函数中传递与存储引用（标识）。
// 这使得“引用→值”和“值→值”的类型转换是JavaScript中类型转换的终极目标。

//6.3.1.1 完整过程：运算导致的类型转换
function st00() {
	const x = { valueOf: () => '010' };

	console.log(+x);

	console.log(++[[]][+[]]);

	console.log(+(+[]));
}

// st00()

//6.3.1.2 语句或语义导致的类型转换

//--------------------------------------
//*状态管理库的选择
//*用hook和context代替redux
//*react入门
//*react与函数式编程
//*新兴技术
//*react的进步和问题
//--------------------------------------

/**if语句”必然会把表达式的结果转换为布尔值。与此相同的还有循环中的while()语法等，
这些语法元素需要一个布尔值，因此它会将括号中的表达式运算的结果转换为布尔值。
而switch采用的是类似“===”操作符的运算*/
function stot() {
	var obj = Object(2);
	switch (obj) {
		case 2:
			console.log('executed');
	}

	console.log(typeof obj);
}

// stot();

//6.3.2 值类型之间的转换
//6.3.2.1 undefined的转换
/**任何值都不能转换为undefined，但反过来却不是。
 * 因为undefined实际上也需要参与运算 . */
function stto() {
	console.log('+undefined', +undefined); //NaN
	console.log('10 + undefined', 10 + undefined); //NaN
	console.log('undefined + "" ', undefined + '', typeof (undefined + '')); //'"undefined"
	console.log('!!undefined', !!undefined); //false
}

// stto()

//6.3.2.2 number的转换
/**除了符号之外的任何值都可以被转换为number类型的值。
 * 如果转换得不到一个有效的数值，那么结果会是一个NaN，
 * 而NaN又是一个可以参与数值运算的值。
 * 这样处理的目的是，使得表达式可以尽量求值，而不是弹出一个异常。 */
/**number值转换为布尔值时，非零值都转为true，零与NaN都转为false。 */

//6.4 动态类型：对象与数组的动态特性--------------------------------------------------------
//6.4.1 关联数组与索引数组
function sfo() {
	//数组形式为索引数组，以序数类型作为下标变量
	const arr = ['a', 'r', 'r', 'a', 'y'];
	arr[0] === 'a';
	arr[1] === 'r';
	arr[2] === 'r';
	arr[3] === 'a';
	arr[4] === 'y';

	//对象形式为关联数组，以非序数类型作为下标
	const obj = {
		yesterday: '2021-07-15',
		today: '2021-07-16',
		tomorrow: '2021-07-17',
	};
}

//···所谓属性存取 ，其实就是查表
//···所谓对象实例，其实就是一个可以动态添加元素的关联数组
//···所谓原型继承，其实就是在关联数组的链中反向查找元素

//···所谓索引数组，其实就是用数字（内部仍然是字符串）的形式来存取的一个关联数组
function sfo1() {
	var aArray = ['a', 'b', 'c', 'd'];

	//显示true
	console.log('1' in aArray);

	//for...in列举元素0~3
	for (var i in aArray) {
		console.log(i + '=>' + aArray[i]);
	}
}

// sfo1();

//6.4.2 索引数组作为对象的问题
//JavaScript中的数组表现为索引数组，但是具有对象的全部性质
function sft() {
	var arr = [1, 2, '345', , 12];

	//#在赋值模板（或展开）中作为数组使用
	var [x, y] = arr;
	console.log(x, y);
	console.log('elements', ...arr);

	//#在赋值模板（或展开）中作为对象使用
	var { 0: x, 1: y, length } = arr;
	console.log(x, y, length);

	var x = { length: 100, ...arr };
	console.log('flat', ...arr);
	console.log('keys', Object.keys(arr));
	console.log('descriptor', Object.getOwnPropertyDescriptor(arr, 'length'));
	Object.defineProperty(arr, 'length', { configurable: true });
	console.log(x.length + '=>' + Object.keys(x));
}

// sft();

//6.4.2.1 索引数组更加低效
function sfto() {
	var aArray = new Array(10000);

	for (var i = 0, imax = aArray.length; i < imax; i++) {
		//列举aArray.length次
	}
}

function sfto1() {
	var arr = new Array(1000 * 10000);
	arr[1] = 3;
	arr[3] = 1;
	arr[5] = 5;
	arr[9999] = 9;

	function func(lv, rv) {
		console.log(lv + '，' + rv);
		return lv > rv ? 1 : lv == rv ? 0 : -1;
	}

	//[3,1,5,9]
	//左大于右 返回1
	//左等于右 返回0
	//左小于右 返回-1

	// console.log(arr.sort(func));

	/**Array.prototype.sort:
	 * arr.sort([compareFunction])
	 * 如果compareFunction(a,b)小于0，那么a会被排到b之前
	 * 如果compareFunction(a,b)等于0，a和b的相对位置不变
	 * 如果compareFunction(a,b)大于0，b会被排到a之前
	 */

	arr.sort(func);
	console.log(arr);
}

// sfto1();

//在“需要列举数组元素”的那些方法中，列举的算法都是从头至尾进行遍历的；
//而在“需要列举对象成员”时，则是访问自有属性表的。只有在访问自有属性表时，
//才不会尝试访问那些“下标空洞”的情况。
function sfto2() {
	var arr = new Array(1000 * 10000);

	var proxy = new Proxy(arr, {
		ownKeys() {
			console.log('TRY -> ownKeys() ');
			// console.log(arguments === proxy);

			return Reflect.ownKeys(proxy);
		},
		get(_, key) {
			console.log('GET -> ', key);
			return Reflect.get(_, key);
		},
	});

	arr.length = 30;

	//#排序
	proxy.sort();
	// console.log(proxy);

	// #for...of迭代
	// #for...in迭代
	// for (let x of proxy);
	for (let x in proxy);
}

// sfto2();
//更进一步的测试表明，数组的绝大多数方法都将尝试列举所有下标，
//并且包括for...of、数组展开等在内的JavaScript内部机制也将做这样的尝试。
//仅有类似pop、push、shift、unshift等少数方法例外，
//因为它们只需要在确定位置上操作元素。

//6.4.2.2 属性length的可写性
//array.length为enumerable:false,configurable:false的属性，
//即无法被Object.keys方法取得，也无法被重新配置

//6.4.2.3 类型化数组的一些性质
function s0() {
	//在对象及其原型链上查找属性的属主对象
	var getPropertyOwner = function f(obj: object, key: string) {
		//若参数对象不存在，返回null
		//若参数对象存在，且拥有[key]属性，返回对象
		//若参数对象存在，但不拥有[key]属性，取对象的原型，重新查找
		return !obj ? null : obj.hasOwnProperty(key) ? obj : f(Object.getPrototypeOf(obj), key);
	};

	//创建类型化数组
	var typedArr = new Int32Array(10);

	//length不是类型化数组的自有属性
	const res1 = typedArr.hasOwnProperty('length');
	console.log("typedArr.hasOwnProperty('length')", res1);

	//取原型，该值应等于Object.getPrototypeOf(Int32Array.prototype)
	var p = getPropertyOwner(typedArr, 'length');

	//查看属性描述符
	const res2 = Object.getOwnPropertyDescriptor(p, 'length');
	console.log("Object.getOwnPropertyDescriptor(p, 'length')", res2);
}

// s0();
//所有类型化数组都实现为一种典型的索引数组的操作界面，
//但由于它们的length属性被限制为不可写，因此它们总是定长的。
//类型化数组在创建时就被设定了大小，并且在它的数据大小许可范围内，
//可以通过它的不同数据视图来访问它的部分或全部。
//而数据视图在抽象概念上是可以重置大小和类型的。

//6.4.3 类数组对象：对象作为索引数组的应用
//一个“有length属性”的对象在JavaScript中就被称为“类数组对象（array-like objects）”。
//在多数情况下，这样的对象是可以作为数组来替代使用的，
//除了包括使用Reflect接口或原型Array.prototype的方法，
//还包括JavaScript面向数组提供的一些运算符（例如数组展开）。

//给一个原子对象添加一个可写的length属性，就得到了一个“最原始”的类数组对象。
//因为原子对象没有任何成员，因此也没有原型。
function s1() {
	//创建array-like objects的方法
	var arr2 = Object.create(null, { length: { value: 0, writable: true } });

	//或者，使一个普通对象成为array-like objects
	var obj = { length: 0 };

	//尝试调用Array.prototype上的方法
	//Array.prototype.push可以接收多个参数
	Array.prototype.push.call(arr2, ...'ABC');

	console.log(arr2);
	// console.log(...'ABC');

	//数组的绝大多数方法都可以用类似上述的技巧来应用于一个类数组对象，
	//并且同时维护这个对象的length属性。但是所有使用数组的迭代器接口的方法，
	//却不适用于上述对象
	try {
		console.log(...arr2);
	} catch (e) {
		console.log(e);
	}
	//这是因为类数组对象默认时并没有定义Symbol.iterator这个属性。
	//解决这个问题的方法也非常简单：
	arr2[Symbol.iterator] = Array.prototype[Symbol.iterator];
	console.log(...arr2);
	//事实上，这也是函数用来创建参数对象（arguments）的方法。
	//参数对象在创建时也添加了这个符号属性（所以它也可以被迭代），
	//并且使用的也是完全相同的技巧。
	var f = new Function('return arguments[Symbol.iterator]');
	var iter = f();
	console.log(iter === arr2[Symbol.iterator]);
	//类数组默认时是不能被当作集合对象（这里是指Collection Types）来使用的，
	//因此也就不能用作其他集合的源，例如不能用作Array.from()的参数。
	//但一旦添加了上述符号属性，它就可以作为Map、Set、TypedArray、
	//ArrayBuffer等集合类型的源了。当然，如我们前面讨论的，
	//这也是因为这些类都需要用迭代器接口来读取源，
	//以获得集合中的部分（或全部）成员。其他与此相关的特性还包括yield*运算、
	//for...of语句和Promise类的一些方法等，

	//一个更简单的方法来获得一个类数组对象
	//1，将数组转换为类数组对象（不使用迭代器）
	//原理：数组使用的是Array.prototype[Symbol.iterator]属性
	//将一个数组的原型设为null，它将失去Array.prototype[Symbol.iterator]的使用
	//即变为一个类数组
	var arr3 = Object.setPrototypeOf([], null);
	//2，使用迭代器
	//原理：arguments对象，即参数对象本身就是仅有
	//length和Symbol.iterator两个自有成员的原子对象。
	var withIterator = Function('return arguments')();
	var arr4 = Object.setPrototypeOf(['A', 'B'], withIterator);
	console.log(...arr4);
}

// s1();

//6.4.4 其他
//任何对象只要有迭代器接口，就可以简单地转换为集合对象。
//所有被迭代出来的元素，如果是引用则以引用形式包含在集合中，
//否则就在集合中存放值。集合并不主动转换“键或值的类型”，
//并且会“更严格地”比较它们，因此你不可能创建一个有两个NaN的Set或Map。
function s2() {
	//在Map/Set中NaN是“更严格比较的”，所以多个NaN是相同的值
	console.log(
		new Map([
			[NaN, 0],
			[NaN, 1],
		])
	);

	console.log(new Set([NaN, NaN]));

	//用集（Set)对象来迭代字符串中的字符
	console.log(new Set('abcadf123oaafshjafgoi'));
	//或用于计数
	console.log(new Set('abcadf123oaafshjafgoi').size);
}

// s2();

//类型化数组也是集合类型（Collection Types）对象的一种，
//它的构建界面也允许传入“有迭代器接口的对象”作为源。但是，
//类型化数组会先通过迭代器接口得到一个类数组对象，
//然后再列举这个类数组对象的每一个成员并将它们添加到数组中去。
//之所以需要这样一次中介转换，原因在于类型化数组需要一个length值以便
//预先分配好内部的Buffer。这个操作发生在new TypedArray()和TypedArray.from()中，
//例如：
function s3() {
	//集合对象（例如Set）是有迭代器接口的
	var x = new Set('123456asdf');

	//将集合对象（x）作为源对象时，（如果需要，）会先在内部转换为
	//类数组以得到数组索引
	var arr = Int32Array.from(x);

	//测试结果（注意转换成数字值不成功时将填为0值）
	console.log(arr);

	const arr2 = Array.from(x);

	console.log(arr2);
}

// s3();
//但是一般数组就没有这样的行为，而只是迭代列举每一个集合成员，
//然后再将它们顺次添加到数组中去就可以了。只是需要注意的是，
//在两类过程中，TypedArray或Array都不会依赖源集合的size属性，
//因为在它们的界面中是只操作迭代器接口。

//6.5 重写---------------------------------------------------------------------------------------
/**
 * JavaScript中的重写是一个代码执行期的行为。对于let/const声明的标识符，
 * 引擎将在代码的语法分析期对其进行限制，从而避免运行期的重写。
 * 因此只有那些在运行中发生的重写才会导致冲突，或因为错误的、
 * 意外的重写而导致不可预料的代码逻辑错误。
 *
 * 针对原型和构造器的重写，会影响重写前所创建实例的一些重要特性，
 * 例如，继承性的识别。因此这种重写通常被要求在引擎最先装入的代码中进行（
 * 例如程序包或模块加载）。令人遗憾的是，开发人员通常无法保证这一点。
 * 所以在多个JavaScript扩展框架复合使用的情况下，经常会因为重写而出现
 * 不可控制的局面。
 *
 * 基本上来说，在引擎级别上的重写限制主要是指保留字与运算符。这当然可以理解，
 * 起码我们所知道的许多语言都有这种限制。就总的趋势来说，
 * ES5以前的规范对重写的限制较少，更侧重体现动态语言的黏合剂特性，
 * 例如对象系统就依赖原型重写与原型修改来构造大型的继承系统；
 * 而ES5及其之后的规范对重写限制越来越多，更侧重体现语言的静态特性，
 * 例如对六种主要声明语句在语法和语义上的规范。
 */

//6.5.1 标识符的重写及其限制

//6.5.1.1 早于用户代码之前的声明与重写
//归结起来，以下方式都可以产生/声明出一个标识符：
//■ var/const/let声明（包括它们在for语句中的声明）
//■ 具名函数的名字及其形式参数名
//■ 类声明中的类名
//■ 模块导入
//■ catch()块
//■ （非严格模式下，）向一个不存在的变量名赋值
function s4() {
	//重写undefined并不会导致异常
	undefined = 'abc';
	//但是操作无效
	console.log(undefined);

	//undefined是global的一个属性
	console.log(undefined in window);
	//null不是
	console.log(null in window);

	//undefined是global的一个只读属性
	const res = Object.getOwnPropertyDescriptor(window, 'undefined');
	//configurable: false,enumerable: false,value: undefined,writable: false
	console.log(res);
	//在严格模式下写该属性仍然会导致异常
	try {
		Function('"use strict";undefined = "abc";')();
	} catch (e) {
		console.log(e);
	}

	//Object()构造器“作为全局对象的属性”是可写的
	const res1 = Object.getOwnPropertyDescriptor(window, 'Object');
	console.log(res1);
	//可重写的全局标识符
	const res2 = Object.getOwnPropertyNames(window).filter((key) => Object.getOwnPropertyDescriptor(window, key).writable);
	console.log(res2);
}

// s4();
//就“标识符能否重写”这一问题来说，对于对象环境记录，
//取决于该标识符作为对象属性时的“可写性”性质；对于声明环境记录，
//则取决于该标识符在代码上下文中（并由引擎登记于“环境记录”时）的“可写性”声明，
//例如const/let/var。

//6.5.1.2 声明对标识符可写性的影响
//var、let和const

//6.5.1.3 赋值操作带来的重写
function s5() {
	let a = {};

	//引用
	a = 3;
	//非引用
	try {
		// 5 = 3;
	} catch (e) {
		console.log(e);
	}

	//当Result用作lhs时，它如果是一个“引用规范类型”，
	//那么就是用来确指某个“被其他东西‘引用’”了的数据，
	//而无所谓这个“被引用”的数据是何种性质（对象/非对象）。
	//所以根本上不是数据“是值还是引用类型”，而是数据“是否‘被引用’”。

	//在JavaScript中，数据可以被某个环境/作用域中的标识符引用，
	//或者被对象（以及集合）的成员引用，再或者，就是被一个“未被确定的对象”引用。
	//这些情况都是存在的，都是“合法的引用”，例如：

	//abc可能是一个“未确定的（unresolvable）”引用，并需要后续被动态地创建
	//并绑定给global
	function foo() {
		abc = 100;
	}

	//被全局环境（全局环境记录是一种内部结构）引用
	var x = 100;

	//x被对象obj作为对象引用
	var obj = { x };

	try {
		[100].pop()++;
	} catch (e) {
		console.log(e);
	}

	const res = [100][0]++;
	console.log(res);
}

// s5();
//当一个操作数作为lhs时，要执行的是“（检查它被谁引用，并）取引用”操作；
//反之作为rhs时，要执行的是“取值”操作。
//这才构成了赋值语句的完整语义（value get from rhs，and put it to lhs'sreference）。

//由于操作数作为lhs时是需要“取引用”的，因此如果赋值操作左侧的数据“没有被引用”，
//就会出现“引用错误（ReferenceError）”；再进一步，如果左侧是被引用的，
//但当其可写性为false（是常量或只读的属性）时，就会出现“类型错误（TypeError）”。

//而这就是重写在赋值操作中的两个主要限制：可引用与可写。

//6.5.1.4 对象内部方法对重写的影响
function s6() {
	//当lhs是一个对象属性时，赋值操作将调用对象的[[Set]]内部方法来置值
	var obj = {};
	Object.defineProperty(obj, 'x', { value: 100, configurable: true });

	//obj.x是只读的，输出false
	console.log(Object.getOwnPropertyDescriptor(obj, 'x').writable);

	//尝试重写
	obj.x = 200;

	//内部方法[[Set]]将忽略上述的操作
	console.log(obj.x);

	//由于JavaScript没有提供直接操作内部槽[[Set]]的方法，
	//所以我们借助Proxy来展示这一过程。例如：
	obj = new Proxy(obj, {
		set(target, key, value) {
			if (key === 'x' && Object.getOwnPropertyDescriptor(target, key).configurable) {
				return Reflect.defineProperty(target, key, { value });
			}

			return Reflect.set(target, key, value);
		},
	});

	//写值
	obj.x = 2000;

	//取值
	console.log(obj.x);

	//检查属性的性质
	console.log(Object.getOwnPropertyDescriptor(obj, 'x'));
}

// s6();
//如果一个属性的writable为false，可以使用defineProperty方法强制置值

//6.5.1.5 非赋值操作带来的重写
//除了常见的赋值、解构赋值和复合赋值操作之外，
//值的自增/自减运符（++/--）也是典型可重写的。
//自增/自减运算符会先隐式地将操作数转换成数值类型，
//并将标识符重写为最终运算的结果。因此也可能导致标识符的数据类型发生变化，
//例如：
function s7() {
	//数据类型为字符串
	var x = 'a';
	console.log(typeof x);

	//导致类型被重写为number
	x++;
	console.log(typeof x, x);

	//for和for...in/of语句中也存在标识符声明或赋值形式的重写，这取决于具体的写法。
	//例如：

	//这种是声明而非重写（每次迭代都会为body块重新创建作用域）
	for (const x in 'obj') {
		//...
	}

	//这种是重写
	var y;
	for (y in 'obj') {
		//...
	}

	//另一种可能
	for (var z = 0 in 'obj') {
		//...
	}

	//try...catch
	//最后，try...catch中的catch块是可以声明标识符的。
	//但是它们[插图]以一种类似let声明的方式被声明在catch子句的块级作用域中，
	//因此它们既不能在catch块之外访问，也不能被catch块中的其他声明
	//覆盖（但可以赋值重写）。例如：
	try {
		try {
			throw { message: 'ERROR!', code: 100 };
		} catch ({ message, code }) {
			//这里声明将触发异常
			// var message = 'NOTHING';
			console.log(message, code);
		}
	} catch (e) {
		//同上，变量e不能被重新声明，但可以被重写
		e = { message: 'new error message' };
		console.log(e);
	}
}

// s7();

//6.5.1.6 条件化声明中的重写
//“条件化声明”允许在函数或全局块中使用if语句来有条件地向标识符绑定值。
//由于只有var声明和（内嵌的）具名函数声明是处于函数作用域的，
//因此它（即，有条件地初始绑定）的“条件子句”只能使var和具名函数的声明
//在当前函数（或全局作用域）中重写标识符，而不能用在let/const/class声明
//的名字中。例如：
function s8() {
	var x = 100;

	function foo(cond) {
		console.log(x); //undefined，在当前函数作用域中的、未被绑定的标识符x

		if (cond) {
			//条件化声明，在其分支中可支持var和具名函数
			// var x = 1000;
			let x = 1000;
		} else {
			// function x() {}
			const x = 1000;
		}

		console.log(x);
	}

	foo(true);
	foo(false);
}

// s8();

//6.5.1.7 运算优先级与引用的暂存
//赋值是典型的可用于重写的运算符，但是赋值运算的优先级很低，
//例如，它远远低于属性存取运算。这带来了一些典型的表达式运算效果，例如：
function s9() {
	//对象x
	var x = { a: 200 };

	//示例（赋值）
	// x.a = 200;

	// x.a = x = 1;

	// console.log(x);
	// console.log(x.a);

	//用r来得到最开始x变量的一个引用
	var r = (x = { a: 100 });

	//重写x，对于右结合（即“关联性”从右至左）的操作符来说，
	//在同级操作符中，运算数是优先供右侧运算符使用的。
	//“op=”与“=”也是同级别的运算符，同样适用于上述规则
	x.a = x = 1;

	//x被重写
	console.log(x);

	//在连续赋值中“被暂存的”x.a也被成功赋值
	console.log(r.a);
}

// s9();

//6.5.2 原型重写
//原型继承的一些问题是难于规避的，例如原型重写。正因为原型是可以重写的，
//所以事实上你可以用相同构造器构造出完全不同的实例来。下例说明了这种情况：
function s10() {
	function MyObject() {}

	var obj1 = new MyObject();

	MyObject.prototype.type = 'MyObject';
	MyObject.prototype.value = 'test';

	var obj2 = new MyObject();

	MyObject.prototype = {
		constructor: MyObject,
		type: 'Bird',
		fly: function () {},
	};

	var obj3 = new MyObject();

	console.log(obj1.type);
	console.log(obj2.type);
	console.log(obj3.type);

	console.log(obj1 instanceof MyObject); //false
	console.log(obj2 instanceof MyObject); //false
	// obj1.__proto__ === MyObject.prototype;
	// obj1.__proto__.constructor === MyObject;

	console.log(obj3 instanceof MyObject); //true
}

// s10();
//在JavaScript中，我们无法保证对象与其构造器“必然”存在某种相似性。
//然而，这样（至少在代码的字面语义上）也就违背了“面向对象系统”的基本原则。
//重写机制的存在，将导致同一个构造器可能存在多套原型系统。
//当构造器的当前原型被重写时，意味着“此前的一个原型被废弃”。
//因此在由该构造器所构造的实例中：
//■ 旧的实例使用这个被废弃的原型，并受旧原型的影响。
//■ 新创建的实例则使用重写后的原型，受新原型的影响。

//6.5.3 构造器重写
//接下来我们讨论直接重写构造器本身的情况。这包括两种重写方法，
//第一种是用const/let/var声明的标识符，或者import导入的标识符，
//又或者用class或function关键字声明的标识符等来覆盖旧的构造器名；
//另一种是直接向旧的构造器名赋一个新的值。
//这两种方式在本质上没有区别，只不过是“标识符重写”的具体实现方式不同而已。

//6.5.3.1 重写Object()
function s11() {
	//1，备份一个系统内部的Object()
	var NativeObject = Object;

	//2，重写
	// Object = function () {};

	//3，声明构造器
	function MyObject() {}

	//4，构造器的原型对象（Constructor.prototype）总是创建自NativeObject
	console.log(MyObject.prototype instanceof NativeObject);
	console.log(MyObject.prototype instanceof Object);

	//同样地，所谓“重写Object()”事实上只会影响到显式地引用Object这个标识符
	//（例如new、instanceof或函数调用运算），JavaScript引擎在内部处理时
	//既不直接使用（作为global对象成员的）Object这个标识符，
	//也不直接使用Object.prototype这个属性。

	//这也意味着“重写构造器”事实上也不会影响到其他引擎内置的特性，
	//例如字面量声明。在ECMAScript规范中，所有对象字面量声明
	//（例如，对象、数组、函数或正则表达式等）都是与它们
	//对应的原生构造器和原型相关的[插图]，尽管用户代码可以重写这些构造器，
	//但并不会对字面量声明构成什么影响。例如：

	//1，取一个系统默认的字符串字面量
	var str1 = 'abc';

	//2，重写String()构造器
	String = function () {};
	String.prototype.name = 'myString';

	//3，取重写后的字符串字面量
	var str2 = '123';

	//4，如果name成员有值，则证明重写会影响到字面量
	console.log(str1.name);
	console.log(str2.name);

	//当然，我们也可以使新的构造器与原生构造器关联起来，
	//这在多数情况下是可行且有价值的。
  
	//5，置新String()构造器的原型
	Object.setPrototypeOf(String.prototype, Object.getPrototypeOf(' '));
	// 'str'---->String()---->String.prototype---->StringOri()---->StringOri.prototype
	String.prototype.__proto__.name = 'myString';
	var str3 = 'zxc';
	console.log(str3.name);
}

// s11();

//6.5.3.2 使用类声明来重写
function s12() {
	// class Object extends Object {}
	//在类声明语法中，extends ParentClass这个部分是可执行的。
	//并且由于JavaScript约定类声明支持块级语法作用域，
	//因此JavaScript需要保证ParentClass这个部分（作为一个表达式时）
	//执行在类声明自己的块级作用域中。这个作用域在对class ClassName...
	//这个语法进行解释执行时就得以创建，并且当ClassName这个语法元素存在时，
	//总是先将该名字添加到作用域中。简单地说，这时class的块作用域中有且仅有
	//ClassName这个标识符。
	//于是当开始处理extends ParentClass并试图将ParentClass作为表达式执行时，
	//Object已经被声明为一个（当前作用域中的）新的、未绑定值的标识符。
	//所以，要么触发“Object is not defined”这样的错误（Node.js/Chrome），
	//要么触发“Cannot access uninitialized variable.”这样的错误（Safari/Firefox），
	//但总之是一个ReferenceError类型的异常。所以，换个方式去引用这个标识符
	//就可以了：
	// class Object extends window.Object {}
	//同样的问题不会发生在“用类声明去重写用户定义的函数/构造器”的情况下。
	//这是因为class会提前声明于所在作用域（包括全局或函数等），
	//并拒绝被其他声明覆盖。即，这并非是重写导致的问题，
	//而是语法上它们（let/const/class）不能被重复声明。例如：
	//声明一个函数/构造器
	// var MyObject = new Function();
	//尝试重写
	// class MyObject {} //SyntaxError
	//之前我们强调重写Object()会出现的ReferenceError（而非这里的SyntaxError），
	//是因为Object本质上是global对象的属性名，而非var/let/const这样的标识符声明。
	//所以这种重写方法，也通常只应用于系统内建的、
	//可以以global.xxx方式引用的那些构造器。
}

// s12();

//6.5.3.3 继承关系的丢失
//一般来说，重写构造器可能导致的主要问题就是原有继承关系的丢失。如下例：
function s13() {
	//示例1：重写-执行期重写声明过的标识符
	function MyObject() {}

	var obj1 = new MyObject();

	MyObject = function () {};

	var obj2 = new MyObject();

	//测试
	console.log(obj2 instanceof MyObject);
	console.log(obj1 instanceof MyObject);
	console.log(obj1 instanceof obj1.constructor);
}

// s13();
//在该例中，由于在第6行重写了MyObject()，
//因此使用重写前的MyObject()创建的obj1不能通过第12行代码的instanceof检查。
//这本身也是标识符重写的意义所在，且在第13行显示true值，
//也表明这种重写并不影响该实例的继承关系。
//所以第12行表现出来的“（显式的）继承关系丢失”可以说是一种代码逻辑上的假象：
//在代码不能感知的情况下重写了构造器—因而可能会导致后续代码的一些意外。

//而函数或类的重复声明，会让重写更早地发生。上例的一个修改版本如下：
function s14() {
	//示例2：语法分析期的覆盖
	function MyObject() {}

	var obj1 = new MyObject();

	//MyObject()的两个函数声明在语法分析期就出现了标识符覆盖，
	//也就是后面的声明覆盖了前面的，于是最终只有后一个声明是真正的MyObject()。
	function MyObject() {}

	var obj2 = new MyObject();

	//测试
	console.log(obj2 instanceof MyObject);
	console.log(obj1 instanceof MyObject);
	console.log(obj1 instanceof obj1.constructor);
}

// s14();

function s15() {
	//示例3：重写-执行期重写变量
	//将“语法声明覆盖”变成了“变量重写
	MyObject = function () {};

	var obj1 = new MyObject();

	function MyObject() {}

	var obj2 = new MyObject();

	//测试
	console.log(obj2 instanceof MyObject);
	console.log(obj1 instanceof MyObject);
	console.log(obj1 instanceof obj1.constructor);
}

// s15();

//6.5.4 对象成员的重写
//在不考虑宿主的情况下，JavaScript对象中的所有成员几乎都可以被重写。
//而对象成员重写与标识符重写在逻辑上并不一致，
//这也是重写Object()表现出奇异特性的原因之一。

//此外，JavaScript专门提供了一组Symbol.xxx符号，
//开放了让用户重写对象内部成员的接口，这也是JavaScript元编程的基础技术之一
//（参见“3.6运行期侵入与元编程系统”）。

//由于成员重写在本质上是更新对象自有成员的属性描述符的具体性质，
//因此几乎所有的重写效果都与这些性质有关。
//JavaScript开放了全部属性性质检查的接口，
//也使得我们有机会了解关于这一技术的全部细节。
//Object.defineProperty()
//例如：

function s16() {
	var overrideDisabled = ([_, desc]) => !desc.configurable && !desc.writable;
	var toDesc = (key) => [key, Object.getOwnPropertyDescriptor(window, key)];
	var allDescriptor = Object.getOwnPropertyNames(window).map(toDesc);

	console.log(allDescriptor);
	const result = allDescriptor.filter(overrideDisabled).map(([key]) => key);
	console.log(result);
}

// s16();

//6.5.4.1 成员重写的检测
//通过hasOwnProperty()方法我们总可以检测一个成员是否被重写，这并不难做到。
function s17() {
	//检测成员是否是重写的
	var isRewrited = function (obj, key) {
		//自身拥有属性且原型链中能查找到
		return obj.hasOwnProperty(key) && key in Object.getPrototypeOf(obj);
	};

	//检测成员是否是继承来的
	var isInherited = function (obj, key) {
		//属性在原型链中能查找到且自身不拥有
		return key in obj && !obj.hasOwnProperty(key);
	};

	//创建一个字符串对象的实例
	var x = new String();

	//字符串（实例x）有一个名为charAt的属性，且它是继承来的
	console.log(isInherited(x, 'charAt')); // true

	//字符串（原型）的charAt属性是自有的（不是继承来的）
	console.log(String.prototype.hasOwnProperty('charAt')); // true
	console.log(isInherited(String.prototype, 'charAt')); // false 自身拥有属性

	//字符串（实例x）重写了名为charAt的属性，这导致它不再是继承来的属性
	x.charAt = new Function();
	console.log(isRewrited(x, 'charAt')); // true
	console.log(isInherited(x, 'charAt')); // false 自身拥有属性

	//但是继承可以是多层的，所以在JavaScript中出现了“属性由哪个原型来实现
	//（而又有哪些原型只是重写了它）”的问题。因此进一步的问题是：
	//需要不断地访问父类及其原型，来检测成员重写的情况。例如：
	var getPropertyOwner = function f(obj, key) {
		return !obj ? null : obj.hasOwnProperty(key) ? obj : f(Object.getPrototypeOf(obj), key);
	};

	//测试如下：
	//属性是重写的
	console.log(isRewrited(x, 'charAt')); // true
	//所以owner也是对象自身
	console.log(getPropertyOwner(x, 'charAt') === x); // true

	//添加一个全新的属性
	x.branew = 'Bran-new';
	//它不是继承来的
	isInherited(x, 'branew'); // false
	//也没有更上层的属主
	console.log(getPropertyOwner(Object.getPrototypeOf(x), 'branew')); // null
}

// s17();

//6.5.4.2 成员重写的删除
//一旦属性是在原型中添加的，那么就不能直接从对象中删除它，
//而只能从原型（以及其父类的原型）中删除，但是这一过程并不安全，
//因为会影响到该类创建的其他实例。例如：
function s18() {
	//在原型中声明属性
	function MyObject() {}
	MyObject.prototype.name = 'MyObject';

	//创建实例
	var obj1 = new MyObject();
	var obj2 = new MyObject();

	//下面的代码并不会使obj1.name被删除掉
	delete obj1.name;
	console.log(obj1.name); // 'MyObject'

	//下面的代码可以删除obj1.name，但由于是对原型进行操作，所以也会使
	//obj2.name被删除
	delete Object.getPrototypeOf(obj1).name;

	console.log(obj1.name); // undefined
	console.log(obj2.name); // undefined

	// 可以使用如下的deepDeleteProperty()函数回溯原型链并删除所有的重写属性，
	//但你必须为这一行为的安全性负责：
	var getPropertyOwner = function f(obj, key) {
		return !obj ? null : obj.hasOwnProperty(key) ? obj : f(Object.getPrototypeOf(obj), key);
	};

	function deepDeleteProperty(obj, key) {
		//原型链及自身上都未查找到属性，返回false
		if (!(key in obj)) {
			return false;
		}

		//在原型链上遍历寻找拥有该属性的对象，使用Reflect.deleteProperty方法删除
		//当Reflect.deleteProperty方法返回false，即原型链遍历结束，或遍历到的属性
		//为configurable-false时，结束遍历
		//亦即遍历删除链会被configurable-false的属性阻断
		while ((obj = getPropertyOwner(obj, key))) {
			//在while循环中执行return会退出while循环
			if (!Reflect.deleteProperty(obj, key)) {
				return false;
			}
		}

		return true;
	}

	//创建实例
	var baseObj = Object.create({ value: 100 });
	var obj1 = Object.create(baseObj);
	var obj2 = Object.create(baseObj);

	//重写
	obj1.value = 200;
	console.log(obj1.value); // 200
	console.log(obj2.value); // 100

	//删除成员'value'
	//（注意将导致所有‘’相同原型的子类对象的该成员被删除）
	deepDeleteProperty(obj1, 'value');
	console.log(obj1.value); // undefined
	console.log(obj2.value); // undefined
}

// s18();

//6.5.4.3 成员重写对作用域的影响
// global.value = '999';
function s19() {
	//添加Object.prototype.x成员
	Object.prototype.x = 100;

	//全局变量x
	console.log(x);

	//检查global（父类）的原型
	console.log(Object.getPrototypeOf(global).__proto__ === Object.prototype);
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(global)) === Object.prototype);
	//原型链
	//global---(Global)---(Global.prototype)---Object---Object.prototype

	//global被“视为”从Object()构造出来的一般对象
	console.log(global.constructor === Object);

	//使用with闭包对象与全局对象（以及全局作用域）的效果一致。
	//并且（由于相同的原因）它们的成员存取也是动态的，
	//例如可以在with语句中动态地添加一个成员：
	var y = 100;

	//将一个对象字面量打开用作对象闭包，并在它的作用域中执行代码
	//（在对象闭包中，valueOf()方法“通常”返回对象自身）
	with ({ x: 200 }) {
		valueOf().y = 300;
		console.log(x, y);
		delete y;
		console.log(x, y);
	}

	//for...in/of等使用迭代器的存取就不是动态的了，
	//因此在它们的迭代器“打开”之后新添加的成员不会出现在列举表中；
	//但是每个成员值的读取却是一个动态过程，
	//因此这种情况下访问值（而不是列举值）是会受到重写的影响的。例如：
	var m = 100,
		n = 200,
		tries = 0;

	//在with语句的作用域中执行代码
	//（不在with语句后使用大括号，以避免使用块语句的作用域）
	with ({ m, n })
		for (key in valueOf()) {
			if (tries++ == 0) {
				//first,add new property
				valueOf().z = 300;
				console.log('SHOW : ', 'z', z);
			}

			console.log('FORIN: ', key, eval(key));
		}
}

// s19();
//...TODO

//6.5.5 引擎对重写的限制
//6.5.5.1 this与super等关键字的重写
function s20() {
	//this引用不能被重写，是最常见的引擎对重写的限制。例如：
	function MyObject() {
		// this = null;
	}

	//以下代码将产生异常
	// this = null;
	// new MyObject();

	//但JavaScript并不阻止用户代码将包括this、
	//super和new等关键字在内的名字作为属性名。例如：
	global.this = 'hello';
	console.log(this === global);
	console.log(this.this);

	//然而这并不意味着用户代码可以重写对象闭包中的this引用，
	//例如，在下面的代码中，并不能通过this引用访问到x：
	var x = { value: 100 };
	var value = 1000;

	//显示值：1000
	with ({ this: x }) {
		console.log(this);
	}
}

// s20();

//TODO

//6.6 动态执行--------------------------------------------------------------------------------------
/**
 * 动态执行系统基本可以分为动态装载与动态执行（eval）两个阶段。
 * 但在某些系统中可能将两个阶段合二为一。
 * 例如，DOS批处理中的call命令即装入并执行另一个批处理：
 *
 * 而JavaScript就将装载与执行分成两个阶段。对于动态执行来说，
 * 它处理的对象是一个字符串格式的“源代码文本（SourceText）”，
 * 至于该字符串文本是来自Internet还是本地文件，并不是它需要密切关注的。
 *
 * 因此，接下来的内容将主要讲述动态执行，这主要是由eval()方法带来的效果。
 * 并且由于函数对象会部分涉及动态执行逻辑，因此我在本节的最后部分将略作提及。
 *
 * 此外，eval()的参数只接受（唯一一个）字符串值，如果参数是其他类型的
 * 数据—包括字符串对象实例，那么eval()只是原封不动地返回该值，
 * 而不会有其他任何效果。
 */

//6.6.1 eval()作为函数名的特殊性
//在严格模式中对eval这个名字进行初始绑定或重新绑定（即“重写”）
//都将导致语法错误，而无论它代表的是函数、值、形式参数，还是未声明的变量。
//名字arguments在严格模式中的限制也与此相同。
//二者都是通过名字识别并进行限制的，而非判断它们绑定的值。
function s21() {
	// 解析期即触发SyntaxError
	//SyntaxError: Unexpected eval or arguments in strict mode
	// function f(eval) {
	// 	'use strict';
	// }

	//使obj.eval指向原生的eval()函数
	const obj = { eval };

	//sourceText执行中的this指向global
	const result = obj.eval('this') === Function('return this')();
	console.log(result);

	//**eval作为方法执行时,this总是指向global（而无论obj是否是global）
	const result1 = obj.eval('this') === global.eval('this');
	console.log(result1);

	//**当它作为一般函数调用时，this指向当前上下文中的this
	const result2 = global.eval('this') === eval('this');
	console.log(result2);

	//示例1：在箭头函数中eval()对this的引用以及箭头函数的闭包的使用
	var thisArg = new Object();
	function foo(data) {
		var test = (x) => eval('console.log(this === thisArg,x)');
		test(data); // 将data作为x的参数传入
	}

	//绑定thisArg，并传入
	foo.call(thisArg, 100); // true,100

	//示例2：对对象闭包的使用
	var obj1 = { x: 1 };
	with (obj) {
		//对象闭包不能改变当前的this引用，所以这里的this指向global
		eval('console.log(this === global,x)'); // true,1
	}
}

// s21();

//6.6.2 eval()在不同上下文环境中的效果
//因为eval的代码将尽量执行于eval()的实际位置的上下文中，
//所以我们接下来对这些不同类型的上下文分别加以讨论，
//以说明它们与eval()之间的相互影响。这些环境或上下文也包括不同的函数类型，
//以及严格模式。

//6.6.2.1 eval使用全局环境
function s22() {
	//测试1：eval工作在全局环境
	var x = 100;

	eval('x = 1000'); // rewrite 'x'
	console.log(x);

	//测试2：eval工作在if语句的块级作用域
	if (true) {
		// a new block scope
		let x = 'a';
		eval('x = "b"');
		console.log(x);
	}

	console.log(x);

	//测试3：eval工作在with打开的闭包对象中（注意没有用大括号创建一个新的块）
	var obj = { eval, x: true };

	with (obj) eval('x = false');

	console.log(obj.x);
	console.log(x);
}

// s22();

/**
 * .
 * .
 * .
 * .
 * .
 */

//6.6.7 其他的动态执行的逻辑
//6.6.7.1 动态创建的函数
function s23() {
	var AsyncFunction = (async (x) => x).constructor;
	var valueInScope = 'window';

	function test() {
		var valueInScope = 'function test';

		(async function () {
			return 'def: ' + valueInScope;
		})().then(console.log);

		new AsyncFunction("return 'new: ' + valueInScope")().then(console.log);
	}

	test();
}

// s23();

//6.6.7.2 模板与动态执行
//6.6.7.3 宿主的动态执行逻辑

//6.7 动态方法调用（call、apply与bind）----------------------------------------------------
/**
 * 函数eval（x）的入口参数x、new Function（x）中作为代码体的x，
 * 还包括在模板字符串“`${x}`”中的表达式x等，这些都可以视为动态执行的执行体。
 * 当然，你也可以将一个函数对象视为执行体，并通过运算符“()”来执行它，
 * 这称为函数调用。
 *
 * 无论是动态函数的调用，还是静态函数的调用，又或者是隐式地
 * 触发一个函数调用（例如，对象的get/set，或者Symbol.iterator符号属性），
 * 只要它们是面向函数的，那么就存在一个完全相同的动态执行机制：
 * 它们可以使用apply()和call()方法来动态地执行，或者使用bind()方法来
 * 提前决定传入的this和其他参数。
 */

//6.7.1 动态方法调用以及this引用的管理
function s24() {
	function calc_area(w, h) {
		console.log(w * h);
	}

	function Area() {
		this.name = 'MyObject';
	}

	Area.prototype.doCalc = function (v1, v2) {
		calc_area.call(this, v1, v2);
	};

	Area.prototype.doCalc1 = function (v1) {
		var slice = Array.prototype.slice;

		calc_area.apply(this, [v1 * 2].concat(slice.call(arguments, 1)));
	};

	Area.prototype.doCalc1 = function (v1, ...args) {
		calc_area.apply(this, [v1 * 2, ...args]);
	};

	Area.prototype.doCalc2 = function (v1, ...args) {
		calc_area.call(this, v1 * 2, ...args);
	};

	var area = new Area();

	area.doCalc(10, 20);

	var Area1 = {
		doCalc() {
			// 未声明形式参数
			arguments[0] *= 2;
			calc_area.apply(this, arguments);
			console.log(this === Area1);
		},
	};

	Area1.doCalc(10, 20);

	var Area2 = {
		doCalc(x) {
			x *= 2;
			calc_area.apply(this, arguments);
		},
	};

	Area2.doCalc(10, 100);

	//但在非简单参数中并不支持这样做，因为这种情况下形式参数与arguments并不绑定：
	var Area3 = {
		doCalc(x = 5) {
			x *= 2;
			console.log('arguments', arguments);
			calc_area.apply(this, arguments);
		},
	};

	Area3.doCalc(10, 100);
}

// s24();

//6.7.2 丢失的this引用
//除了非简单参数中“形式参数与arguments不绑定”之外，
//在JavaScript中还有一种丢失绑定的情况，即在call/apply调用中，
//对于箭头函数来说this不绑定。
function s25() {
	var x = 2,
		y = 3;

	//模拟window环境
	this.x = 2;
	this.y = 3;

	//箭头函数使用当前词法上下文（这里的function s25）中的this
	var calc_area = () => console.log(this.x * this.y);

	//传入对象a，但calc_area并不使用
	var a = { x: 100, y: 200 };
	calc_area.call(a);

	//相较于这种隐式的丢失绑定，更加常见的其实是显式地丢失this引用。
	//也就是说，对于一个需要使用this对象的函数（或方法）来说，没有传入this引用。

	//一般函数
	var calc_area1 = function () {
		console.log(this.x * this.y);
	};

	//没有传入有效的this
	calc_area1.call();

	//或者直接将calc_area作为函数使用，因此没有this传入
	calc_area1();

	//可见，在函数内是否使用this是一个关键的设问，然而就目前来说，
	//函数并没有任何方式向外部暴露这一信息。当这样的问题出现在用户代码中时，
	//你可能需要为它封装一个“显式绑定this的过程。
	//例如，使用读写器方法来设置一个“函数类型的属性”：
	var id = 'global';
	var obj = { id: 'MyObj' };

	console.log('outer this', this);

	Object.defineProperty(obj, 'foo', {
		// 存取器属性的get和set函数的this永远是其所属对象
		get() {
			console.log('this in get()', this);

			return () => {
				console.log('this in cb', this);
				console.log(this.id);
			};
		},
	});

	obj.foo();
	var f = obj.foo;
	f();
}

// s25();

//类似地，这种方法也可以用在方法声明上（包括类的静态方法）。例如：
function s26() {
	console.log(this === window);

	class MyObj {
		constructor(id) {
			this.id = id;
		}

		// id = 'id in class';

		get foo() {
			//普通函数的this是动态的，由其被调用的环境决定并传入
			//箭头函数的this是静态的，由其被定义时的上下文决定
			return () => {
				console.log(this.id);
			};

			// console.log('this in get', this);

			// return function y() {
			// 	console.log(this.id);
			// };
		}
	}

	console.log(MyObj);

	window.f = new MyObj('o1').foo;
	// console.log(g);

	f();

	window.f = new MyObj('o2').foo;
	f();

	//示例：箭头函数会忽略其他方法的this绑定
	window.obj = { id: 'obj', foo: f };
	window.obj.foo();
	window.obj.foo.call(obj);
	window.obj.foo.apply(obj);
}

// s26();

//6.7.3 bind()方法与函数的延迟调用
//bind()的作用是将函数绑定到一个对象上，并返回绑定后的函数。
//绑定后的函数总是作为该对象的一个方法来调用的，即this引用指向该对象—
//无论它是否置为其他对象的属性，或直接作为函数调用。
function s27() {
	window.obj = {};

	function foo() {
		return this;
	}

	window.foo2 = foo.bind(obj);

	const obj2 = {};
	obj2.foo2 = foo2;

	console.log(obj === foo2());
	console.log(obj === window.foo2());
	console.log(obj === obj2.foo2());
}

// s27();

//bind()方法也采用类似call()方法的方式传入一系列参数。
//在这种情况下，这些参数被暂存到调用该函数时才使用，而不是在当前就使用。
function s28() {
	window.obj = { msg: 'message' };

	function foo(a) {
		console.log(this.msg + a);
	}

	//绑定时并不触发foo()的调用，因此参数a被暂存
	window.foo2 = foo.bind(obj, 'abc');

	//显示'message:abc'
	//参数值123被忽略
	foo2(123);
}

// s28();

//bind()方法绑定后的函数仍然可以作为构造器使用，
//并允许使用上述的传入参数。在这种情况下，构造出来的对象
//既是“绑定后的函数”的一个实例，同时也是原来的—绑定前的函数的一个实例。
function s29() {
	const obj = {};

	function foo(a) {
		console.log(this === obj); //false，进行new运算时，this指向新实例

		console.log(a); //'abc'，函数只存在一个形参，被bind传入的'abc'占用，new()运算中传入的参数被忽略
	}

	const Foo = foo.bind(obj, 'abc');

	const newInstance = new Foo('123');

	console.log(newInstance instanceof foo); // true
	console.log(newInstance instanceof Foo);
	// true，被bind返回的函数参与instanceof运算时，
	//向运算返回的是<绑定前的函数>.prototype
	//亦即是说，bind()方法返回的函数是不存在prototype属性的，见下

	console.log('prototype' in Foo); // false
}

// s29();

//bind()方法的传入参数，总是被暂存且在调用时作为最开始的几个参数。
//这里的意思是，最终参数的个数是一个动态的组合（既包括绑定时预设的，
//也包括调用时新加的），例如：
function s30() {
	function foo() {
		console.log(arguments.length, ...arguments);
	}

	//总是绑定前三个参数
	const f = foo.bind(null, 1, 2, 3);

	//添加两个新参数，一共5个
	f('a', 'b');

	//添加0个新参数
	f();

	//并且绑定函数是可以再次绑定的，参数也将向前叠加
	//再次绑定，并叠加两个参数
	const f2 = f.bind(new Object(), 'a', 'b');

	//现在有5个绑定过的参数了，再添加两个动态的
	f2('x', 'y');

	//然而在这个例子中，new Object所创建的新对象并不会作为最终foo()
	//调用的this引用，因为在f()中将总是使用它绑定过的null值。也就是说，
	//在多次绑定中，参数是向前叠加的，但this绑定并不向前覆盖。
}

// s30();

//6.7.4 栈的可见与修改
//在之前通过apply()方法传送arguments的例子带来了一种潜在的风险：
//既然arguments是一个对象，那么在被调用函数中修改arguments对象成员，
//是不是会影响到调用者中的参数值呢？
//答案是否定的。下面的例子说明了这一点：
function s31() {
	function func_1(v1) {
		v1 = 100;
	}

	function func_2(name) {
		func_1.apply(this, arguments); //window,['MyName']
		console.log(name);
	}

	//显示传入参数未被修改，值仍为'MyName'
	func_2('MyName');

	//尽管看起来func_1与func_2中使用的arguments是同一个，
	//但事实上在调用func_1.apply()时，arguments被做了一次复制：
	//值数据被复制，引用数据被创建引用。因此，func_1与func_2中
	//的arguments看起来是相同的，其实却是被隔离的两套数据。

	function func_1() {
		//arguments.callee属性指向arguments所属的函数
		//Function.caller属性指向调用它的函数，若在全局作用域内被调用，则为null
		console.log(arguments.callee.caller === func_2);
	}

	//尽管arguments在apply()与call()时是通过复制加以隔离的，
	//但是调用栈对于被调用函数来说仍然可见，被调用函数仍然可以访问栈上的arguments。
	//如下例：
	function func_3() {
		arguments.callee.caller.arguments[0] = 100;
		Array.prototype.push.call(arguments.callee.caller.arguments, 300, 1, 1, 1, 1);
	}

	function func_4(name) {
		func_3();
		console.log(arguments[0], arguments.length, name);
	}

	func_4('MyName');

	/**
	 * .
	 * .测试显示arguments不能被修改
	 * .
	 */
}

// s31();

function useStrictMode() {
	'use strict';

	//在严格模式下，arguments.callee属性的读取和赋值都会抛出异常
	console.log(arguments.callee);
}

// useStrictMode()

//6.7.5 严格模式中的this绑定问题
//函数的call()与apply()方法在严格模式与非严格模式中有一些差异，
//这些差异也适用于之前讨论到的bind()方法。具体来说会有以下两点区别。

//其一，在非严格模式（以及ES3标准）中，如果call()/apply()方法的
//第一个参数传入null或undefined，那么在函数内的this将指向全局对象（global）
//或顶层对象（例如浏览器中的window）；而在严格模式中，
//this将仍然使用null或undefined—这意味着在严格模式下的call/apply中，
//的确会存在访问this引用导致异常的情况。

//其二，在非严格模式（以及ES3标准）中，如果call()/apply()方法
//的第一个参数传入一个值类型的数据，那么它会被先包装为对象再送入
//函数作为this引用；而在严格模式中并不会发生这个包装过程，
//而是仍然直接送入该值。
function s32() {
	function f() {
		'use strict';
		var msg = this === undefined ? 'undefined' : this === null ? 'null' : '';

		console.log(msg || typeof this);
	}

	//差异1：在aFunction.call()的第一个参数中传入undefined/null值
	// - 在严格模式中显示值：undefined/null
	// - 在非严格模式中显示为（全局对象或顶层对象的类型值）：object
	f.call(null);
	f.call(undefined);

	//差异2：在aFunction.call()的第一个参数中传入值类型数据
	// - 在严格模式中显示typeof值：string、number等
	// - 在非严格模式中显示为object
	f.call('abc');
	f.call(2);
	f.call(true);
}

// s32();

//由于在严格模式下call/apply/bind不对第一个参数进行修改而直接传入，
//因此用户代码中确实会面临this值为null/undefined的情况，
//也会面临this值不是对象—尽管在使用属性存取运算符时会自动包装为对象—的情况。

//ES5之后对这一点的设计初衷在于：在非严格模式下，将尽量推测代码的意图，
//以保证代码不抛出异常；而在严格模式下，如果发生异常则必然是用户代码存有
//不明确的语义所致的，并且这种异常应当由外围的或严格模式下的try...catch来及时处理。

//6.8 通用执行环境的实现----------------------------------------------------------------------------
//略
