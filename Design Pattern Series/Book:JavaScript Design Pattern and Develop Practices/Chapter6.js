/** Chapter6：代理模式 */
//代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
//代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，
//提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。
//替身对象对请求做出一些处理之后，再把请求转交给本体对象。

//6.1 第一个例子---小明追MM的故事
//不用代理模式
function so() {
	var Flower = function () {};

	var xiaoming = {
		sendFlower: function (target) {
			var flower = new Flower();

			target.receiveFlower(flower);
		},
	};

	var A = {
		receiveFlower: function (flower) {
			console.log('flower received' + flower);
		},
	};

	xiaoming.sendFlower(A);
}

// so();

//引入代理
function so1() {
	var Flower = function () {};

	var xiaoming = {
		sendFlower: function (target) {
			var flower = new Flower();

			target.receiveFlower(flower);
		},
	};

	var B = {
		receiveFlower: function (flower) {
			A.receiveFlower(flower);
		},
	};

	var A = {
		receiveFlower: function (flower) {
			console.log('flower received' + flower);
		},
	};

	xiaoming.sendFlower(B);
}

// so1();

//有监听功能的代理
function so2() {
	var Flower = function () {};

	var xiaoming = {
		sendFlower: function (target) {
			var flower = new Flower();

			target.receiveFlower(flower);
		},
	};

	var B = {
		receiveFlower: function (flower) {
			//监听
			A.listenGoodMood(function () {
				A.receiveFlower(flower);
			});
		},
	};

	var A = {
		receiveFlower: function (flower) {
			console.log('flower received' + flower);
		},

		listenGoodMood: function (fn) {
			//假设10秒后A的心情变好
			setTimeout(function () {
				fn();
			}, 1000);
		},
	};

	xiaoming.sendFlower(B);
}

// so2();

//6.2 保护代理和虚拟代理----------------------------------------------------------------------
//虽然这只是个虚拟的例子，但我们可以从中找到两种代理模式的身影。
//代理B可以帮助A过滤掉一些请求，比如送花的人中年龄太大的或者没有宝马的，
//这种请求就可以直接在代理B处被拒绝掉。这种代理叫作保护代理。
//A和B一个充当白脸，一个充当黑脸。白脸A继续保持良好的女神形象，
//不希望直接拒绝任何人，于是找了黑脸B来控制对A的访问。

//另外，假设现实中的花价格不菲，导致在程序世界里，
//new Flower也是一个代价昂贵的操作，那么我们可以把new Flower的操作交给
//代理B去执行，代理B会选择在A心情好时再执行new Flower，
//这是代理模式的另一种形式，叫作虚拟代理。虚拟代理把一些开销很大的对象，
//延迟到真正需要它的时候才去创建。代码如下：
function st() {
	var B = {
		receiveFlower: function (flower) {
			A.listenGoodMood(() => {
				var flower = new Flower();

				A.receiveFlower(flower);
			});
		},
	};
}
//保护代理用于控制不同权限的对象对目标对象的访问，
//但在JavaScript并不容易实现保护代理，因为我们无法判断谁访问了某个对象。
//而虚拟代理是最常用的一种代理模式，本章主要讨论的也是虚拟代理。

//6.3 虚拟代理实现图片预加载--------------------------------------------------------------
//在Web开发中，图片预加载是一种常用的技术，
//如果直接给某个img标签节点设置src属性，由于图片过大或者网络不佳，
//图片的位置往往有段时间会是一片空白。常见的做法是先用一张loading图片占位，
//然后用异步的方式加载图片，等图片加载好了再把它填充到img节点里，
//这种场景就很适合使用虚拟代理。

//下面我们来实现这个虚拟代理，首先创建一个普通的本体对象，
//这个对象负责往页面中创建一个img标签，并且提供一个对外的setSrc接口，
//外界调用这个接口，便可以给该img标签设置src属性：
function st() {
	var myImage = (function () {
		var imgNode = document.createElement('img');

		document.body.appendChild(imgNode);

		return {
			setSrc: function (src) {
				imgNode.src = src;
			},
		};
	})();

	myImage.setSrc('https://cdn-health.zhongan.com/magiccube/resource/rl/BfrsmCNECM.png');
}

// st();
//我们把网速调至5KB/s，然后通过MyImage.setSrc给该img节点设置src，
//可以看到，在图片被加载好之前，页面中有一段长长的空白时间。

//现在开始引入代理对象proxyImage，通过这个代理对象，
//在图片被真正加载好之前，页面中将出现一张占位的菊花图loading.gif，
//来提示用户图片正在加载。代码如下：
function st1() {
	var myImage = (function () {
		var imgNode = document.createElement('img');

		document.body.appendChild(imgNode);

		return {
			setSrc: function (src) {
				imgNode.src = src;
			},
		};
	})();

	var proxyImage = (function () {
		var img = new Image();

		img.onload = function () {
			console.log('img onload');
			myImage.setSrc(this.src);
		};

		return {
			setSrc: function (src) {
				console.log('proxy1st');
				myImage.setSrc('https://cdn-health.zhongan.com/magiccube/resource/rl/BfrsmCNECM.png');

				img.src = src;
			},
		};
	})();

	proxyImage.setSrc(' https://cdn-health.zhongan.com/magiccube/resource/rl/uc0HZbyQmd.png');
}

// st1()
//现在我们通过proxyImage间接地访问MyImage。
//proxyImage控制了客户对MyImage的访问，并且在此过程中加入一些额外的操作，
//比如在真正的图片加载好之前，先把img节点的src设置为一张本地的loading图片。

//6.4 代理的意义---------------------------------------------------------------------------------
//也许读者会有疑问，不过是实现一个小小的图片预加载功能，
//即使不需要引入任何模式也能办到，那么引入代理模式的好处究竟在哪里呢？
//下面我们先抛开代理，编写一个更常见的图片预加载函数。

//不用代理的预加载图片函数实现如下：
function sf() {
	var MyImage = (function () {
		var imgNode = document.createElement('img');

		document.body.appendChild(imgNode);

		var img = new Image();

		img.onload = function () {
			imgNode.src = img.src;
		};

		return {
			setSrc: function (src) {
				imgNode.src = 'https://cdn-health.zhongan.com/magiccube/resource/rl/BfrsmCNECM.png';

				img.src = src;
			},
		};
	})();

	MyImage.setSrc('https://cdn-health.zhongan.com/magiccube/resource/rl/uc0HZbyQmd.png');
}

// sf();
/**
 * 为了说明代理的意义，下面我们引入一个面向对象设计的原则——单一职责原则。
 * 单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，
 * 应该仅有一个引起它变化的原因。如果一个对象承担了多项职责，
 * 就意味着这个对象将变得巨大，引起它变化的原因可能会有多个。
 * 面向对象设计鼓励将行为分布到细粒度的对象之中，如果一个对象承担的职责过多，
 * 等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的设计。
 * 当变化发生时，设计可能会遭到意外的破坏。
 *
 * 职责被定义为“引起变化的原因”。
 * 上段代码中的MyImage对象除了负责给img节点设置src外，
 * 还要负责预加载图片。我们在处理其中一个职责时，
 * 有可能因为其强耦合性影响另外一个职责的实现。
 *
 * 另外，在面向对象的程序设计中，大多数情况下，若违反其他任何原则，
 * 同时将违反开放—封闭原则。如果我们只是从网络上获取一些体积很小的图片，
 * 或者5年后的网速快到根本不再需要预加载，
 * 我们可能希望把预加载图片的这段代码从MyImage对象里删掉。
 * 这时候就不得不改动MyImage对象了。
 *
 * 实际上，我们需要的只是给img节点设置src，预加载图片只是一个锦上添花的功能。
 * 如果能把这个操作放在另一个对象里面，自然是一个非常好的方法。
 * 于是代理的作用在这里就体现出来了，代理负责预加载图片，
 * 预加载的操作完成之后，把请求重新交给本体MyImage。
 *
 * 纵观整个程序，我们并没有改变或者增加MyImage的接口，但是通过代理对象，
 * 实际上给系统添加了新的行为。这是符合开放—封闭原则的。
 * 给img节点设置src和图片预加载这两个功能，被隔离在两个对象里，
 * 它们可以各自变化而不影响对方。何况就算有一天我们不再需要预加载，
 * 那么只需要改成请求本体而不是请求代理对象即可。
 */

//6.5 代理和本体接口的一致性
/**
 * 上一节说到，如果有一天我们不再需要预加载，那么就不再需要代理对象，
 * 可以选择直接请求本体。其中关键是代理对象和本体都对外提供了setSrc方法，
 * 在客户看来，代理对象和本体是一致的，代理接手请求的过程对于用户来说是透明的，
 * 用户并不清楚代理和本体的区别，这样做有两个好处。
 *
 * ❏ 用户可以放心地请求代理，他只关心是否能得到想要的结果。
 * ❏ 在任何使用本体的地方都可以替换成使用代理。
 *
 * 在Java等语言中，代理和本体都需要显式地实现同一个接口，
 * 一方面接口保证了它们会拥有同样的方法，另一方面，
 * 面向接口编程迎合依赖倒置原则，通过接口进行向上转型，
 * 从而避开编译器的类型检查，代理和本体将来可以被替换使用。
 *
 * 在JavaScript这种动态类型语言中，
 * 我们有时通过鸭子类型来检测代理和本体是否都实现了setSrc方法，
 * 另外大多数时候甚至干脆不做检测，全部依赖程序员的自觉性，
 * 这对于程序的健壮性是有影响的。不过对于一门快速开发的脚本语言，
 * 这些影响还是在可以接受的范围内，而且我们也习惯了没有接口的世界。
 *
 * 另外值得一提的是，如果代理对象和本体对象都为一个函数（函数也是对象），
 * 函数必然都能被执行，则可以认为它们也具有一致的“接口”，代码如下：
 */
function sf() {
	var myImage = (function () {
		var imgNode = document.createElement('img');

		document.body.appendChild(imgNode);

		return function (src) {
			imgNode.src = src;
		};
	})();

	var proxyImage = (function () {
		var img = new Image();

		img.onload = function () {
			myImage(this.src);
		};

		return function (src) {
			myImage('https://cdn-health.zhongan.com/magiccube/resource/rl/BfrsmCNECM.png');

			img.src = src;
		};
	})();

	proxyImage('https://cdn-health.zhongan.com/magiccube/resource/rl/uc0HZbyQmd.png');
}

// sf();

//6.6 虚拟代理合并HTTP请求
//假设我们在做一个文件同步的功能，当我们选中一个checkbox的时候，
//它对应的文件就会被同步到另外一台备用服务器上面
function ss() {
	//我们先在页面中放置好这些checkbox节点：
	var synchronousFile = function (id) {
		console.log('开始同步文件,id为：' + id);
	};

	for (let i = 1; i < 10; i++) {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.innerHTML = i;
		checkbox.onclick = (function (i) {
			return function () {
				if (this.checked) {
					synchronousFile(i);
				}
			};
		})(i);

		document.body.appendChild(checkbox);
	}
}

// ss();
//当我们选中3个checkbox的时候，依次往服务器发送了3次同步文件的请求。
//而点击一个checkbox并不是很复杂的操作，作为APM250+的资深Dota玩家，
//我有把握一秒钟之内点中4个checkbox。可以预见，
//如此频繁的网络请求将会带来相当大的开销。

//解决方案是，我们可以通过一个代理函数proxySynchronousFile
//来收集一段时间之内的请求，最后一次性发送给服务器。
//比如我们等待2秒之后才把这2秒之内需要同步的文件ID打包发给服务器，
//如果不是对实时性要求非常高的系统，2秒的延迟不会带来太大副作用，
//却能大大减轻服务器的压力。代码如下：

//-------------------------------------------------------------------------
function getCheckboxes(fn) {
	for (let i = 1; i < 10; i++) {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.innerHTML = i;
		checkbox.id = i;
		checkbox.onclick = fn;

		document.body.appendChild(checkbox);
	}
}
//-------------------------------------------------------------------------

function ss1() {
	var synchronousFile = function (id) {
		console.log('开始同步文件,id为：' + id);
	};

	var proxySynchronousFile = (function () {
		//保存一段时间内需要同步的ID
		var cache = [];
		//定时器
		var timer;

		return function (id) {
			cache.push(id);

			//保证不会覆盖已经启动的定时器
			if (timer) {
				return;
			}

			timer = setTimeout(function () {
				//2秒后向本体发送需要同步的ID集合
				synchronousFile(cache.join(','));
				//清空定时器
				clearTimeout(timer);

				timer = null;

				//清空ID集合
				cache.length = 0;
			}, 2000);
		};
	})();

	getCheckboxes(function () {
		console.log('checked');
		if (this.checked === true) {
			proxySynchronousFile(this.id);
		}
	});
}

// ss1();

//6.7 虚拟代理在惰性加载中的应用------------------------------------------------------
function ss() {
	var miniConsole = (function () {
		var cache = [];

		var handler = function (ev) {
			console.log(ev.keyCode);
			if (ev.keyCode === 75) {
				var script = document.createElement('script');

				script.onload = function () {
					for (var i = 0, fn; (fn = cache[i++]); ) {
						fn();
					}
				};

				script.src = 'miniConsole.js';
				document.getElementsByTagName('head')[0].appendChild(script);

				document.body.removeEventListener('keydown', handler);
			}
		};

		document.body.addEventListener('keydown', handler, false);

		return {
			log: function () {
				var args = arguments;

				cache.push(function () {
					return miniConsole.log.apply(miniConsole, args);
				});
			},
		};
	})();

	miniConsole.log(11);

	miniConsole = {
		log: function () {
			//真正代码略
			console.log(Array.prototype.join.call(arguments));
		},
	};
}

// ss();

//6.8 缓存代理------------------------------------------------------------------------
//缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，
//如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。

//6.8.1 缓存代理的例子---计算乘积
//先创建一个用于求乘积的函数
function se() {
	var mult = function () {
		console.log('开始计算乘积');

		var a = 1;

		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}

		return a;
	};

	const result1 = mult(2, 3);
	const result2 = mult(2, 3, 4);

	console.log(result1);
	console.log(result2);

	//现在加入缓存代理函数
	var proxyMult = (function () {
		var cache = {};

		return function () {
			var args = Array.prototype.join.call(arguments, ',');

			//若参数（key）已存在于缓存，从缓存中取得并返回结果（value）
			if (args in cache) {
				return cache[args];
			}

			//若参数（key）不存在于缓存，调用本体计算函数，将key和value置入缓存
			//并返回结果
			return (cache[args] = mult.apply(this, arguments));
		};
	})();

	const result3 = proxyMult(1, 2, 3, 4);
	const result4 = proxyMult(1, 2, 3, 4);

	console.log(result3);
	console.log(result4);
}

// se();

//6.8.2 缓存代理用于ajax异步请求数据
//我们在常常在项目中遇到分页的需求，同一页的数据理论上只需要去后台拉取一次，
//这些已经拉取到的数据在某个地方被缓存之后，下次再请求同一页的时候，
//便可以直接使用之前的数据。显然这里也可以引入缓存代理，
//实现方式跟计算乘积的例子差不多，唯一不同的是，请求数据是个异步的操作，
//我们无法直接把计算结果放到代理对象的缓存中，而是要通过回调的方式。
//具体代码不再赘述，读者可以自行实现。

//6.9 用高阶函数动态创建代理----------------------------------------------------------------
/**
 * 通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。
 * 现在这些计算方法被当作参数传入一个专门用于创建缓存代理的工厂中，
 * 这样一来，我们就可以为乘法、加法、减法等创建缓存代理，代码如下：
 */
function sn() {
	//计算乘积
	var mult = function () {
		var a = 1;

		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}

		return a;
	};

	//计算加和
	var plus = function () {
		var a = 0;

		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a + arguments[i];
		}

		return a;
	};

	//创建缓存代理的工厂
	var createProxyFactory = function (fn) {
		var cache = {};

		return function () {
			var args = Array.prototype.join.call(arguments, ',');

			if (args in cache) {
				return cache[args];
			}

			return (cache[args] = fn.apply(this, arguments));
		};
	};

	var proxyMult = createProxyFactory(mult);
	var proxyPlus = createProxyFactory(plus);

	alert(proxyMult(1, 2, 3, 4));
	alert(proxyMult(1, 2, 3, 4));
	alert(proxyPlus(1, 2, 3, 4));
	alert(proxyPlus(1, 2, 3, 4));
}

// sn();

//6.10 其他代理模式--------------------------------------------------------------------------
//代理模式的变体种类非常多，限于篇幅及其在JavaScript中的适用性，
//本章只简约介绍一下这些代理，就不一一详细展开说明了。

//❏ 防火墙代理：控制网络资源的访问，保护主题不让“坏人”接近。

//❏ 远程代理：为一个对象在不同的地址空间提供局部代表，在Java中，
//远程代理可以是另一个虚拟机中的对象。

//❏ 保护代理：用于对象应该有不同访问权限的情况。

//❏ 智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，
//比如计算一个对象被引用的次数。

//❏ 写时复制代理：通常用于复制一个庞大对象的情况。
//写时复制代理延迟了复制的过程，当对象被真正修改时，才对它进行复制操作。
//写时复制代理是虚拟代理的一种变体，DLL（操作系统中的动态链接库）
//是其典型运用场景。

//6.11 小结---------------------------------------------------------------------------------------
//代理模式包括许多小分类，在JavaScript开发中最常用的是虚拟代理和缓存代理。
//虽然代理模式非常有用，但我们在编写业务代码的时候，
//往往不需要去预先猜测是否需要使用代理模式。
//当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。
