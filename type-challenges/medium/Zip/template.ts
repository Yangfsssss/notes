export type Zip<
  T extends readonly unknown[],
  K extends readonly unknown[],
  Count extends 1[] = []
> = T[Count['length']] extends undefined
  ? K[Count['length']] extends undefined
    ? []
    : []
  : K[Count['length']] extends undefined
  ? []
  : [[T[Count['length']], K[Count['length']]], ...Zip<T, K, [...Count, 1]>];

//简化版：
// type Zip<T extends readonly unknown[], K extends readonly unknown[]> = [T, K] extends [
//   [infer U, ...infer RestU],
//   [infer V, ...infer RestV]
// ]
//   ? [[U, V], ...Zip<RestU, RestV>]
//   : [];

type testZip = [1][0];
type testZip1 = [] extends [infer U] ? U : never;
type testZip2 = [[1], [2]] extends [[infer U, ...infer RestU], [infer V, ...infer RestV]] ? U : never;

//规则：
//从元组的左边开始对齐，直到其中一个元组的成员耗尽

type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]
