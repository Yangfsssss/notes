export type IndexOf<T extends unknown[], U extends number, C extends 1[] = []> = T extends [infer Q, ...infer W]
  ? Equal<Q, U> extends true
    ? C['length']
    : IndexOf<W, U, [...C, 1]>
  : -1;

//思路：
//infer分离对比，C记录索引位置。

type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>; // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
type Res3 = IndexOf<[string, 1, number, 'a'], number>; // expected to be 2
type Res4 = IndexOf<[string, 1, number, 'a', any], any>; // expected to be 4
