/** 04，export default function(){}：你无法导出一个匿名函数表达式 */

//本质上 export 也就只能导出这六种声明语法所声明的标识符，并且在导出时将它们统一称为“名字”。

//所有导出：
// 导出“（声明的）名字”
//export <let/const/var> x ...;
//export function x() ...
//export class x ...
//export {x, y, z, ...};

// 导出“（重命名的）名字”
//export { x as y, ...};
//export { x as default, ... };

// 导出“（其它模块的）名字”
//export ... from ...;

// 导出“值”
//export default <expression>

//函数声明，静态分析期就能获得名字
function func() {}

//函数表达式，静态分析期就能获得名字
const a = function () {};
const b = function b() {};

//匿名函数表达式，没有名字
1 + function () {};

//强制匿名函数表达式，没有名字
//分组表达式""()"会将function f强制作为表达式而不是函数声明来做语法解析。
(function func() {});

//函数定义，在匿名函数表达式上封装了一层概念，使其能够获得一个外层的名字
//即非匿名函数表达式

//1,函数声明有名字，正常导出
export function namedFunc() {}

//2,非匿名函数表达式，即函数定义，有名字，正常导出
export const c = function () {};

//2,匿名函数表达式，没有名字，使用函数定义这个概念封装一层，使其获得名字
export default function () {};

export function func() {};
export default function func() {};


