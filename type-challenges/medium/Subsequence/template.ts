// type Unite<T extends unknown[], R extends unknown[]> = R extends [infer U, ...infer Rest]
//   ? [...T, U] | Unite<T, Rest>
//   : T;

// type testUnite = Unite<[1], [2, 3, 4]>;
// type testUnite1 = Unite<[2], []>;

// export type Subsequence<T extends any[]> = T extends [infer U, ...infer Rest]
//   ? T | Unite<[U], Rest> | Subsequence<Rest>
//   : [];

export type Subsequence<T extends any[]> = T extends [infer U, ...infer Rest]
  ? [U,...Subsequence<Rest>]| Subsequence<Rest>
  : T

//扩展/收集运算符可以作用于数组/元组的联合类型，按联合类型的运算规则得到结果。
//联合类型的运算结果一定是另一个联合类型。

type testSubsequence = Subsequence<[2]>| [1,2];
type testSubsequence1 = [2,...([3]|[])]

type A = Subsequence<[1, 2]>; // [] | [1] | [2] | [1, 2]
type B = Subsequence<[1, 2, 3]>; // [] | [1] | [2] | [1, 2]
type C = Subsequence<[2, 3]>; // [] | [1] | [2] | [1, 2]
