/**
 * @description  实现 new
 * @author Yang
 */

import { getType } from '../手写一个getType函数，获取详细的数据类型/get-type';

// 泛型：动态类型
export function customNew<T>(constructor: Function, ...args: unknown[]): T {
  // 1，创建一个空对象，继承 constructor 的原型；
  const obj = Object.create(constructor.prototype);

  // 2，将 obj 作为 this，执行 constructor，传入参数；
  constructor.apply(obj, args);

  // 3，返回 obj；
  // if (getType(constructor(args)) === 'object') {
  //   return constructor(args);
  // }

  return obj;
}

export type foo = { name: string; city: string; n: number };

export function Foo(this: foo, name: string, n: number) {
  this.name = name;
  this.city = '上海';
  this.n = n;
}

Foo.prototype.getName = function () {
  return this.name;
};

// class Foo {
//   // 属性
//   name: string;
//   city: string;
//   n: number;

//   constructor(name: string, n: number) {
//     this.name = name;
//     this.city = '上海';
//     this.n = n;
//   }

//   getName() {
//     return this.name;
//   }
// }

// const f = new Foo('Yang', 100);
// console.log(f);
// console.log(f.getName());
