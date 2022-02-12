/** 03,a.x = a = {n:2}：一道被无数人无数次地解释过的经典面试题 */

//在 JavaScript 中，一个赋值表达式的左边和右边其实“都是”表达式！
//一切都是表达式，一切都是运算。
//JavaScript 总是严格按照从左至右的顺序来计算表达式。

function test() {
  var c = {};
  c.a = c = [];
  console.log(c.a);
}

test()

//复习题
//1，试解析with ({x:100}) delete x; 将发生什么


function reviewQuestion1() {
  with({ x: 100 })
  var result = delete x
  console.log(result);
}

//没有操作，返回true
// reviewQuestion1()

//2，试说明(eval)()与(0, eval)()的不同
function reviewQuestion2() {
  console.log((eval));
  console.log((0, eval));
}

// reviewQuestion2()

//3，设“a.x === 0”，试说明“(a.x) = 1”为什么可行。
function reviewQuestion3() {
  var a = {}

  a.x === 0;

  // (a.x) = 1;

  console.log(a);
}

// reviewQuestion3()

//4，为什么with (obj={}) x = 100; 不会给 obj 添加一个属性’x’？
function reviewQuestion4() {
  with(obj = {})
  x = 100
  console.log(obj);
}

// reviewQuestion4()