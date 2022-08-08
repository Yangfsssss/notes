/** Item19: 避免你的代码被可推断类型弄得混乱不堪*/
//需要明确的类型标注：
//函数参数；
//指定字面量类型以触发额外属性检查；
//指定函数的返回类型以防止出现在函数实现中的错误；
//需要使用一个具名类型使其更加直观；

//先写出完整的类型签名有助于得到想要的函数（TDD）。

//eslint-inferrable-types;

//使用更宽的类型声明可以覆盖掉推断出来的窄的类型。
export const x = '3'; //x:'3'
const y: string = '3'; //y:string

//Things to Remember
//• Avoid writing type annotations when TypeScript can infer the same type.
//• Ideally your code has type annotations in function/method signatures but not on local variables in their bodies.
//• Consider using explicit annotations for object literals and function return types
//even when they can be inferred. This will help prevent implementation errors from surfacing in user code.
