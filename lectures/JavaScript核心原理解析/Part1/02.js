/** 02,var x = y = 100，声明语句和语法改变了JavaScript语言核心性质*/
//严格意义上讲，JavaScript 只有变量和常量两种标识符，
//六条声明语句中：

//let x …声明变量 x。不可在赋值之前读。
//const x …声明常量 x。不可写。
//var x …声明变量 x。在赋值之前可读取到 undefined 值。
//function x …声明变量 x。该变量指向一个函数。
//class x …声明变量 x。该变量指向一个类（该类的作用域内部是处理严格模式的）。
//import …导入标识符并作为常量（可以有多种声明标识符的模式和方法）。

//除了这六个语句之外，还有两个语句有潜在的声明标识符的能力，不过它们并不是严格意义上的声明语句（声明只是它们的语法效果）。
//这两个语句是指：
//for (var|let|const x …) …for 语句有多种语法来声明一个或多个标识符，用作循环变量。
//try … catch (x) …catch 子句可以声明一个或多个标识符，用作异常对象变量。

//所有的“声明”：
//都意味着 JavaScript 将可以通过“静态”语法分析发现那些声明的标识符；
//标识符对应的变量 / 常量“一定”会在用户代码执行前就已经被创建在作用域中。

//ECMAScript 6 之前：JavaScript 是允许访问还没有绑定值的var所声明的标识符的。
//这种标识符后来统一约定称为“变量声明（varDelcs）”，而“let/const”则称为“词法声明（lexicalDecls）”。
//JavaScript 环境在创建一个“变量名（varName in varDecls）”后，会为它初始化绑定一个 undefined 值，
//而”词法名字（lexicalNames）”在创建之后就没有这项待遇，所以它们在缺省情况下就是“还没有绑定值”的标识符。

//在 ECMAScript 6 之后出现的let/const变量在“声明（和创建）一个标识符”这件事上，与var并没有什么不同，
//只是 JavaScript 拒绝访问还没有绑定值的let/const标识符而已。

//6 种声明语句中：
//函数是按 varDecls 的规则声明的；
//类的内部是处于严格模式中，它的名字是按 let 来处理的，
//而 import 导入的名字则是按 const 的规则来处理的。
//所以，所有的声明本质上只有三种处理模式：var 变量声明、let 变量声明和 const 常量声明。

//在 JavaScript 中，一个赋值表达式的左边和右边其实“都是”表达式！

//var 等声明语句总是在变量作用域（变量表）或词法作用域中静态地声明一个或多个标识符。
//全局变量的管理方式决定了“向一个不存在的变量赋值”所导致的变量泄漏是不可避免的。
//动态添加的“var 声明”是可以删除的，这是唯一能操作 varNames 列表的方式（不过它并不存在多少实用意义）。
//变量声明在引擎的处理上被分成两个部分：一部分是静态的、基于标识符的词法分析和管理，它总是在相应上下文的环境构建时作为名字创建的；另一部分是表达式执行过程，是对上述名字的赋值，这个过程也称为绑定。
//这一讲标题里的这行代码中，x 和 y 是两个不同的东西，前者是声明的名字，后者是一个赋值过程可能创建的变量名。

//(function f(){})()：分组表达式""()"会将function f强制作为表达式而不是函数声明来做语法解析。

function zt() {
  var x = y = 100;
  console.log(x);
  console.log(y);
}

// zt()

function zt1() {
  var a = 100;
  x = 200;

  console.log(Object.getOwnPropertyDescriptor(window, 'a'));
  console.log(Object.getOwnPropertyDescriptor(window, 'x'));

  console.log(delete a);
  console.log(delete x);

  console.log(a);
  console.log(x);
}

//特例：唯一一种
// eval('var b = 300');
// console.log(Object.getOwnPropertyDescriptor(window, 'b').configurable);
// console.log(delete b);
// console.log(b);

// zt1()

//赋值表达式本身是有结果的，它是右操作数的值，注意：是“值”而非“引用”

// function zt2() {
// obj = { f: function() { return this === obj } }

// (a = obj.f)()
// }

// zt2()

//变量提升
function zt3() {
  var x = 100;
  console.log(x, z, zz);
  console.log(y);
  if (true) {
      let y = 200;
      var z = 300;

      function zz() {}
  }
}

// zt3()

// n = 100;

// console.log(window.n);

// let n = 200;

// console.log(n);