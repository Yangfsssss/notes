// export type DeepReadonly<T> = {
//元组类型可分配至object，但它不需要继续递归。
//   readonly [P in keyof T]:T[P] extends object ? DeepReadonly<T[P]> : T[P];
// } 

type DeepReadonly<T> = {
  readonly [P in keyof T]:keyof T[P] extends never ?  T[P]:DeepReadonly<T[P]> 
} 

//T是一个对象类型
//遍历它的key
//key不是对象类型：readonly T[P]
//key是对象类型：DeepReadonly<T>
//keyof P extends never可以判断P是不是一个对象类型。
//T[p] extends object 不能判断T[P]是不是一个对象类型，T[P]也可能是一个元组类型。

type DeepReadonlyModal = { y: 'hey' };
type DeepReadonlyTest1 = DeepReadonly<DeepReadonlyModal>;
type DeepReadonlyTest2 = keyof DeepReadonlyModal;
type DeepReadonlyTest3 = DeepReadonlyTest2 extends object ? true : false;
type DeepReadonlyTest4 = DeepReadonly<X>;
type DeepReadonlyTest5 = X['x'] extends object ? true : false;
type DeepReadonlyTest6 = DeepReadonly<X['x']>
type DeepReadonlyTest7 = keyof X['y'] extends never ? true : false;
type DeepReadonlyTest8 = string[] extends object ? true : false;

type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type DeepReadonlyTodo = DeepReadonly<X>; // should be same as `Expected`
