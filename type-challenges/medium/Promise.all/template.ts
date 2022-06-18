type GetPromise<T> = T extends Promise<infer U> ? GetPromise<U> : T;

type GetPromises<T extends unknown[]> = T extends [infer U, ...infer W]
  ? W extends []
    ? [GetPromise<U>]
    : [GetPromise<U>, ...GetPromises<W>]
  : never;

declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<GetPromises<T>>;

//
//递归取出参数数组/元组中成员的类型，组成一个新的数组/元组类型。
//用Promise<T>包裹

//Promise.resolve<T> ==> Promise<T> ==> T

type testPromiseAll3 = readonly [1, 2, 3] extends readonly [infer U, ...infer W] ? U : never;
type testPromiseAll4 = readonly [1, 2, Promise<number>] extends readonly [infer U, ...infer W] ? W : never;
const testPromiseAll5 = PromiseAll([1, 2] as const); //类型“readonly [1, 2]”的参数不能赋给类型“[1, 2]”的参数。类型 "readonly [1, 2]" 为 "readonly"，不能分配给可变类型 "[1, 2]"。ts(2345)
type testPromiseAll6 = GetPromise<Promise<2>>;
type testPromiseAll7 = GetPromises<[1, 2, Promise<3>]>;
type testPromiseAll8 = [1] extends [infer U, ...infer W] ? W : never;
type testPromiseAll9 = [1] extends [infer U, ...infer W] ? U : never;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

//类型推断
const arr = [1, 2, 3];
const arr1: [number, number, number] = [1, 2, 3];
const arr2: readonly [number, number, number] = [1, 2, 3];
const arr3 = [1, 2, 3] as const;

//泛型/参数/返回值
//readonly 泛型/readonly 参数/readonly 返回值

// expected to be `Promise<[number, 42, string]>`
const PromiseAll_p = Promise.all([promise1, promise2, promise3] as const);

const testPromiseAll1 = PromiseAll([1, 2, 3]);
type testPromiseAll11 = typeof testPromiseAll1;

const testPromiseAll2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
type testPromiseAll22 = typeof testPromiseAll2;

function process1<T extends number>(arg: T): T {
  return arg;
}

const process1Result = process1(3);
