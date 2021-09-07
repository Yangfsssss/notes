/** Chapter3：闭包和高阶函数 */
//虽然JavaScript是一门完整的面向对象的编程语言，但这门语言同时也拥有许多函数式语言的特性。
//函数式语言的鼻祖是LISP, JavaScript在设计之初参考了LISP两大方言之一的Scheme，
//引入了Lambda表达式、闭包、高阶函数等特性。使用这些特性，
//我们经常可以用一些灵活而巧妙的方式来编写JavaScript代码。
//本章主要挑选了闭包和高阶函数进行讲解。在JavaScript版本的设计模式中，
//许多模式都可以用闭包和高阶函数来实现。

//3.1 闭包--------------------------------------------------------------------------------------------------------------
//对于JavaScript程序员来说，闭包（closure）是一个难懂又必须征服的概念。
//闭包的形成与变量的作用域以及变量的生存周期密切相关。

//3.1.1 变量的作用域
function too() {
	var a = 1;

	var func1 = function () {
		var b = 2;

		var func2 = function () {
			var c = 3;
			console.log(b);
			console.log(a);
		};

		func2();
		console.log(c);
	};

	func1();
}

// too()

//3.1.2 变量的生存周期
//对于全局变量来说，全局变量的生存周期当然是永久的，除非我们主动销毁这个全局变量。
//而对于在函数内用var关键字声明的局部变量来说，当退出函数时，
//这些局部变量即失去了它们的价值，它们都会随着函数调用的结束而被销毁
function tot() {
	var func = function () {
		var a = 1; //退出函数后局部变量a将被销毁
		console.log(a);
	};

	func();
}

// tot()

//闭包
function tot1() {
	var func = function () {
		var a = 1;

		return function () {
			a++;
			console.log(a);
		};
	};

	var f = func();

	f();
	f();
	f();
	f();
}
// tot1();

//循环
function tot2() {
	var nodes = document.getElementsByTagName('div');

	for (var i = 0; i < nodes.length; i++) {
		(function (i) {
			nodes[i].onclick = function () {
				console.log(i);
			};
		})(i);
	}
}
// tot2();

function tot3() {
	var Type = {};

	for (var i = 0, type; (type = ['String', 'Array', 'Number'][i++]); ) {
		(function (type) {
			Type['is' + type] = function (obj) {
				return Object.prototype.toString.call(obj) === '[object ' + type + ']';
			};
		})(type);
	}

	const result1 = Type.isArray([]);
	const result2 = Type.isString('str');
	const result3 = Type.isNumber(333);

	console.log(result1);
	console.log(result2);
	console.log(result3);
}

// tot3()

function tot4() {
	//Object.prototype上的toString方法
	console.log(Object.prototype.toString.call(new Array()));
	console.log(Object.prototype.toString.call(new Object()));
	console.log(Object.prototype.toString.call(new Function()));

	console.log(new Object().toString());

	//Array.prototype上的toString方法，和Object.prototype上不同
	// Array.prototype.toString = Object.prototype.toString
	console.log(new Array(5).fill(3).toString());
	console.log(typeof new Array(5).fill(3).toString());
	console.log(new Array().valueOf() === new Array().toString());

	//Function.prototype上的toString方法，和Object.prototype上不同
	// Function.prototype.toString = Object.prototype.toString
	console.log(new Function().toString());
	console.log(typeof new Function().toString());
	console.log(new Function().valueOf() === new Function().toString());
}

//**总结：1，Array.prototype.toString和Object.prototype.toString不同，会打印一个包含所有数组元素
//                     并用逗号分割的字符串，对于类数组，会返回'[object Arguments]'
//                2，Function.prototype.toString和Object.prototype.toString不同，会打印一个完整函数体的
//                    字符串形式

// tot4();

//3.1.3 闭包的更多作用
//1，封装变量
//闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量

//简单的计算函数
function tot() {
	var mult = function (...args) {
		var a = 1;

		for (var i = 0, l = args.length; i < l; i++) {
			a = a * a + args[i];
		}

		return a;
	};

	const result = mult(2, 2);
	//a = 1 * 1 + 2 = 3
	//a = 3 *3 + 2 = 11

	console.log(result);
	return result;
}

// tot();

//加入缓存机制以提高性能
//1:未缓存
function tot1() {
	var cache = {};

	var mult = function (...args) {
		// var args = Array.prototype.join.call(args, ',');
		// console.log(arguments);
		// console.log(Object.prototype.toString.call(Array.from(arguments)));
		// console.log(typeof Array.prototype.toString.call(arguments, ','));

		//**总结：对于类数组，将其转换为字符串有两种办法：
		//                                          1，使用Array.prototype.join.call(ArrayLike,',')
		//                                          2，将其转换为数组再使用Array.prototype.toString.call(ArrayLike)

		if (cache[args]) {
			return cache[args];
		}

		var a = 1;

		for (var i = 0, l = args.length; i < l; i++) {
			a = a * a + args[i];
		}

		return (cache[args] = a);
	};

	console.log('cache1', cache);
	console.log(mult(1, 2, 3));
	console.log('cache2', cache);
	console.log(mult(1, 2, 3));
}

// tot1();

//2:匿名函数闭包缓存
function tot2() {
	var mult = (function () {
		var cache = {};

		return function (...args) {
			if (cache[args]) {
				return cache[args];
			}

			var a = 1;

			for (var i = 0, l = args.length; i < l; i++) {
				a = a * a + args[i];
			}

			return (cache[args] = a);
		};
	})();

	// console.log('cache1', cache);
	console.log(mult(1, 2, 3));
	// console.log('cache2', cache);
	console.log(mult(1, 2, 3));
}

// tot2();

//** 总结：提炼函数是代码重构中的一种常见技巧。如果在一个大函数中有一些代码块能够独立出来，
//我们常常把这些代码块封装在独立的小函数里面。独立出来的小函数有助于代码复用，
//如果这些小函数有一个良好的命名，它们本身也起到了注释的作用。
//如果这些小函数不需要在程序的其他地方使用，最好是把它们用闭包封闭起来

//3:独立函数：calculate()
function tot3() {
	var mult = (function () {
		var cache = {};

		var calculate = function (...args) {
			var a = 1;

			for (var i = 0, l = args.length; i < l; i++) {
				a = a * a + args[i];
			}

			return a;
		};

		return function (...args) {
			if (cache[args]) {
				return cache[args];
			}

			return (cache[args] = calculate.apply(null, args));
		};
	})();

	console.log(mult(1, 2, 4));
	// console.log('cache2', cache);
	console.log(mult(1, 2, 4));
}

// tot3();

//2，延续局部变量的寿命
//在响应未返回之前函数调用已结束
function tot4() {
	var report = function (src) {
		var img = new Image();
		img.src = src;
	};

	report('http://xxx.com/getUserInfo');
}

//闭包保护
function tot5() {
	var report = (function () {
		var imgs = [];

		return function (src) {
			var img = new Image();
			imgs.push(img);
			img.src = src;

			return imgs;
		};
	})();
}

//3.1.4 闭包和面对对象设计
//过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。
//对象以方法的形式包含了过程，而闭包则是在过程中以环境的形式包含了数据。
//通常用面向对象思想能实现的功能，用闭包也能实现。反之亦然。
//在JavaScript语言的祖先Scheme语言中，甚至都没有提供面向对象的原生设计，
//但可以使用闭包来实现一个完整的面向对象系统

function tof() {
	var extent = function () {
		var value = 0;

		return {
			call: function () {
				value++;
				console.log(value);
			},
		};
	};

	var extent = extent();

	extent.call();
	extent.call();
	extent.call();
}

// tof()

//面向对象写法
//单例对象
function tof1() {
	var extent = {
		value: 0,
		call: function () {
			this.value++;
			console.log(this.value);
		},
	};

	extent.call();
	extent.call();
	extent.call();
}

// tof1();

//或者
//类
function tof2() {
	var Extent = function () {
		this.value = 0;
	};

	Extent.prototype.call = function () {
		this.value++;
		console.log(this.value);
	};

	var extent = new Extent();

	extent.call();
	extent.call();
	extent.call();
}

// tof2();

//3.1.5 用闭包实现命令模式
//在JavaScript版本的各种设计模式实现中，闭包的运用非常广泛，
//在后续的学习过程中，我们将体会到这一点。在完成闭包实现的命令模式之前，
//我们先用面向对象的方式来编写一段命令模式的代码。

//面向对象
function tof() {
	const body = document.body;

	const buttonExecute = document.createElement('button', { id: 'execute', is: '123' });
	buttonExecute.innerText = '点击我执行命令';

	const buttonUndo = document.createElement('button', { id: 'undo' });
	buttonUndo.innerText = '点击我执行命令';

	body.appendChild(buttonExecute);
	body.appendChild(buttonUndo);

	var Tv = {
		open: function () {
			console.log('打开电视机');
		},
		close: function () {
			console.log('关上电视机');
		},
	};

	class OpenTvCommand {
		constructor(receiver) {
			this.receiver = receiver;
		}

		execute() {
			this.receiver.open();
		}

		undo() {
			this.receiver.close();
		}
	}

	var setCommand = function (command) {
		buttonExecute.onclick = function () {
			command.execute();
		};

		buttonUndo.onclick = function () {
			command.undo();
		};
	};

	setCommand(new OpenTvCommand(Tv));
}

// tof();

//命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者（执行者）之间的
//耦合关系。在命令被执行之前，可以预先往命令对象中植入命令的接收者。
//但在JavaScript中，函数作为一等对象，本身就可以四处传递，
//用函数对象而不是普通对象来封装请求显得更加简单和自然。
//如果需要往函数对象中预先植入命令的接收者，那么闭包可以完成这个工作。
//在面向对象版本的命令模式中，预先植入的命令接收者被当成对象的属性保存起来；
//而在闭包版本的命令模式中，命令接收者会被封闭在闭包形成的环境中，

//函数闭包
function tof1() {
	//UI
	const body = document.body;

	const buttonExecute = document.createElement('button', { id: 'execute', is: '123' });
	buttonExecute.innerText = '点击我执行命令';

	const buttonUndo = document.createElement('button', { id: 'undo' });
	buttonUndo.innerText = '点击我执行命令';

	body.appendChild(buttonExecute);
	body.appendChild(buttonUndo);

	//功能实体
	var Tv = {
		open: function () {
			console.log('打开电视机');
		},
		close: function () {
			console.log('关上电视机');
		},
	};

	//将功能实体的功能打包成一个对象
	var createCommand = function (receiver) {
		var execute = function () {
			return receiver.open();
		};

		var undo = function () {
			return receiver.close();
		};

		return {
			execute,
			undo,
		};
	};

	//将打包的功能实体的功能绑定至UI
	var setCommand = function (command) {
		buttonExecute.onclick = function () {
			command.execute();
		};

		buttonUndo.onclick = function () {
			command.undo();
		};
	};

	setCommand(createCommand(Tv));
}

// tof1();

//3.1.6 闭包与内存管理
/** 闭包是一个非常强大的特性，但人们对其也有诸多误解。
 * 一种耸人听闻的说法是闭包会造成内存泄露，所以要尽量减少闭包的使用。
 * 局部变量本来应该在函数退出的时候被解除引用，但如果局部变量被封闭在闭包形成的环境中，
 * 那么这个局部变量就能一直生存下去。从这个意义上看，闭包的确会使一些数据无法被及时销毁。
 * 使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中，因为可能在以后还需要使用这些变量，
 * 把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的，这里并不能说成是内存泄露。
 * 如果在将来需要回收这些变量，我们可以手动把这些变量设为null。跟闭包和内存泄露有关系的地方是，
 * 使用闭包的同时比较容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，
 * 这时候就有可能造成内存泄露。但这本身并非闭包的问题，也并非JavaScript的问题。
 * 在IE浏览器中，由于BOM和DOM中的对象是使用C++以COM对象的方式实现的，
 * 而COM对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，
 * 如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，
 * 但循环引用造成的内存泄露在本质上也不是闭包造成的。同样，如果要解决循环引用带来的内存泄露问题，
 * 我们只需要把循环引用中的变量设为null即可。将变量设置为null意味着切断变量与它此前引用的值之间的连接。
 * 当垃圾收集器下次运行时，就会删除这些值并回收它们占用的内存。 */

//3.2 高阶函数------------------------------------------------------------------------------------------------------------
//高阶函数是指至少满足下列条件之一的函数。
//❏ 函数可以作为参数被传递；
//❏ 函数可以作为返回值输出。
//JavaScript语言中的函数显然满足高阶函数的条件，
//在实际开发中，无论是将函数当作参数传递，还是让函数的执行结果返回另外一个函数，
//这两种情形都有很多应用场景

//3.2.1 函数作为参数传递
//把函数当作参数传递，这代表我们可以抽离出一部分容易变化的业务逻辑，
//把这部分业务逻辑放在函数参数中，这样一来可以分离业务代码中变化与不变的部分。
//其中一个重要应用场景就是常见的回调函数

//1，回调函数
//在ajax异步请求的应用中，回调函数的使用非常频繁。
//当我们想在ajax请求返回之后做一些事情，但又并不知道请求返回的确切时间时，
//最常见的方案就是把callback函数当作参数传入发起ajax请求的方法中，
//待请求完成之后执行callback函数：
function tto() {
	//ajax
	var getUserInfo = function (userId, callback) {
		$.ajax('http://xxx.com/getUserInfo' + userId, function (data) {
			if (typeof callback == 'function') {
				callback(data);
			}
		});
	};

	getUserInfo(13157, function (data) {
		console.log(data.userName);
	});
}

//回调函数的应用不仅只在异步请求中，当一个函数不适合执行一些请求时，
//我们也可以把这些请求封装成一个函数，并把它作为参数传递给另外一个函数，
//“委托”给另外一个函数来执行。

//比如，我们想在页面中创建100个div节点，然后把这些div节点都设置为隐藏。
function tto1() {
	var appendDiv = function () {
		for (var i = 0; i < 100; i++) {
			var div = document.createElement('div');

			div.innerHTML = i;
			document.body.appendChild(div);
			div.style.display = 'none';
		}
	};

	appendDiv();
}

// tto1();

//抽离div.style.display = 'none';
function tto2() {
	var appendDiv = function (callback) {
		for (var i = 0; i < 100; i++) {
			var div = document.createElement('div');

			div.innerHTML = i;
			document.body.appendChild(div);

			if (typeof callback === 'function') {
				callback(div);
			}
		}
	};

	appendDiv(function (node) {
		node.style.display = 'none';
	});
}
//可以看到，隐藏节点的请求实际上是由客户发起的，但是客户并不知道节点什么时候会创建好，
//于是把隐藏节点的逻辑放在回调函数中，“委托”给appendDiv方法。
//appendDiv方法当然知道节点什么时候创建好，所以在节点创建好的时候，
//appendDiv会执行之前客户传入的回调函数。

// tto2()

//2，Array.prototype.sort
//Array.prototype.sort接受一个函数当作参数，这个函数里面封装了数组元素的排序规则。
//从Array.prototype.sort的使用可以看到，我们的目的是对数组进行排序，这是不变的部分；
//而使用什么规则去排序，则是可变的部分。把可变的部分封装在函数参数里，
//动态传入Array.prototype.sort，使Array.prototype.sort方法成为了一个非常灵活的方法
function tto3() {
	//从小到大排列
	const result1 = [1, 4, 3].sort(function (a, b) {
		return a - b;
	});

	//从大到小排列
	const result2 = [1, 4, 3].sort(function (a, b) {
		return b - a;
	});

	console.log(result1, result2);
}

// tto3();

//3.2.2 函数作为返回值输出
//相比把函数当作参数传递，函数当作返回值输出的应用场景也许更多，
//也更能体现函数式编程的巧妙。让函数继续返回一个可执行的函数，意味着运算过程是可延续的。

//1，判断数据的类型
function ttt() {
	var isString = function (obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	};

	var isArray = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

	var isNumber = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Number]';
	};
}
//我们发现，这些函数的大部分实现都是相同的，
//不同的只是Object.prototype.toString. call( obj )返回的字符串。
//为了避免多余的代码，我们尝试把这些字符串作为参数提前值入isType函数。

function ttt1() {
	var isType = function (type) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object ' + type + ']';
		};
	};

	var isString = isType('String');
	var isArray = isType('Array');
	var isNumber = isType('Number');

	console.log(isArray([1, 2, 3]));
	console.log(isArray('1,2,3'));
}

// ttt1()

//用循环语句批量注册isType函数
function ttt2() {
	var Type = {};

	for (var i = 0, type; (type = ['String', 'Array', 'Number'][i++]); ) {
		(function (type) {
			Type['is' + type] = function (obj) {
				return Object.prototype.toString.call(obj) === '[object ' + type + ']';
			};
		})(type);
	}

	console.log(Type.isArray('str'));
	console.log(Type.isString([]));
}

// ttt2();

//2，getSingle
//一个单例模式的例子
function ttt3() {
	var getSingle = function (fn) {
		var ret;
		return function () {
			return ret || (ret = fn.apply(this, arguments));
		};
	};

	var getScript = getSingle(function () {
		return document.createElement('script');
	});

	var script1 = getScript();
	var script2 = getScript();

	console.log(Object.prototype.toString.call(script1));
	console.log(Object.prototype.toString.call(script2));
	console.log(script1 === script2);
}

// ttt3();

//3.2.3 高阶函数实现AOP
/**
 * AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，
 * 这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，
 * 再通过“动态织入”的方式掺入业务逻辑模块中。
 * 这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，
 * 其次是可以很方便地复用日志统计等功能模块。在Java语言中，
 * 可以通过反射和动态代理机制来实现AOP技术。而在JavaScript这种动态语言中，
 * AOP的实现更加简单，这是JavaScript与生俱来的能力。通常，在JavaScript中实现AOP，
 * 都是指把一个函数“动态织入”到另外一个函数之中，具体的实现技术有很多，
 * 本节我们通过扩展Function.prototype来做到这一点。*/
function ttt4() {
	//将参数函数的调用置入原函数的调用之前，并合并成一个新函数返回
	Function.prototype.before = function (beforeFn) {
		//保存原函数的引用
		var _self = this;
		//返回包含了原函数和新函数的“代理”函数
		return function (...args) {
			//执行新函数，修正this
			beforeFn.apply(this, args);
			//执行原函数
			return _self.apply(this, args);
		};
	};

	//将参数函数的调用置入原函数的调用之后，并合并成一个新函数返回
	Function.prototype.after = function (afterFn) {
		var _self = this;
		return function (...args) {
			var ret = _self.apply(this, args);

			afterFn.apply(this, args);
			return ret;
		};
	};

	var func = function () {
		console.log(2);
	};

	func = func
		.before(function () {
			console.log(1);
		})
		.after(function () {
			console.log(3);
		});

	func();
}

// ttt4();

//这种使用AOP的方式来给函数添加职责，
//也是JavaScript语言中一种非常特别和巧妙的装饰者模式实现。
//这种装饰者模式在实际开发中非常有用

//3.2.4 高阶函数的其他应用
//1，currying
//currying又称部分求值。一个currying的函数首先会接受一些参数，
//接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，
//刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，
//之前传入的所有参数都会被一次性用于求值。

//假设我们要编写一个计算每月开销的函数。在每天结束之前，我们都要记录今天花掉了多少钱。代码如下：
function ttf() {
	var monthlyCost = 0;

	var cost = function (money) {
		monthlyCost += money;
	};

	cost(100);
	cost(200);
	cost(300);
	cost(700);

	console.log(monthlyCost);
}

// ttf();
//通过这段代码可以看到，每天结束后我们都会记录并计算到今天为止花掉的钱。
//但我们其实并不太关心每天花掉了多少钱，而只想知道到月底的时候会花掉多少钱。
//也就是说，实际上只需要在月底计算一次。如果在每个月的前29天，
//我们都只是保存好当天的开销，直到第30天才进行求值计算，这样就达到了我们的要求。

function ttf1() {
	var cost = (function () {
		var args = [];

		//利用参数个数判断：当有参数时，将参数存入数组
		//没有参数时，遍历数组内储存的参数进行计算，返回结果
		return function () {
			if (arguments.length === 0) {
				var money = 0;

				for (var i = 0, l = args.length; i < l; i++) {
					money += args[i];
				}

				return money;
			} else {
				[].push.apply(args, arguments);
			}
		};
	})();

	cost(100);
	cost(200);
	cost(300);

	console.log(cost());
}

// ttf1();

//通用的function currying
function ttf2() {
	var currying = function (fn) {
		var args = [];

		return function () {
			if (arguments.length === 0) {
				return fn.apply(this, args);
			} else {
				[].push.apply(args, arguments);
			}
		};
	};

	var cost = (function () {
		var money = 0;

		return function () {
			for (var i = 0, l = arguments.length; i < l; i++) {
				money += arguments[i];
			}

			return money;
		};
	})();

	var cost = currying(cost);

	cost(100);
	cost(200);
	cost(300);

	console.log(cost());
}

// ttf2();

//2，uncurrying
//在JavaScript中，当我们调用对象的某个方法时，
//其实不用去关心该对象原本是否被设计为拥有这个方法，这是动态类型语言的特点，
//也是常说的鸭子类型思想。同理，一个对象也未必只能使用它自身的方法，
//那么有什么办法可以让对象去借用一个原本不属于它的方法呢？
//答案对于我们来说很简单，call和apply都可以完成这个需求
function ttf3() {
	var obj1 = {
		name: 'sven',
	};

	var obj2 = {
		getName: function () {
			return this.name;
		},
	};

	console.log(obj2.getName.call(obj1));
}

// ttf3();

//我们常常让类数组对象去借用Array.prototype的方法，这是call和apply最常见的应用场景之一：
function ttf4() {
	(function () {
		Array.prototype.push.call(arguments, 4);
		console.log(arguments);
	})(1, 2, 3);
}

// ttf4();
//在我们的预期中，Array.prototype上的方法原本只能用来操作array对象。
//但用call和apply可以把任意对象当作this传入某个方法，这样一来，
//方法中用到this的地方就不再局限于原来规定的对象，而是加以泛化并得到更广的适用性。
//Array.prototype上的方法可以操作任何对象的原理可参阅2.2节。
//那么有没有办法把泛化this的过程提取出来呢？
//本小节讲述的uncurrying就是用来解决这个问题的
Function.prototype.uncurrying = function () {
	//保存原函数
	var self = this;

	return function () {
		//获得包含传入参数的arguments作为新this
		var obj = Array.prototype.shift.call(arguments);

		//使用新this调用原函数
		return self.apply(obj, arguments);
	};
};

function ttf5() {
	Function.prototype.uncurrying = function () {
		//保存原函数
		var self = this;

		return function () {
			//获得包含传入参数的arguments作为新this
			var obj = Array.prototype.shift.call(arguments);

			//使用新this调用原函数
			return self.apply(obj, arguments);
		};
	};

	function ttf6() {
		var push = Array.prototype.push.uncurrying();

		// 	(function () {
		// 		push(arguments, 4);
		// 		console.log(arguments);
		// 	})(1, 2, 3);
		// }

		const result = push([1, 2], 3);

		console.log(result);
	}

	ttf6();
}

// ttf5();
//通过uncurrying的方式，Array.prototype.push.call变成了一个通用的push函数。

//我们还可以一次性地把Array.prototype上的方法“复制”到array对象上，
//同样这些方法可操作的对象也不仅仅只是array对象：
function ttf7() {
	for (var i = 0, fn, ary = ['push', 'shift', 'forEach']; (fn = ary[i++]); ) {
		// console.log(Array.prototype[fn].uncurrying());
		Array[fn] = Array.prototype[fn].uncurrying();
	}

	var obj = {
		length: 3,
		0: 1,
		1: 2,
		2: 3,
	};

	Array.push(obj, 4);

	console.log('obj1', obj);

	console.log('length', obj.length);

	var first = Array.shift(obj);

	console.log('first', first);
	console.log('obj2', obj);

	Array.forEach(obj, function (i, n) {
		console.log('n', n);
	});
}

// ttf7();

//甚至Function.prototype.call和Function.prototype.apply本身也可以被uncurrying，
//不过这没有实用价值，只是使得对函数的调用看起来更像JavaScript语言的前身Scheme：
function ttf8() {
	var call = Function.prototype.call.uncurrying();

	var fn = function (name) {
		console.log(name);
	};

	call(fn, window, 'sven');

	var apply = Function.prototype.apply.uncurrying();

	var fn2 = function (name, name2) {
		console.log(this.name);
		console.log(name2);
		console.log(arguments);
	};

	apply(fn2, { name: 'sven' }, [1, 2, 3]);
}

// ttf8();

//uncurrying的另一种实现
Function.prototype.uncurrying = function () {
	var self = this;

	return function () {
		return Function.prototype.call.apply(self, arguments);
	};
};

//3.函数节流
//JavaScript中的函数大多数情况下都是由用户主动调用触发的，
//除非是函数本身的实现不合理，否则我们一般不会遇到跟性能相关的问题。
//但在一些少数情况下，函数的触发不是由用户直接控制的。在这些场景下，
//函数有可能被非常频繁地调用，而造成大的性能问题。下面将列举一些这样的场景。

//(1),函数被频繁调用的场景
//❏ window.onresize事件。我们给window对象绑定了resize事件，
//当浏览器窗口大小被拖动而改变的时候，这个事件触发的频率非常之高。
//如果我们在window.onresize事件函数里有一些跟DOM节点相关的操作，
//而跟DOM节点相关的操作往往是非常消耗性能的，这时候浏览器可能就会吃不消而造成卡顿现象。

//❏ mousemove事件。同样，如果我们给一个div节点绑定了拖曳事件（主要是mousemove），
//当div节点被拖动的时候，也会频繁地触发该拖曳事件函数。

//❏ 上传进度。微云的上传功能使用了公司提供的一个浏览器插件。
//该浏览器插件在真正开始上传文件之前，会对文件进行扫描并随时通知JavaScript函数，
//以便在页面中显示当前的扫描进度。但该插件通知的频率非常之高，大约一秒钟10次，
//很显然我们在页面中不需要如此频繁地去提示用户。

//(2),函数节流的原理
//我们整理上面提到的三个场景，发现它们面临的共同问题是函数被触发的频率太高。
//比如我们在window.onresize事件中要打印当前的浏览器窗口大小，
//在我们通过拖曳来改变窗口大小的时候，打印窗口大小的工作1秒钟进行了10次。
//而我们实际上只需要2次或者3次。这就需要我们按时间段来忽略掉一些事件请求，
//比如确保在500ms内只打印一次。很显然，我们可以借助setTimeout来完成这件事情。

//(3)函数节流的代码实现
//关于函数节流的代码实现有许多种，下面的throttle函数的原理是，
//将即将被执行的函数用setTimeout延迟一段时间执行。如果该次延迟执行还没有完成，
//则忽略接下来调用该函数的请求。throttle函数接受2个参数，
//第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间
function ttf9() {
	var throttle = function (fn, interval) {
		//保存需要被执行的函数引用
		var _self = fn,
			//定时器
			timer,
			//是否是第一次调用
			firstTime = true;

		return function () {
			var args = arguments,
				_me = this;

			//如果是第一次调用，不需延迟执行
			if (firstTime) {
				_self.apply(_me, args);
				return (firstTime = false);
			}

			//如果定时器还存在，说明前一次执行还没有完成
			if (timer) {
				return false;
			}

			//延迟一段时间执行
			timer = setTimeout(function () {
				clearTimeout(timer);
				timer = null;
				_self.apply(_me, args);
			}, interval || 500);
		};
	};

	window.onresize = throttle(function () {
		console.log(1);
	}, 500);
}

// ttf9();

//4，分时函数
//在前面关于函数节流的讨论中，我们提供了一种限制函数被频繁调用的解决方案。
//下面我们将遇到另外一个问题，某些函数确实是用户主动调用的，但因为一些客观的原因，
//这些函数会严重地影响页面性能。一个例子是创建WebQQ的QQ好友列表。
//列表中通常会有成百上千个好友，如果一个好友用一个节点来表示，
//当我们在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千个节点。
//在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，
//我们看到的结果往往就是浏览器的卡顿甚至假死
function ttf10() {
	var ary = [];

	for (var i = 1; i <= 1000; i++) {
		//假设ary装载了1000个好友的数据
		ary.push(i);
	}

	var renderFriendList = function (data) {
		for (var i = 0, l = data.length; i < l; i++) {
			var div = document.createElement('div');
			div.innerHTML = i;
			document.body.appendChild(div);
		}
	};

	renderFriendList(ary);
}

// ttf10();

//这个问题的解决方案之一是下面的timeChunk函数，
//timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，
//改为每隔200毫秒创建8个节点。timeChunk函数接受3个参数，
//第1个参数是创建节点时需要用到的数据，第2个参数是封装了创建节点逻辑的函数，
//第3个参数表示每一批创建的节点数量。
function ttf11() {
	var timeChunk = function (ary, fn, count) {
		var obj, t;

		var len = ary.length;

		//setInterval定时分批创建，每次创建后减去节点数量，节点数量为0时解除setInterval
		var start = function () {
			for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
				var obj = ary.shift();
				fn(obj);
			}
		};

		return function () {
			t = setInterval(function () {
				//如果全部节点都已经被创建好
				if (ary.length === 0) {
					return clearInterval(t);
				}
				start();
			}, 200); //分批执行的时间间隔，也可以用参数的形式传入
		};
	};

	var ary = [];

	for (var i = 1; i <= 1000; i++) {
		ary.push(i);
	}

	var renderFriendList = timeChunk(
		ary,
		function (n) {
			var div = document.createElement('div');
			div.innerHTML = n;
			document.body.appendChild(div);
		},
		8
	);

	renderFriendList();
}

// ttf11()

//5，惰性加载函数
//在Web开发中，因为浏览器之间的实现差异，
//一些嗅探工作总是不可避免。比如我们需要一个在各个浏览器中能够
//通用的事件绑定函数addEvent，常见的写法如下：
function ttf12() {
	var addEvent = function (elem, type, handler) {
		if (window.addEventListener) {
			return elem.addEventListener(type, handler, false);
		}

		if (window.attachEvent) {
			return window.attachEvent('on' + type, handler);
		}
	};
}
//这个函数的缺点是，当它每次被调用的时候都会执行里面的if条件分支，
//虽然执行这些if分支的开销不算大，但也许有一些方法可以让程序避免这些重复的执行过程。

//第二种方案是这样，我们把嗅探浏览器的操作提前到代码加载的时候，
//在代码加载的时候就立刻进行一次判断，以便让addEvent返回一个包裹了正确逻辑的函数。
//代码如下：
function ttf13() {
	var addEvent = (function () {
		if (window.addEventListener) {
			return function (elem, type, handler) {
				elem.addEventListener(type, handler, false);
			};
		}

		if (window.attachEvent) {
			return function (elem, type, handler) {
				elem.attachEvent('on' + type, handler);
			};
		}
	})();
}
//目前的addEvent函数依然有个缺点，也许我们从头到尾都没有使用过addEvent函数，
//这样看来，前一次的浏览器嗅探就是完全多余的操作，而且这也会稍稍延长页面ready的时间。

//第三种方案即是我们将要讨论的惰性载入函数方案。此时addEvent依然被声明为一个普通函数，
//在函数里依然有一些分支判断。但是在第一次进入条件分支之后，在函数内部会重写这个函数，
//重写之后的函数就是我们期望的addEvent函数，在下一次进入addEvent函数的时候，
//addEvent函数里不再存在条件分支语句
function ttf14() {
	const div = document.createElement('div');
	div.innerHTML = '点我绑定事件';

	//第一次进入，判断环境并实施绑定操作的同时将addEvent重写
	var addEvent = function (elem, type, handler) {
		if (window.addEventListener) {
			addEvent = function (elem, type, handler) {
				elem.addEventListener(type, handler, false);
			};
		} else if (window.attachEvent) {
			addEvent = function (elem, type, handler) {
				elem.attachEvent('on' + type, handler);
			};
		}

		addEvent(elem, type, handler);
	};

	var divDOM = document.querySelector('div');

	addEvent(divDOM, 'click', function () {
		alert(1);
	});

	addEvent(divDOM, 'click', function () {
		alert(2);
	});
}

// ttf14();

//3.3 小结----------------------------------------------------------------------------------------
/**在进入设计模式的学习之前，本章挑选了闭包和高阶函数来进行讲解。
 * 这是因为在JavaScript开发中，闭包和高阶函数的应用极多。就设计模式而言，
 * 因为JavaScript这门语言的自身特点，
 * 许多设计模式在JavaScript之中的实现跟在一些传统面向对象语言中的实现相差很大。
 * 在JavaScript中，很多设计模式都是通过闭包和高阶函数实现的。这并不奇怪，
 * 相对于模式的实现过程，我们更关注的是模式可以帮助我们完成什么。 */
