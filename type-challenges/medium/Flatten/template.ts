type Flatten<T extends readonly unknown[]> = T extends [infer U, ...infer V]
  ? U extends unknown[]
    ? [...Flatten<U>, ...Flatten<V>]
    : [U, ...Flatten<V>]
  : [];

//思路：
//找出元组泛型里的元组类型，并将其递归展开。

//infer U，U一定存在一个对应的类型。

type testFlatten = [[1], [2]] extends [infer U, infer V] ? U : never;
type testFlatten1 = [[1], [2], [3]] extends [infer U, ...infer V] ? V : never;
type testFlatten2 = [] extends [infer U, ...infer V] ? U : never;
type testFlatten3 = [] extends unknown[] ? true : false;
type testFlatten4 = [] extends [infer U, ...infer V] ? true : false;
type testFlatten5 = [] extends [infer U] ? true : false;

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
