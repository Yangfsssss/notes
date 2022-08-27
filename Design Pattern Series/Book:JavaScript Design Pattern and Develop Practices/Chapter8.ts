/** Chapter8：发布---订阅模式 */
/**
 * 发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，
 * 当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
 * 在JavaScript开发中，我们一般用事件模型来替代传统的发布—订阅模式。
 */

//8.1 现实中的发布---订阅模式-------------------------------------------------------------------
//8.2 发布---订阅模式的作用---------------------------------------------------------------------
/**
 * 在刚刚的例子中，发送短信通知就是一个典型的发布—订阅模式，
 * 小明、小红等购买者都是订阅者，他们订阅了房子开售的消息。
 * 售楼处作为发布者，会在合适的时候遍历花名册上的电话号码，
 * 依次给购房者发布消息。可以发现，
 * 在这个例子中使用发布—订阅模式有着显而易见的优点。
 *
 * ❏ 购房者不用再天天给售楼处打电话咨询开售时间，在合适的时间点，
 * 售楼处作为发布者会通知这些消息订阅者。
 *
 * ❏ 购房者和售楼处之间不再强耦合在一起，当有新的购房者出现时，
 * 他只需把手机号码留在售楼处，售楼处不关心购房者的任何情况，
 * 不管购房者是男是女还是一只猴子。而售楼处的任何变动也不会影响购买者，
 * 比如售楼MM离职，售楼处从一楼搬到二楼，这些改变都跟购房者无关，
 * 只要售楼处记得发短信这件事情。
 *
 * 第一点说明发布—订阅模式可以广泛应用于异步编程中，
 * 这是一种替代传递回调函数的方案。比如，
 * 我们可以订阅ajax请求的error、succ等事件。
 * 或者如果想在动画的每一帧完成之后做一些事情，
 * 那我们可以订阅一个事件，然后在动画的每一帧完成之后发布这个事件。
 * 在异步编程中使用发布—订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，
 * 而只需要订阅感兴趣的事件发生点。
 *
 * 第二点说明发布—订阅模式可以取代对象之间硬编码的通知机制，
 * 一个对象不用再显式地调用另外一个对象的某个接口。
 * 发布—订阅模式让两个对象松耦合地联系在一起，虽然不太清楚彼此的细节，
 * 但这不影响它们之间相互通信。当有新的订阅者出现时，
 * 发布者的代码不需要任何修改；同样发布者需要改变时，
 * 也不会影响到之前的订阅者。只要之前约定的事件名没有变化，
 * 就可以自由地改变它们。
 */

//8.3 DOM事件--------------------------------------------------------------------------------
function e1() {
	document.body.addEventListener(
		'click',
		function () {
			alert(2);
		},
		false
	);

	document.body.addEventListener(
		'click',
		function () {
			alert(3);
		},
		false
	);

	document.body.addEventListener(
		'click',
		function () {
			alert(4);
		},
		false
	);

	document.body.click();
}

// e1();
//在这里需要监控用户点击document.body的动作，
//但是我们没办法预知用户将在什么时候点击。
//所以我们订阅document.body上的click事件，当body节点被点击时，
//body节点便会向订阅者发布这个消息。这很像购房的例子，
//购房者不知道房子什么时候开售，于是他在订阅消息后等待售楼处发布消息。

//当然我们还可以随意增加或者删除订阅者，增加任何订阅者都不会影响发布者代码的编写：

//8.4 自定义事件-----------------------------------------------------------------------------
//除了DOM事件，我们还会经常实现一些自定义的事件，
//这种依靠自定义事件完成的发布—订阅模式可以用于任何JavaScript代码中。

//现在看看如何一步步实现发布—订阅模式。
//❏ 首先要指定好谁充当发布者（比如售楼处）；
//❏ 然后给发布者添加一个缓存列表，用于存放回调函数以便通知
//订阅者（售楼处的花名册）；
//❏ 最后发布消息的时候，发布者会遍历这个缓存列表，
//依次触发里面存放的订阅者回调函数（遍历花名册，挨个发短信）。

//另外，我们还可以往回调函数里填入一些参数，订阅者可以接收这些参数。
//这是很有必要的，比如售楼处可以在发给订阅者的短信里加上房子的单价、
//面积、容积率等信息，订阅者接收到这些信息之后可以进行各自的处理：
function e2() {
	interface SalesOffices {
		clientList: {};
		listen: (key: string, fn: (...args: any) => any) => void;
		trigger: (...args: any) => void;
	}

	//定义售楼处
	var salesOffices = {} as SalesOffices;
	//缓存列表，存放订阅者的回调函数
	salesOffices.clientList = {};

	//增加订阅者
	salesOffices.listen = function (key, fn) {
		//如果还没有订阅过此类消息，给该类消息创建一个缓存列表
		if (!this.clientList[key]) {
			this.clientList[key] = [];
		}

		//订阅的消息添加进缓存列表
		this.clientList[key].push(fn);
	};

	//发布消息
	salesOffices.trigger = function (key, ...args) {
		//取出该消息类型对应的回调函数集合
		var fns = this.clientList[key];

		//如果没有订阅此消息，则返回
		if (!fns || fns.length === 0) {
			return false;
		}

		for (var i = 0, fn; (fn = fns[i]); i++) {
			fn.apply(this, [...args]);
		}
	};

	salesOffices.listen('squareMeter88', function (price) {
		//小明订阅88平方米房子的消息
		console.log('价格= ' + price);
	});

	salesOffices.listen('squareMeter110', function (price) {
		//小红订阅110平方米房子的消息
		console.log('价格= ' + price);
	});

	salesOffices.trigger('squareMeter88', 2000000);
	salesOffices.trigger('squareMeter110', 3000000);
}

// e2();

//8.5 发布---订阅模式的通用实现
//现在我们已经看到了如何让售楼处拥有接受订阅和发布事件的功能。
//假设现在小明又去另一个售楼处买房子，那么这段代码是否必须在另一个
//售楼处对象上重写一次呢，有没有办法可以让所有对象都拥有发布—订阅功能呢？
//答案显然是有的，JavaScript作为一门解释执行的语言，
//给对象动态添加职责是理所当然的事情。所以我们把发布—订阅的功能提取出来，
//放在一个单独的对象内：
function e3() {
	interface SalesOffices {
		clientList: {};
		listen: (key: string, fn: (...args: any) => any) => void;
		remove?: (key: string, fn: (...args: any) => any) => void;
		trigger: (...args: any) => boolean | undefined;
	}

	var event = {
		clientList: [],
		listen: function (key, fn) {
			if (!this.clientList[key]) {
				this.clientList[key] = [];
			}

			this.clientList[key].push(fn);
		},
		trigger: function (key, ...args) {
			var fns = this.clientList[key];

			if (!fns || fns.length === 0) {
				return false;
			}

			for (var i = 0, fn; (fn = fns[i]); i++) {
				fn.apply(this, [...args]);
			}
		},
	} as SalesOffices;

	//再定义一个installEvent函数，这个函数可以给所有的对象都动态安装发布—订阅功能：
	var installEvent = function (obj: object) {
		for (var i in event) {
			obj[i] = event[i];
			console.log(obj[i] === event[i]);
		}
	};

	//测试
	var salesOffices = {} as SalesOffices;

	installEvent(salesOffices);

	salesOffices.listen('squareMeter88', function (price) {
		//小明订阅消息
		console.log('价格= ' + price);
	});

	salesOffices.listen('squareMeter110', function (price) {
		//小红订阅消息
		console.log('价格= ' + price);
	});

	salesOffices.trigger('squareMeter88', 2000000);
	salesOffices.trigger('squareMeter110', 3000000);

	return { event, installEvent };
}

e3();

//8.6 取消订阅的事件
function e4() {
	interface SalesOffices {
		clientList: {};
		listen: (key: string, fn: (...args: any) => any) => void;
		remove?: (key: string, fn?: (...args: any) => any) => void;
		trigger: (key: string, ...args: any) => boolean | undefined;
	}

	const { event, installEvent } = e3();

	event.remove = function (key, fn) {
		var fns = this.clientList[key];

		//如果key对应的消息没有被人订阅，则直接返回
		if (!fns) {
			return false;
		}
		//如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
		if (!fn) {
			fns && (fns.length = 0);
		} else {
			for (var l = fns.length - 1; l >= 0; l--) {
				//反向遍历订阅的回调函数列表
				var _fn = fns[1];

				if (_fn === fn) {
					fns.splice(l, 1);
				}
			}
		}
	};

	var salesOffices = {} as SalesOffices;

	installEvent(salesOffices);

	var fn1, fn2;

	//小明订阅消息
	salesOffices.listen(
		'squareMeter88',
		(fn1 = function (price) {
			console.log('价格= ' + price);
		})
	);

	//小红订阅消息
	salesOffices.listen(
		'squareMeter110',
		(fn2 = function (price) {
			console.log('价格= ' + price);
		})
	);

	salesOffices.remove('squareMeter88', fn1);
	salesOffices.trigger('squareMeter88', 2000000);
}

// e4();

//8.7 真实的例子---网站登录-------------------------------------------------------
function e5() {
	interface SalesOffices {
		clientList: {};
		listen: (key: string, fn: (...args: any) => any) => void;
		remove?: (key: string, fn?: (...args: any) => any) => boolean | void;
		trigger: (key: string, ...args: any) => boolean | void;
	}

	var login = {
		clientList: {},
		listen: function (key, fn) {
			if (!this.clientList[key]) {
				this.clientList[key] = [];
				this.clientList[key].push(fn);
			} else {
				this.clientList[key].push(fn);
			}
		},
		trigger: function (key, ...args) {
			if (!this.clientList[key]) {
				return false;
			}

			for (var i = 0; i < this.clientList[key].length; i++) {
				console.log(this.clientList[key]);
				this.clientList[key][i].apply(this.clientList[key], [...args]);
			}
		},
		remove: function (key, fn) {
			let fns = this.clientList[key];
			console.log(fns === this.clientList[key]);

			console.log('fns1', fns);

			if (!fns) {
				return false;
			}

			if (!fn) {
				fns.length = 0;
			} else {
				//原地修改fns
				fns.splice(fns.indexOf(fn), 1);
				console.log(fns);
			}
		},
	} as SalesOffices;

	const data = {};

	setTimeout(() => {
		login.trigger('test', data);
		login.trigger('loginSucc', data);
	}, 2000);

	// login.listen('test',(data)=>{
	//   console.log('test triggered',data);
	// })

	var header = (function () {
		login.listen('loginSucc', function (data) {
			header.setAvatar(data.avatar);
		});

		return {
			setAvatar: function (data) {
				console.log('set header avatar');
			},
		};
	})();

	var nav = (function () {
		login.listen('loginSucc', function (data) {
			nav.setAvatar(data.avatar);
		});

		return {
			setAvatar: function (avatar) {
				console.log('set nav avatar');
			},
		};
	})();

	const refreshAddress = function (obj) {
		address.refresh(obj);
	};

	var address = (function () {
		login.listen('loginSucc', refreshAddress);

		return {
			refresh: function (avatar) {
				console.log('address refreshed');
			},
		};
	})();

	console.log(login.clientList);

	// login.remove('loginSucc',refreshAddress)

	console.log(login.clientList);
}

// e5();

//8.8 全局的发布-订阅对象-----------------------------------------------------------
//回想下刚刚实现的发布—订阅模式，我们给售楼处对象和登录对象都添加了订阅
//和发布的功能，这里还存在两个小问题。

//❏ 我们给每个发布者对象都添加了listen和trigger方法，
//以及一个缓存列表clientList，这其实是一种资源浪费。

//❏ 小明跟售楼处对象还是存在一定的耦合性，小明至少要知道售楼处对象
//的名字是salesOffices，才能顺利的订阅到事件。

//同样在程序中，发布—订阅模式可以用一个全局的Event对象来实现，
//订阅者不需要了解消息来自哪个发布者，
//发布者也不知道消息会推送给哪些订阅者，
//Event作为一个类似“中介者”的角色，把订阅者和发布者联系起来。
//见如下代码：
function e6() {
	var Event = (function () {
		var clientList = {};
		var listen: (key: string, fn: (...args: any) => any) => void;
		var trigger: (key: string, ...args: any) => boolean | void;
		var remove: (key: string, fn?: () => {}) => boolean | void;

		listen = function (key, fn) {
			if (!clientList[key]) {
				clientList[key] = [];
			}

			clientList[key].push(fn);
		};

		trigger = function (key, ...args) {
			var fns = clientList[key];

			if (!fns || fns.length === 0) {
				return false;
			}

			for (var i = 0, fn; (fn = fns[i]); i++) {
				fn.apply(this, [...args]);
			}
		};

		remove = function (key, fn) {
			var fns = clientList[key];

			if (!fns) {
				return false;
			}

			if (!fn) {
				fns && (fns.length = 0);
			} else {
				fns = fns.splice(fns.indexOf(fn), 1);
			}
		};

		return {
			listen,
			trigger,
			remove,
		};
	})();

	// Event.listen('squareMeter88', function (price) {
	//小红订阅消息
	// console.log('价格= ' + price);
	// });

	// Event.trigger('squareMeter88', 2000000);

	return Event;
}

// e6();

//8.9 模块间通信--------------------------------------------------------------------
//上一节中实现的发布—订阅模式的实现，是基于一个全局的Event对象，
//我们利用它可以在两个封装良好的模块中进行通信，
//这两个模块可以完全不知道对方的存在。就如同有了中介公司之后，
//我们不再需要知道房子开售的消息来自哪个售楼处。比如现在有两个模块，
//a模块里面有一个按钮，每次点击按钮之后，
//b模块里的div中会显示按钮的总点击次数，
//我们用全局发布—订阅模式完成下面的代码，
//使得a模块和b模块可以在保持封装性的前提下进行通信。
function e7() {
	const button = document.createElement('button');
	button.innerHTML = '点我';
	const div = document.createElement('div');

	document.body.appendChild(button);
	document.body.appendChild(div);

	const Event = e6();

	var a = (function () {
		var count = 0;
		button.onclick = function () {
			Event.trigger('add', count++);
		};
	})();

	var b = (function () {
		Event.listen('add', function (count) {
			div.innerHTML = count;
		});
	})();
}

// e7();
//但在这里我们要留意另一个问题，模块之间如果用了太多的全局发布—订阅
//模式来通信，那么模块与模块之间的联系就被隐藏到了背后。
//我们最终会搞不清楚消息来自哪个模块，或者消息会流向哪些模块，
//这又会给我们的维护带来一些麻烦，也许某个模块的作用就是暴露一些
//接口给其他模块调用。

//8.10 必须先订阅再发布吗？----------------------------------------------------------
/**
 * 我们所了解到的发布—订阅模式，都是订阅者必须先订阅一个消息，
 * 随后才能接收到发布者发布的消息。如果把顺序反过来，
 * 发布者先发布一条消息，而在此之前并没有对象来订阅它，
 * 这条消息无疑将消失在宇宙中。
 *
 * 在某些情况下，
 * 我们需要先将这条消息保存下来，等到有对象来订阅它的时候，
 * 再重新把消息发布给订阅者。就如同QQ中的离线消息一样，
 * 离线消息被保存在服务器中，接收人下次登录上线之后，
 * 可以重新收到这条消息。这种需求在实际项目中是存在的，
 * 比如在之前的商城网站中，获取到用户信息之后才能渲染用户导航模块，
 * 而获取用户信息的操作是一个ajax异步请求。当ajax请求成功返回之后会发布
 * 一个事件，在此之前订阅了此事件的用户导航模块可以接收到这些用户信息。
 *
 * 但是这只是理想的状况，因为异步的原因，我们不能保证ajax请求返回的时间，
 * 有时候它返回得比较快，而此时用户导航模块的代码还没有加载好
 * （还没有订阅相应事件），特别是在用了一些模块化惰性加载的技术后，
 * 这是很可能发生的事情。也许我们还需要一个方案，使得我们的发布—订阅
 * 对象拥有先发布后订阅的能力。
 *
 * 为了满足这个需求，我们要建立一个存放离线事件的堆栈，
 * 当事件发布的时候，如果此时还没有订阅者来订阅这个事件，
 * 我们暂时把发布事件的动作包裹在一个函数里，
 * 这些包装函数将被存入堆栈中，等到终于有对象来订阅此事件的时候，
 * 我们将遍历堆栈并且依次执行这些包装函数，也就是重新发布里面的事件。
 * 当然离线事件的生命周期只有一次，就像QQ的未读消息只会被重新阅读一次，
 * 所以刚才的操作我们只能进行一次。
 */

//8.11 全局事件的命名冲突-------------------------------------------------------------
//全局的发布—订阅对象里只有一个clientList来存放消息名和回调函数，
//大家都通过它来订阅和发布各种消息，久而久之，
//难免会出现事件名冲突的情况，所以我们还可以给Event对象提供创建
//命名空间的功能。在提供最终的代码之前，我们来感受一下怎么使用
//这两个新增的功能。
function e8() {
	const Event = (function () {
		var global = this;
		var Event:any;
		var _default = 'default';

		Event = (function () {
			var _listen: (key: string, fn: (...args: any) => any, cache: {}) => void;
			var _trigger: (key: string, ...args: any) => boolean | void;
			var _remove: (key: string, cache: {}, fn?: () => {}) => boolean | void;
			var _slice = Array.prototype.slice;
			var _shift = Array.prototype.shift;
			var _unshift = Array.prototype.unshift;
			var namespaceCache = {};
			var _create: any;
			var find: any;

			var each = function (ary, fn) {
				var ret;

				for (var i = 0; i < ary.length; i++) {
					var n = ary[i];

					ret = fn.call(n, i, n);
				}

				return ret;
			};

			_listen = function (key, fn, cache) {
				if (!cache[key]) {
					cache[key] = [];
				}

				cache[key].push(fn);
			};

			_remove = function (key, cache, fn) {
				if (cache[key]) {
					if (fn) {
						for (var i = cache[key].length; i >= 0; i--) {
							if (cache[key][i] === fn) {
								cache[key].splice(i, 1);
							}
						}
					} else {
						cache[key] = [];
					}
				}
			};

			_trigger = function (cache, key, ...args) {
				var _self = this;
				var ret;
				var stack = cache[key];

				if (!stack || !stack.length) {
					return;
				}

				return each(stack, function () {
					return this.apply(_self, [...args]);
				});
			};

			_create = function (namespace: string) {
				var namespace = namespace || _default;

				var cache = {};
				var offlineStack = [];
				var ret = {
					listen: function (key, fn, last) {
						_listen(key, fn, cache);

						if (offlineStack === null) {
							return;
						}

						if (last === 'last') {
							offlineStack.length && offlineStack.pop()();
						} else {
							each(offlineStack, function () {
								this();
							});
						}

						offlineStack = null;
					},
					one: function (key, fn, last) {
						_remove(key, cache);

						this.listen(key, fn, last);
					},
					remove: function (key, fn) {
						_remove(key, cache, fn);
					},
					trigger: function (...args) {
						var fn;
						var _self = this;
						var args = [cache, ...args];

						fn = function () {
							return _trigger.apply(_self, args);
						};

						if (offlineStack) {
							return offlineStack.push(fn);
						}

						return fn();
					},
				};

				return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : (namespaceCache[namespace] = ret)) : ret;
			};

			return {
				create: _create,
				one: function (key, fn, last) {
					var event = this.create();

					event.one(key, fn, last);
				},
				remove: function (key, fn) {
					var event = this.create();

					event.remove(key, fn);
				},
				listen: function (key, fn, last) {
					var event = this.create();

					event.listen(key, fn, last);
				},
				trigger: function (...args) {
					var event = this.create();

					event.trigger.apply(this, [...args]);
				},
			};
		})();

		return Event;
	})();

	function publishBeforeSubscribe() {
		//先发布后订阅
		Event.trigger('click', 1);
		Event.listen('click', function (a) {
			console.log(a);
		});
	}

	function useNamespace() {
		Event.create('namespace1').listen('click', function (a) {
			console.log(a);
		});

		Event.create('namespace1').trigger('click', 1);

		Event.create('namespace2').listen('click', function (a) {
			console.log(a);
		});

		Event.create('namespace2').trigger('click', 2);
	}

	publishBeforeSubscribe();

	useNamespace();

	console.log(Event);
}

// e8();

//8.12 JavaScript实现发布-订阅模式的便利性--------------------------------------
/** 这里要提出的是，我们一直讨论的发布—订阅模式，
 * 跟一些别的语言（比如Java）中的实现还是有区别的。
 * 在Java中实现一个自己的发布—订阅模式，通常会把订阅者对象
 * 自身当成引用传入发布者对象中，同时订阅者对象还需提供一个
 * 名为诸如update的方法，供发布者对象在适合的时候调用。而在JavaScript中，
 * 我们用注册回调函数的形式来代替传统的发布—订阅模式，
 * 显得更加优雅和简单。另外，在JavaScript中，我们无需去选择使用推
 * 模型还是拉模型。推模型是指在事件发生时，发布者一次性把所有
 * 更改的状态和数据都推送给订阅者。拉模型不同的地方是，发布者仅仅
 * 通知订阅者事件已经发生了，此外发布者要提供一些公开的接口供订阅者
 * 来主动拉取数据。拉模型的好处是可以让订阅者“按需获取”，但同时有可能
 * 让发布者变成一个“门户大开”的对象，同时增加了代码量和复杂度。刚好在
 * JavaScript中，arguments可以很方便地表示参数列表，
 * 所以我们一般都会选择推模型，使用Function.prototype.apply
 * 方法把所有参数都推送给订阅者。 */

//8.13 小结-------------------------------------------------------------------------------
/** 本章我们学习了发布—订阅模式，也就是常说的观察者模式。
 * 发布—订阅模式在实际开发中非常有用。
 *
 * 发布—订阅模式的优点非常明显，一为时间上的解耦，
 * 二为对象之间的解耦。它的应用非常广泛，既可以用在异步编程中，
 * 也可以帮助我们完成更松耦合的代码编写。发布—订阅模式还可以用来
 * 帮助实现一些别的设计模式，比如中介者模式。从架构上来看，
 * 无论是MVC还是MVVM，都少不了发布—订阅模式的参与，
 * 而且JavaScript本身也是一门基于事件驱动的语言。
 *
 * 当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗
 * 一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，
 * 但这个订阅者会始终存在于内存中。另外，发布—订阅模式虽然可以弱化
 * 对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将
 * 被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者
 * 和订阅者嵌套到一起的时候，要跟踪一个bug不是件轻松的事情。 */
