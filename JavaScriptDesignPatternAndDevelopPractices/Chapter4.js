/** Chapter4：单例模式 */
/**单例模式的定义是：保证一个类仅有一个实例，
 * 并提供一个访问它的全局访问点。单例模式是一种常用的模式，
 * 有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象等。
 * 在JavaScript开发中，单例模式的用途同样非常广泛。试想一下，当我们单击登录按钮的时候，
 * 页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，
 * 这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。 */

//4.1 实现单例模式---------------------------------------------------------------------------------------------
function fo() {
	var Singleton = function (name) {
		this.name = name;
		this.instance = null;
	};

	Singleton.prototype.getName = function () {
		console.log(this.name);
	};

	//调用构造函数上的getInstance方法返回构造函数上的instance属性
	Singleton.getInstance = function (name) {
		if (!this.instance) {
			this.instance = new Singleton(name);
		}

		return this.instance;
	};

	var a = Singleton.getInstance('sven1');
	var b = Singleton.getInstance('sven2');

	console.log(a === b);

	console.log(a.instance === null);
	console.log(b.instance === null);
	console.log(a === Singleton.instance);
}

// fo()
//或者
function fo1() {
	var Singleton = function (name) {
		this.name = name;
	};

	Singleton.prototype.getName = function () {
		console.log(this.name);
	};

	//用闭包将instance属性存储起来，调用getInstance时返回
	Singleton.getInstance = (function () {
		var instance = null;

		return function (name) {
			if (!instance) {
				instance = new Singleton(name);
			}

			return instance;
		};
	})();
}

//我们通过Singleton.getInstance来获取Singleton类的唯一对象，
//这种方式相对简单，但有一个问题，就是增加了这个类的“不透明性”,
//Singleton类的使用者必须知道这是一个单例类，跟以往通过new XXX的方式来获取对象不同，
//这里偏要使用Singleton.getInstance来获取对象。

//4.2 透明的单例模式--------------------------------------------------------------------------------------
//我们现在的目标是实现一个“透明”的单例类，用户从这个类中创建对象的时候，
//可以像使用其他任何普通类一样。在下面的例子中，我们将使用CreateDiv单例类，
//它的作用是负责在页面中创建唯一的div节点，代码如下：
function ft() {
	var CreateDiv = (function () {
		var instance;

		var CreateDiv = function (html) {
			if (instance) {
				return instance;
			}

			this.html = html;
			this.init();

			return (instance = this);
		};

		CreateDiv.prototype.init = function () {
			var div = document.createElement('div');

			div.innerHTML = this.html;

			document.body.appendChild(div);
		};

		return CreateDiv;
	})();

	var a = new CreateDiv('sven1');
	var b = new CreateDiv('sven2');

	console.log(a === b);
}

// ft();
//为了把instance封装起来，我们使用了自执行的匿名函数和闭包，
//并且让这个匿名函数返回真正的Singleton构造方法，这增加了一些程序的复杂度，
//阅读起来也不是很舒服。

//在这段代码中，CreateDiv的构造函数实际上负责了两件事情。
//第一是创建对象和执行初始化init方法，第二是保证只有一个对象。
//虽然我们目前还没有接触过“单一职责原则”的概念，但可以明确的是，
//这是一种不好的做法，至少这个构造函数看起来很奇怪。

//假设我们某天需要利用这个类，在页面中创建千千万万的div，
//即要让这个类从单例类变成一个普通的可产生多个实例的类，
//那我们必须得改写CreateDiv构造函数，把控制创建唯一对象的那一段去掉，
//这种修改会给我们带来不必要的烦恼

//4.3 用代理实现单例模式-----------------------------------------------------------------------------
//现在我们通过引入代理类的方式，来解决上面提到的问题。
//**将单例自身与其管理逻辑分离
function ft1() {
	//将负责管理单例的代码移除
	var CreateDiv = function () {
		this.html = html;
		this.init();
	};

	CreateDiv.prototype.init = function () {
		var div = document.createElement('div');

		div.innerHTML = this.html;
		document.body.appendChild(div);
	};

	//引入代理类
	var ProxySingletonCreateDiv = (function () {
		var instance;

		return function (html) {
			if (!instance) {
				instance = new CreateDiv(html);
			}

			return instance;
		};
	})();

	var a = new ProxySingletonCreateDiv('sven1');
	var b = new ProxySingletonCreateDiv('sven2');

	console.log(a === b);
}

// ft1();
//通过引入代理类的方式，我们同样完成了一个单例模式的编写，
//跟之前不同的是，现在我们把负责管理单例的逻辑移到了代理类proxySingletonCreateDiv中。
//这样一来，CreateDiv就变成了一个普通的类，
//它跟proxySingletonCreateDiv组合起来可以达到单例模式的效果。
//本例是缓存代理的应用之一，在第6章中，我们将继续了解代理带来的好处。

//4.4 JavaScript中的单例模式
//前面提到的几种单例模式的实现，更多的是接近传统面向对象语言中的实现，
//单例对象从“类”中创建而来。在以类为中心的语言中，这是很自然的做法。
//比如在Java中，如果需要某个对象，就必须先定义一个类，对象总是从类中创建而来的。
//但JavaScript其实是一门无类（class-free）语言，也正因为如此，
//生搬单例模式的概念并无意义。在JavaScript中创建对象的方法非常简单，
//既然我们只需要一个“唯一”的对象，为什么要为它先创建一个“类”呢？这无异于穿棉衣洗澡，
//传统的单例模式实现在JavaScript中并不适用。单例模式的核心是确保只有一个实例，
//并提供全局访问。全局变量不是单例模式，但在JavaScript开发中，
//我们经常会把全局变量当成单例来使用。

//作为普通的开发者，我们有必要尽量减少全局变量的使用，即使需要，
//也要把它的污染降到最低。以下几种方式可以相对降低全局变量带来的命名污染。
function ff() {
	//1,使用命名空间
	var nameSpace1 = {
		a: function () {
			console.log(1);
		},
		b: function () {
			console.log(2);
		},
	};

	//动态地创建命名空间
	var MyApp = {};

	MyApp.nameSpace = function (name) {
		console.log('name', name);
		var parts = name.split('.');
		console.log('parts', parts);
		var current = MyApp;
		console.log(current === MyApp);

		for (var i in parts) {
			if (!current[parts[i]]) {
				current[parts[i]] = {};
			}

			//指针，将current[parts[i]]设为新的指向目标
			current = current[parts[i]];
		}
	};

	MyApp.nameSpace('event.part2.part3');
	MyApp.nameSpace('dom.style');

	console.dir(MyApp);
}

// ff();

//2,使用闭包封装私有变量
//这种方法把一些变量封装在闭包的内部，只暴露一些接口跟外界通信：
function ff1() {
	var user = (function () {
		var _name = 'sven',
			_age = 29;

		return {
			getUserInfo: function () {
				return _name + '-' + _age;
			},
		};
	})();

	console.log(user.getUserInfo());
}

// ff1();
//我们用下划线来约定私有变量__name和__age，
//它们被封装在闭包产生的作用域中，外部是访问不到这两个变量的，
//这就避免了对全局的命令污染。

//4.5 惰性单例
//惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点，
//这种技术在实际开发中非常有用，有用的程度可能超出了我们的想象，
//实际上在本章开头就使用过这种技术，instance实例对象总是在我们调用
//Singleton.getInstance的时候才被创建，而不是在页面加载好的时候就创建，代码如下：
function ff2() {
	const Singleton = {};

	Singleton.getInstance = (function () {
		var instance = null;

		return function (name) {
			if (!instance) {
				instance = new Singleton(name);
			}

			return instance;
		};
	})();
}
//不过这是基于“类”的单例模式，前面说过，
//基于“类”的单例模式在JavaScript中并不适用，下面我们将以WebQQ的登录浮窗为例，
//介绍与全局变量结合实现惰性的单例。

//假设我们是WebQQ的开发人员（网址是web.qq.com），
//当点击左边导航里QQ头像时，会弹出一个登录浮窗（如图4-1所示），
//很明显这个浮窗在页面里总是唯一的，不可能出现同时存在两个登录窗口的情况

//第一种解决方案是在页面加载完成的时候便创建好这个div浮窗，
//这个浮窗一开始肯定是隐藏状态的，当用户点击登录按钮的时候，它才开始显示：
function ff3() {
	const button = document.createElement('button');
	button.innerHTML = '登录';
	button.id = 'loginBtn';
	document.body.appendChild(button);

	var loginLayer = (function () {
		var div = document.createElement('div');

		div.innerHTML = '我是登录浮窗';
		div.style.display = 'none';
		document.body.appendChild(div);

		return div;
	})();

	button.onclick = function () {
		loginLayer.style.display = 'block';
	};
}

// ff3();
//这种方式有一个问题，也许我们进入WebQQ只是玩玩游戏或者看看天气，
//根本不需要进行登录操作，因为登录浮窗总是一开始就被创建好，
//那么很有可能将白白浪费一些DOM节点。

//现在改写一下代码，使用户点击登录按钮的时候才开始创建该浮窗：
function ff4() {
	const button = document.createElement('button');
	button.innerHTML = '登录';
	button.id = 'loginBtn';
	document.body.appendChild(button);

	var createLoginLayer = function () {
		var div = document.createElement('div');

		div.innerHTML = '我是登录浮窗';
		div.style.display = 'none';
		document.body.appendChild(div);

		return div;
	};

	button.onclick = function () {
		var loginLayer = createLoginLayer();
		loginLayer.style.display = 'block';
	};
}

// ff4();
//虽然现在达到了惰性的目的，但失去了单例的效果。
//当我们每次点击登录按钮的时候，都会创建一个新的登录浮窗div。
//虽然我们可以在点击浮窗上的关闭按钮时（此处未实现）把这个浮窗从页面中删除掉，
//但这样频繁地创建和删除节点明显是不合理的，也是不必要的。

//也许读者已经想到了，我们可以用一个变量来判断是否已经创建过登录浮窗，这
//也是本节第一段代码中的做法：
function ff5() {
	var createLoginLayer = (function () {
		var div;

		return function () {
			if (!div) {
				div = document.createElement('div');

				div.innerHTML = '我是登录浮窗';
				div.style.display = 'none';
				document.body.appendChild(div);
			}

			return div;
		};
	})();

	const button = document.createElement('button');
	button.innerHTML = '登录';
	button.id = 'loginBtn';
	document.body.appendChild(button);

	button.onclick = function () {
		var loginLayer = createLoginLayer();
		loginLayer.style.display = 'block';
	};
}

function getAButton() {
	const button = document.createElement('button');
	button.innerHTML = '登录';
	button.id = 'loginBtn';
	document.body.appendChild(button);

	return button;
}

// ff5();

//4.6 通用的惰性单例------------------------------------------------------------------------
//上一节我们完成了一个可用的惰性单例，但是我们发现它还有如下一些问题。
//❏ 这段代码仍然是违反单一职责原则的，
//创建对象和管理单例的逻辑都放在createLoginLayer对象内部。
//❏ 如果我们下次需要创建页面中唯一的iframe，或者script标签，用来跨域请求数据，
//就必须得如法炮制，把createLoginLayer函数几乎照抄一遍：
function fs() {
	var createIframe = (function () {
		var iframe;

		return function () {
			if (!iframe) {
				iframe = document.createElement('iframe');

				iframe.style.display = 'none';
				document.body.appendChild(iframe);
			}

			return iframe;
		};
	})();
}
//我们需要把不变的部分隔离出来，先不考虑创建一个div和创建一个iframe有多少差异，
//管理单例的逻辑其实是完全可以抽象出来的，这个逻辑始终是一样的：
//用一个变量来标志是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象：
//var obj; if(!obj){obj = xxx}

//现在我们就把如何管理单例的逻辑从原来的代码中抽离出来，
//这些逻辑被封装在getSingle函数内部，创建对象的方法fn被当成参数动态传入getSingle函数：
function fs1() {
	var getSingle = function (fn) {
		var result;

		return function () {
			return result || (result = fn.apply(this, arguments));
		};
	};

	//接下来将用于创建登录浮窗的方法用参数fn的形式传入getSingle，
	//我们不仅可以传入createLoginLayer，
	//还能传入createScript、createIframe、createXhr等。之后再让getSingle返回一个新的函数，
	//并且用一个变量result来保存fn的计算结果。result变量因为身在闭包中，它永远不会被销毁。
	//在将来的请求中，如果result已经被赋值，那么它将返回这个值。代码如下：

	//创建登录浮窗
	var createLoginLayer = function () {
		var div = document.createElement('div');

		div.innerHTML = '我是登录浮窗';
		div.style.display = 'none';
		document.body.appendChild(div);

		return div;
	};

	var createSingleLoginLayer = getSingle(createLoginLayer);

	getAButton().onclick = function () {
		var loginLayer = createSingleLoginLayer();

		loginLayer.style.display = 'block';
	};

	//创建iframe
	var createSingleIframe = getSingle(function () {
		var iframe = document.createElement('iframe');

		document.body.appendChild(iframe);

		return iframe;
	});

	getAButton().onclick = function () {
		var loginLayer = createSingleIframe();

		loginLayer.src = 'http://baidu.com';
	};
}

// fs1();
//在这个例子中，我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里，
//这两个方法可以独立变化而互不影响，当它们连接在一起的时候，
//就完成了创建唯一实例对象的功能，看起来是一件挺奇妙的事情。

//这种单例模式的用途远不止创建对象，比如我们通常渲染完页面中的一个列表之后，
//接下来要给这个列表绑定click事件，如果是通过ajax动态往列表里追加数据，
//在使用事件代理的前提下，click事件实际上只需要在第一次渲染列表的时候被绑定一次，
//但是我们不想去判断当前是否是第一次渲染列表，如果借助于jQuery，
//我们通常选择给节点绑定one事件：
function fs2() {
	var getSingle = function (fn) {
		var result;

		return function () {
			return result || fn.apply(this, arguments);
		};
	};

	const button = getAButton();

	var bindEvent = getSingle(function () {
		button.onclick = function () {
			alert('Click');
		};

		return true;
	});

	var render = function () {
		console.log('开始渲染列表');
		bindEvent();
	};

	render();
	render();
	render();
}

// fs2();
//可以看到，render函数和bindEvent函数都分别执行了3次，但div实际上只被绑定了一个事件。

/** 小结：单例模式是我们学习的第一个模式，我们先学习了传统的单例模式实现，
 * 也了解到因为语言的差异性，有更适合的方法在JavaScript中创建单例。
 * 这一章还提到了代理模式和单一职责原则，后面的章节会对它们进行更详细的讲解。
 * 在getSinge函数中，实际上也提到了闭包和高阶函数的概念。
 * 单例模式是一种简单但非常实用的模式，特别是惰性单例技术，
 * 在合适的时候才创建对象，并且只创建唯一的一个。更奇妙的是，
 * 创建对象和管理单例的职责被分布在两个不同的方法中，
 * 这两个方法组合起来才具有单例模式的威力。 */
