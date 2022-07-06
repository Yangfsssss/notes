type NumberToTuple<N extends number, R extends 1[] = []> = R['length'] extends N ? R : NumberToTuple<N, [...R, 1]>;

export type NumberRange<
  H extends number,
  T extends number,
  C extends 1[] = [...NumberToTuple<H>],
  R extends 1[][] = []
> = Equal<[...NumberToTuple<H>, ...R]['length'], T> extends true
  ? H | R[number]['length']
  : NumberRange<H, T, [...C, 1], [...R, [...C, 1]]>;

//思路：
//构造出[[1], [1, 1], [1, 1, 1],...]的形式，取T[number]['length']。

type result = NumberRange<2, 9>; //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type result1 = NumberRange<0, 2>; //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type result2 = NumberRange<0, 140>; //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type testNumberRange = [[1], [1, 1], [1, 1, 1]][number]['length'];
type testNumberRange1 = NumberToTuple<5>;
type testNumberRange2 = [[0], [1], [1, 1], [1, 1, 1]][number]['length'];
