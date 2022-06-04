/** Item52: 警惕测试类型时的陷阱，Be Aware of the Pitfalls of Testing Types */

// declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
//增加参数及this
declare function map<U, V>(array: U[], fn: (this: U[], u: U, i: number, array: U[]) => V): V[];

//场景一：测试参数与返回值：
//方法一：使用一个具有特定类型的变量
//缺点：增加不必要的代码、不得不禁用lint的某些部分。
const lengths: number[] = map(['john', 'paul'], (name) => name.length);

//变通方法：定义一个helper：
function assertType<T>(x: T) {}
assertType<number[]>(map(['john', 'paul'], (name) => name.length));

//场景二：测试相等：
//number和数字字面量
const n = 12;
assertType<number>(n); //OK

//对象:{name:string}与{name:string,inYellowSubmarine:boolean}
const beatles = ['john', 'paul', 'george', 'ringo'];
assertType<{ name: string }[]>(map(beatles, (name) => ({ name, inYellowSubmarine: name === 'ringo' }))); //OK

//函数：多参数函数
const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add); //OK

const _double = (x: number) => 2 * x;
assertType<(x: number, b: number) => number>(_double); //OK!?

//方法：拆开函数类型，使用Parameters和ReturnType
let _p: Parameters<typeof _double> = null!;
// assertType<[number, number]>(_p); //not OK
let r: ReturnType<typeof _double> = null!;
assertType<number>(r); //OK

//场景三：this：
assertType<number[]>(
  //not OK,需要增加map的参数
  map(beatles, function (name, i, array) {
    assertType<string>(name); //OK
    assertType<number>(i); //OK
    assertType<string[]>(array); //OK
    assertType<string[]>(this);

    return name.length;
  })
);

//场景四：隐藏any：
declare module 'overbar';

//测试类型声明是很棘手的事情。
///你应该测试它们，但要注意一些常见的技术陷阱，并考虑使用dtslint这样的工具来避免它们。

//Things to Remember
//在测试类型时，要注意相等和可分配的区别，特别是对于函数类型。
//对于使用回调的函数，要测试回调参数的推断类型。如果this是API的一部分，别忘了测试它的类型。
//在涉及类型的测试中要注意any。考虑使用dtslint这样的工具来进行更严格，更不容易出错的检查。
