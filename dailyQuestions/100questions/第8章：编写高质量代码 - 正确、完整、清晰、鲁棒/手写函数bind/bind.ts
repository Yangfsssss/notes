/**
 * @description 手写 bind
 * @author Yang
 */

//@ts-ignore
Function.prototype.customBind = function (context: any, ...bindArgs: any[]) {
  // context 是bind传入的 this
  // bindArgs 是 bind 传入的各个参数

  const self = this; // 当前的函数本身

  return function (...args: any[]) {
    // 拼接参数
    const newArgs = bindArgs.concat(args);

    return self.apply(context, newArgs);
  };
};

// 功能测试
// function fn(this: any, a: number, b: number, c: number) {
//   console.log(this, a, b, c);
// }

// @ts-ignore
// const fn1 = fn.customBind({ x: 100 }, 10);
// fn1(20, 30);
