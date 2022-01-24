/** Chapter9：命令模式 */
/** 假设有一个快餐店，而我是该餐厅的点餐服务员，
 * 那么我一天的工作应该是这样的：当某位客人点餐或者打来订餐电话后，
 * 我会把他的需求都写在清单上，然后交给厨房，
 * 客人不用关心是哪些厨师帮他炒菜。我们餐厅还可以满足客人需要
 * 的定时服务，比如客人可能当前正在回家的路上，
 * 要求1个小时后才开始炒他的菜，只要订单还在，厨师就不会忘记。
 * 客人也可以很方便地打电话来撤销订单。另外如果有太多的客人点餐，
 * 厨房可以按照订单的顺序排队炒菜。这些记录着订餐信息的清单，
 * 便是命令模式中的命令对象。*/

//9.1 命令模式的用途
/* 命令模式是最简单和优雅的模式之一，命令模式中的命令（command）
 * 指的是一个执行某些特定事情的指令。
 *
 * 命令模式最常见的应用场景是：
 * 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，
 * 也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，
 * 使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
 *
 * 拿订餐来说，客人需要向厨师发送请求，但是完全不知道这些厨师的名字
 * 和联系方式，也不知道厨师炒菜的方式和步骤。命令模式把客人订餐的
 * 请求封装成command对象，也就是订餐中的订单对象。这个对象可以在
 * 程序中被四处传递，就像订单可以从服务员手中传到厨师的手中。这样一来，
 * 客人不需要知道厨师的名字，从而解开了请求调用者和请求接收者之间的
 * 耦合关系。
 *
 * 另外，相对于过程化的请求调用，command对象拥有更长的生命周期。
 * 对象的生命周期是跟初始请求无关的，因为这个请求已经被封装在了
 * command对象的方法中，成为了这个对象的行为。
 * 我们可以在程序运行的任意时刻去调用这个方法，
 * 就像厨师可以在客人预定1个小时之后才帮他炒菜，
 * 相当于程序在1个小时之后才开始执行command对象的方法。
 *
 * 除了这两点之外，命令模式还支持撤销、排队等操作，本章稍后将会详细讲解。*/

//9.2 命令模式的例子---菜单程序
function n0() {
	//UI
	const button1 = document.createElement('button');
	const button2 = document.createElement('button');
	const button3 = document.createElement('button');

	document.body.appendChild(button1);
	document.body.appendChild(button2);
	document.body.appendChild(button3);

	interface Command {
		execute: () => void;
	}

	//命令对象
	var setCommand = function (button: HTMLButtonElement, command: Command) {
		button.onclick = function () {
			command.execute();
		};
	};

	//功能对象
	var MenuBar = {
		refresh: function () {
			console.log('refresh menu bar');
		},
	};

	var SubMenu = {
		add: function () {
			console.log('add subMenu');
		},
		del: function () {
			console.log('delete subMenu');
		},
	};

	//命令类
	var RefreshMenuBarCommand = function (receiver) {
		this.receiver = receiver;
	};

	RefreshMenuBarCommand.prototype.execute = function () {
		this.receiver.refresh();
	};

	var AddSubMenuCommand = function (receiver) {
		this.receiver = receiver;
	};

	AddSubMenuCommand.prototype.execute = function () {
		this.receiver.add();
	};

	var DelSubMenuCommand = function (receiver) {
		this.receiver = receiver;
	};

	DelSubMenuCommand.prototype.execute = function () {
		console.log('delete subMenu');
	};

	//把命令接收者传入到command对象中，并且把command对象
	//安装到button上面：
	var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
	var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
	var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

	setCommand(button1, refreshMenuBarCommand);
	setCommand(button2, addSubMenuCommand);
	setCommand(button3, delSubMenuCommand);
}

// n0();

//9.3 JavaScript中的命令模式---------------------------------------------------------
//也许我们会感到很奇怪，所谓的命令模式，看起来就是给对象的某个方法
//取了execute的名字。引入command对象和receiver这两个无中生有的角色
//无非是把简单的事情复杂化了，即使不用什么模式，用下面寥寥几行代码
//就可以实现相同的功能：
function n1() {
	//UI
	const button1 = document.createElement('button');
	const button2 = document.createElement('button');
	const button3 = document.createElement('button');

	document.body.appendChild(button1);
	document.body.appendChild(button2);
	document.body.appendChild(button3);

  //绑定函数
	var bindClick = function (button, func) {
		button.onclick = func;
	};

  //功能对象
	var MenuBar = {
		refresh: function () {
			console.log('refresh MenuBar');
		},
	};

	var SubMenu = {
		add: function () {
			console.log('add subMenu');
		},
		del: function () {
			console.log('delete subMenu');
		},
	};

  //使用绑定函数将功能对象上的功能（方法）绑定到UI（按钮）上
	bindClick(button1, MenuBar.refresh);
	bindClick(button2, SubMenu.add);
	bindClick(button3, SubMenu.del);
}

// n1();

//这种说法是正确的，9.2节中的示例代码是模拟传统面向对象语言的命令
//模式实现。命令模式将过程式的请求调用封装在command对象的execute方法
//里，通过封装方法调用，我们可以把运算块包装成形。command对象可以
//被四处传递，所以在调用命令的时候，客户（Client）不需要关心事情是如何
//进行的。

//命令模式的由来，其实是回调（callback）函数的一个面向对象的替代品。

//JavaScript作为将函数作为一等对象的语言，跟策略模式一样，
//命令模式也早已融入到了JavaScript语言之中。运算块
//不一定要封装在command.execute方法中，也可以封装在普通函数中。
//函数作为一等对象，本身就可以被四处传递。即使我们依然需要请求“接收者”，
//那也未必使用面向对象的方式，闭包可以完成同样的功能。

//在面向对象设计中，命令模式的接收者被当成command对象的属性保存起来，
//同时约定执行命令的操作调用command.execute方法。
//在使用闭包的命令模式实现中，接收者被封闭在闭包产生的环境中，
//执行命令的操作可以更加简单，仅仅执行回调函数即可。
//无论接收者被保存为对象的属性，还是被封闭在闭包产生的环境中，
//在将来执行命令的时候，接收者都能被顺利访问。用闭包实现的命令
//模式如下代码所示：
function n2() {
	//UI
	const button1 = document.createElement('button');
	document.body.appendChild(button1);

  //绑定函数
	var setCommand = function (button, func) {
		button.onclick = function () {
			func();
		};
	};

  //功能对象
	var MenuBar = {
		refresh: function () {
			console.log('refresh MenuBar');
		},
	};

	var RefreshMenuBarCommand = function (receiver) {
		//闭包
		return function () {
			receiver.refresh();
		};
	};

	var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);

	setCommand(button1, refreshMenuBarCommand);
}

// n2();
//当然，如果想更明确地表达当前正在使用命令模式，
//或者除了执行命令之外，将来有可能还要提供撤销命令等操作。
//那我们最好还是把执行函数改为调用execute方法：
function n3() {
	//UI
	const button1 = document.createElement('button');
	document.body.appendChild(button1);

	var MenuBar = {
		refresh: function () {
			console.log('refresh MenuBar');
		},
	};

	var RefreshMenuBarCommand = function (receiver) {
		return {
			execute: function () {
				receiver.refresh();
			},
		};
	};

	var setCommand = function (button, command) {
		button.onclick = function () {
			command.execute();
		};
	};

	var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);

	setCommand(button1, refreshMenuBarCommand);
}

// n3();

//9.3 撤销命令--------------------------------------------------------------------------
//命令模式的作用不仅是封装运算块，而且可以很方便地给命令
//对象增加撤销操作。就像订餐时客人可以通过电话来取消订单一样。
//下面来看撤销命令的例子。本节的目标是利用5.4节中的Animate类来编写
//一个动画，这个动画的表现是让页面上的小球移动到水平方向的某个位置。
//现在页面中有一个input文本框和一个button按钮，文本框中可以输入一些数字，
//表示小球移动后的水平位置，小球在用户点击按钮后立刻开始移动，
//代码如下：
function n4() {
	const ball = document.createElement('div');
	ball.style.position = 'absolute';
	ball.style.background = '#000';
	ball.style.width = '50px';
	ball.style.height = '50px';

	const span = document.createElement('span');
	span.innerHTML = '输入小球移动后的位置：';

	const pos = document.createElement('input');

	const moveButton = document.createElement('button');
	moveButton.innerHTML = '开始移动';

	const cancelButton = document.createElement('button');
	cancelButton.innerHTML = 'cancel';

	document.body.appendChild(ball);
	document.body.appendChild(span);
	document.body.appendChild(pos);
	document.body.appendChild(moveButton);
	document.body.appendChild(cancelButton);

	// document.body.removeChild(div);

	const Animate = fft();

	// moveButton.onclick = function () {
	// var animate = new Animate(ball);

	// animate.start('left', pos.value, 1000, 'strongEaseOut');
	// };

	//如果文本框输入200，然后点击moveBtn按钮，
	//可以看到小球顺利地移动到水平方向200px的位置。
	//现在我们需要一个方法让小球还原到开始移动之前的位置。
	//当然也可以在文本框中再次输入-200，并且点击moveBtn按钮，
	//这也是一个办法，不过显得很笨拙。页面上最好有一个撤销按钮，
	//点击撤销按钮之后，小球便能回到上一次的位置。在给页面中
	//增加撤销按钮之前，先把目前的代码改为用命令模式实现：

	var MoveCommand = function (receiver, pos) {
		this.receiver = receiver;
		this.pos = pos;
		//撤销命令
		this.oldPos = null;
	};

	MoveCommand.prototype.execute = function () {
		this.receiver.start('left', this.pos, 1000, 'strongEaseOut');

		//撤销命令
		this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
	};

	MoveCommand.prototype.undo = function () {
		this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
	};

	var moveCommand;

	moveButton.onclick = function () {
		var animate = new Animate(ball);

		moveCommand = new MoveCommand(animate, pos.value);
		moveCommand.execute();
	};

	cancelButton.onclick = function () {
		moveCommand.undo();
	};

	//撤销操作的实现一般是给命令对象增加一个名为unexecude
	//或者undo的方法，在该方法里执行execute的反向操作。
	//在command.execute方法让小球开始真正运动之前，
	//我们需要先记录小球的当前位置，在unexecude或者undo操作中，
	//再让小球回到刚刚记录下的位置。
}

// n4();
//现在通过命令模式轻松地实现了撤销功能。如果用普通的方法调用来实现，
//也许需要每次都手工记录小球的运动轨迹，才能让它还原到之前的位置。
//而命令模式中小球的原始位置在小球开始移动前已经作为command对象
//的属性被保存起来，所以只需要再提供一个undo方法，
//并且在undo方法中让小球回到刚刚记录的原始位置就可以了。
//撤销是命令模式里一个非常有用的功能，试想一下开发一个围棋程序的时候，
//我们把每一步棋子的变化都封装成命令，则可以轻而易举地实现悔棋功能。
//同样，撤销命令还可以用于实现文本编辑器的Ctrl+Z功能。

//9.5 撤销和重做-------------------------------------------------------------------------
//当连续undo无法做到时，可以清除所有动作再依次重新执行
function n5() {
	const replayButton = document.createElement('button');
	replayButton.innerHTML = 'replay';

	document.body.appendChild(replayButton);

	var Ryu = {
		attack: function () {
			console.log('attack');
		},
		defense: function () {
			console.log('defense');
		},
		jump: function () {
			console.log('jump');
		},
		crouch: function () {
			console.log('crouch');
		},
	};

	var makeCommand = function (receiver, state) {
		//创建命令
		return function () {
			receiver[state]();
		};
	};

	var commands = {
		'119': 'jump', //W
		'115': 'crouch', //S
		'97': 'defense', //A
		'100': 'attack', //D
	};

	//保存命令的堆栈
	var commandStack = [];

	document.onkeypress = function (ev) {
		var keyCode = ev.keyCode;
		var command = makeCommand(Ryu, commands[keyCode]);

		if (command) {
			command();
			//将刚刚执行过的命令保存进堆栈
			commandStack.push(command);
		}
	};

	replayButton.onclick = function () {
		//点击播放录像
		var command;

		while ((command = commandStack.shift())) {
			//从堆栈里依次取出命令来执行
			command();
		}
	};
}

// n5();

//9.6 命令队列-----------------------------------------------------------------------

//9.7 宏命令--------------------------------------------------------------------------
function n6() {
	//宏命令是一组命令的集合，通过执行宏命令的方式，
	//可以一次执行一批命令。想象一下，家里有一个万能遥控器，
	//每天回家的时候，只要按一个特别的按钮，它就会帮我们关上房间门，
	//顺便打开电脑并登录QQ。

	//下面我们看看如何逐步创建一个宏命令。
	//首先，我们依然要创建好各种Command：
	var closeDoorCommand = {
		execute: function () {
			console.log('关门');
		},
	};

	var openPcCommand = {
		execute: function () {
			console.log('开电脑');
		},
	};

	var openQQCommand = {
		execute: function () {
			console.log('登录QQ');
		},
	};

	//接下来定义宏命令MacroCommand，它的结构也很简单。
	//macroCommand.add方法表示把子命令添加进宏命令对象，
	//当调用宏命令对象的execute方法时，会迭代这一组子命令对象，
	//并且依次执行它们的execute方法：

	var MacroCommand = function () {
		return {
			commandList: [],
			add: function (command) {
				this.commandList.push(command);
			},
			execute: function () {
				for (var i = 0, command; (command = this.commandList[i]); i++) {
					command.execute();
				}
			},
		};
	};

	var macroCommand = MacroCommand();

	macroCommand.add(closeDoorCommand);
	macroCommand.add(openPcCommand);
	macroCommand.add(openQQCommand);

	macroCommand.execute();
}

// n6();
//当然我们还可以为宏命令添加撤销功能，跟macroCommand.execute类似，
//当调用macroCommand.undo方法时，宏命令里包含的所有
//子命令对象要依次执行各自的undo操作。

//宏命令是命令模式与组合模式的联用产物，关于组合模式的知识，
//我们将在第10章详细介绍。

//9.8 智能命令与傻瓜命令---------------------------------------------------------

//9.9 小结
//本章我们学习了命令模式。跟许多其他语言不同，
//JavaScript可以用高阶函数非常方便地实现命令模式。
//命令模式在JavaScript语言中是一种隐形的模式。
