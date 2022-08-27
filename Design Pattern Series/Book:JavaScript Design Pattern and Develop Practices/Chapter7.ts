/** Chapter7：迭代器模式 */
/**
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，
 * 而又不需要暴露该对象的内部表示。
 * 迭代器模式可以把迭代的过程从业务逻辑中分离出来，
 * 在使用迭代器模式之后，即使不关心对象的内部构造，
 * 也可以按顺序访问其中的每个元素。
 *
 * 目前，恐怕只有在一些“古董级”的语言中才会为实现一个迭代器模式而烦恼，
 * 现在流行的大部分语言如Java、Ruby等都已经有了内置的迭代器实现，
 * 许多浏览器也支持JavaScript的Array.prototype.forEach。
 */

//7.1 jQuery中的迭代器-----------------------------------------------------------------------
//迭代器模式无非就是循环访问聚合对象中的各个元素。
//比如jQuery中的$.each函数，其中回调函数中的参数i为当前索引，
//n为当前元素，代码如下：
function so() {
	// $.each([1, 2, 3], function (i, n) {
	// 	console.log('当前下标为：' + i);
	// 	console.log('当前值为：' + n);
	// });
}

//7.2 实现自己的迭代器-----------------------------------------------------------------------
//现在我们来自己实现一个each函数，each函数接受2个参数，
//第一个为被循环的数组，第二个为循环中的每一步后将被触发的回调函数：
function st() {
	var each = function (ary: number[], callback: (i: number, n: number) => void) {
		for (var i = 0; i < ary.length; i++) {
			callback.call(ary[i], i, ary[i]);
		}
	};

	each([1, 2, 3], (i, n) => alert([i, n]));
}

// st();

//7.3 内部迭代器和外部迭代器------------------------------------------------------------------------
//迭代器可以分为内部迭代器和外部迭代器，它们有各自的适用场景。
//这一节我们将分别讨论这两种迭代器。
//1，内部迭代器
//我们刚刚编写的each函数属于内部迭代器，each函数的内部已经定义好了迭代规则，
//它完全接手整个迭代过程，外部只需要一次初始调用。内部迭代器在调用的时候非常方便，
//外界不用关心迭代器内部的实现，跟迭代器的交互也仅仅是一次初始调用，

//但这也刚好是内部迭代器的缺点。由于内部迭代器的迭代规则已经被提前规定，
//上面的each函数就无法同时迭代2个数组了。

//比如现在有个需求，
//要判断2个数组里元素的值是否完全相等，如果不改写each函数本身的代码，
//我们能够入手的地方似乎只剩下each的回调函数了，代码如下：
function st1() {
	var each = function (ary: number[], callback: (i: number, n: number) => void) {
		for (var i = 0; i < ary.length; i++) {
			callback.call(ary[i], i, ary[i]);
		}
	};

	var compare = function (ary1: number[], ary2: number[]) {
		if (ary1.length !== ary2.length) {
			throw new Error('ary1 is not equal to ary2');
		}

		each(ary1, (i, n) => {
			if (n !== ary2[i]) {
				throw new Error('ary1 is not equal to ary2');
			}
		});

		alert('ary1 is equal to ary2');
	};

	compare([1, 2, 3], [1, 2, 3]);
}

// st1();

//2，外部迭代器
//外部迭代器必须显式地请求迭代下一个元素。外部迭代器增加了一些调用的复杂度，
//但相对也增强了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序。
function st2() {
	var Iterator = function (obj: number[]) {
		var current = 0;

		var next = function () {
			current += 1;
		};

		var isDone = function () {
			return current >= obj.length;
		};

		var getCurrItem = function () {
			return obj[current];
		};

		return {
			next,
			isDone,
			getCurrItem,
			length: obj.length,
		};
	};

	var iterator1 = Iterator([1, 2, 3]);
	var iterator2 = Iterator([1, 2, 3]);

	interface IteratorInstance {
		next: () => void;
		isDone: () => boolean;
		getCurrItem: () => number;
		length: number;
	}

	var compare = function (iterator1: IteratorInstance, iterator2: IteratorInstance) {
		if (iterator1.length !== iterator2.length) {
			alert('not equal!');
		}

		while (!iterator1.isDone() && !iterator2.isDone()) {
			if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
				throw new Error('not equal!');
			}

			iterator1.next();
			iterator2.next();
		}

		alert('iterator1 is equal to iterator2');
	};

	compare(iterator1, iterator2);
}

// st2();
//外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。
//内部迭代器和外部迭代器在实际生产中没有优劣之分，
//究竟使用哪个要根据需求场景而定。

//7.4 迭代类数组对象和字面量对象
//迭代器模式不仅可以迭代数组，还可以迭代一些类数组的对象。
//比如arguments、{"0":'a', "1":'b'}等。通过上面的代码可以观察到，
//无论是内部迭代器还是外部迭代器，只要被迭代的聚合对象拥有length属性
//而且可以用下标访问，那它就可以被迭代。

//在JavaScript中，for in语句可以用来迭代普通字面量对象的属性。
//jQuery中提供了$.each`函数来封装各种迭代行为：
function st3() {
	// function each(obj:any,callback:any) {
	//   var value:boolean;
	//   var i = 0;
	//   var length = obj.length as number
	//   var isArray = Array.isArray(obj)
	//   if(!isArray){
	//   }
	// }
}

//7.5 倒序迭代器------------------------------------------------------------------
//由于GoF中对迭代器模式的定义非常松散，所以我们可以有多种多样的迭代器实现。
//总的来说，迭代器模式提供了循环访问一个聚合对象中每个元素的方法，
//但它没有规定我们以顺序、倒序还是中序来循环遍历聚合对象。
//下面我们分分钟实现一个倒序访问的迭代器：
function st4() {
	var reverseEach = function (ary: number[], callback: (i: number, n: number) => void) {
		for (var l = ary.length - 1; l >= 0; l--) {
			callback(l, ary[l]);
		}
	};

	reverseEach([0, 1, 2], function (i, n) {
		console.log(n);
	});
}

// st4();

//7.6 中止迭代器
//迭代器可以像普通for循环中的break一样，提供一种跳出循环的方法。
function ss() {
	var each = function (ary: number[], callback: (i: number, n: number) => boolean) {
		//callback的执行结果返回false，提前终止迭代
		for (var i = 0; i < ary.length; i++) {
			if (callback(i, ary[i]) === false) {
				break;
			}
		}
	};

	each([1, 2, 3, 4, 5], function (i, n) {
		if (n > 3) {
			return false;
		}

		console.log(n);
	});
}

// ss()

//7.7 迭代器模式的应用实例---------------------------------------------------------
//目前一共有3种可能的上传方式，我们不知道目前正在使用的浏览器支持哪几种。
//就好比我们有一个钥匙串，其中共有3把钥匙，
//我们想打开一扇门但是不知道该使用哪把钥匙，于是从第一把钥匙开始，
//迭代钥匙串进行尝试，直到找到了正确的钥匙为止。
//同样，我们把每种获取upload对象的方法都封装在各自的函数里，
//然后使用一个迭代器，迭代获取这些upload对象，直到获取到一个可用的为止

//所以我们的迭代器只需进行下面这几步工作。
//❏ 提供一个可以被迭代的方法，使得getActiveUploadObj,
//getFlashUploadObj以及getFlashUploadObj依照优先级被循环迭代。
//❏ 如果正在被迭代的函数返回一个对象，则表示找到了正确的upload对象，
//反之如果该函数返回false，则让迭代器继续工作。

//7.8 小结-----------------------------------------------------------------------------------
//迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。
//目前的绝大部分语言都内置了迭代器。