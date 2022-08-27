/** Chapter2：this、call和apply */
//在JavaScript编程中，this关键字总是让初学者感到迷惑，
//Function.prototype.call和Function.prototype.apply这两个方法也有着广泛的运用。
//我们有必要在学习设计模式之前先理解这几个概念。

//2.1 this------------------------------------------------------------------------------------------------
//跟别的语言大相径庭的是，JavaScript的this总是指向一个对象，
//而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

//2.1.1 this的指向
//❏ 作为对象的方法调用。
//❏ 作为普通函数调用。
//❏ 构造器调用。
//❏ Function.prototype.call或Function.prototype.apply调用。

//call和apply方法能很好地体现JavaScript的函数式语言特性，
//在JavaScript中，几乎每一次编写函数式语言风格的代码，都离不开call和apply

//2.1.2 丢失的this
function tot() {
	var obj = {
		myName: 'sven',
		getName: function () {
			return this.myName;
		},
	};

	console.log(obj.getName()); //sven

	var getName2 = obj.getName;

	console.log(getName2()); //undefined
}

// tot()
//this指向所在作用域的this变量

function tot1() {
	var getId = function (id) {
		return document.getElementById(id);
	};

	console.log(getId('div1'));

	var getId2 = document.getElementById;

	getId2('div1');
}

// tot1()

function tot2() {
	document.getElementById = (function (func) {
		return function () {
			return func.apply(document, arguments);
		};
	})(document.getElementById);

	var getId = document.getElementById;
	var div = getId('div1');

	console.log(div.id);
}

// tot2();

//2.2 call和apply-----------------------------------------------------------------------
//ECMAScript 3给Function的原型定义了两个方法，它们是Function.prototype.call和Function. prototype.apply。
//在实际开发中，特别是在一些函数式风格的代码编写中，call和apply方法尤为有用。
//在JavaScript版本的设计模式中，这两个方法的应用也非常广泛，能熟练运用这两个方法，
//是我们真正成为一名JavaScript程序员的重要一步。

//2.2.1 call和apply的区别
//一模一样，区别仅在于传入参数形式的不同
//apply：this,[...args]
//call：this,arg1,arg2...

//有时候我们使用call或者apply的目的不在于指定this指向，而是另有用途，
//比如借用其他对象的方法。那么我们可以传入null来代替某个具体的对象：
function tto() {
	const max1 = Math.max(1, 2, 5, 3, 4);
	//改变入参形式
	const max2 = Math.max.apply(null, [1, 2, 5, 3, 4]);

	console.log(max1);
	console.log(max2);
}

// tto()

//2.2.2 call和apply的用途
//1，改变this指向
function ttt() {
	var obj1 = {
		name: 'sven',
	};

	var obj2 = {
		name: 'anne',
	};

	window.name = 'window';

	var getName = function () {
		console.log(this.name);
	};

	getName();
	getName.call(obj1);
	getName.call(obj2);
}

// ttt()

function ttt1() {
	document.getElementById('div1').onclick = function () {
		console.log(this.id);

		var func = function () {
			console.log(this.id);
		};

		func();
	};
}

// ttt1()

function ttt2() {
	document.getElementById('div1').onclick = function () {
		console.log(this.id);

		var func = function () {
			console.log(this.id);
		};

		func.call(this);
	};
}

// ttt2()

//2，Function.prototype.bind
function ttt3() {
	//简化版bind()
	Function.prototype.bind = function (context) {
		//this指向原函数，即self为原函数
		var self = this;

		return function (...args) {
			//返回指定传入this值的原函数调用
			return self.apply(context, ...args);
		};
	};

	var obj = {
		name: 'sven',
	};

	var func = function () {
		console.log(this.name);
	}.bind(obj);

	func();
}

// ttt3();

function ttt4() {
	//能预先置入参数的bind（正常版）
	Function.prototype.bind = function () {
		var self = this,
			//Array.prototype.shift()：删除数组中的第一个元素，并返回其值，改变原数组长度
			context = [].shift.call(arguments),
			//Array.prototype.slice.call(TypedArray)：可以返回一个类数组的数组形式
			args = [].slice.call(arguments);

		return function () {
			return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
		};
	};

	var obj = {
		name: 'sven',
	};

	var func = function (a, b, c, d) {
		console.log(this.name);
		console.log([a, b, c, d]);
	}.bind(obj, 1, 2);

	func(3, 4);
}

// ttt4()

//3，借用其他对象的方法
//第一种场景：“借用构造函数”，通过这种技术，可以实现一些类似继承的效果：
function ttt5() {
	var A = function (name) {
		this.name = name;
	};

	var B = function () {
		//执行父类的构造函数以构造具有继承效果的实例
		A.apply(this, arguments);
	};

	B.prototype.getName = function () {
		return this.name;
	};

	var b = new B('sven');

	console.log(b.getName());
}

// ttt5()

//第二种场景：arguments的处理
function ttt6() {
	(function () {
		Array.prototype.push.call(arguments, 3);
		console.log(arguments);
	})(1, 2);

	//Array.prototype.push实际上是一个属性复制的过程，把参数按照下标依次添加到被push的对象上面，
	//顺便修改了这个对象的length属性。至于被修改的对象是谁，
	//到底是数组还是类数组对象，这一点并不重要。

	//由此可以推断，我们可以把“任意”对象传入Array.prototype.push
	var a = {};
	//参数会被列入数组，并作为数组的某个元素处理
	Array.prototype.push.call(a, { key1: 'first' });

	console.log(a.length);
	console.log(a[0]);

	//限制：1，对象本身要可以存取属性。2，对象的length可读写

	//number类型
	var b = 1;
	Array.prototype.push.call(a, 'first');
	console.log(b.length);
	console.log(b[0]);

	//function类型
	var func = function () {};
	Array.prototype.push.call(func, 'first');
	console.log(func.length);
}

// ttt6();
