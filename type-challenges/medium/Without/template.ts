export type Without<T extends number[], U extends number | number[], C extends 1[] = []> = U extends number
  ? U extends T[C['length']]
    ? [Without<T, U, [...C, 1]>]
    : [T[C['length']], Without<T, U, [...C, 1]>]
  : U extends number[]
  ? U[number] extends T[C['length']]
    ? [...Without<T, U, [...C, 1]>]
    : [T[C['length']], ...Without<T, U, [...C]>]
  : T;

//思路：
//取U的联合类型 extends T[0]

type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
