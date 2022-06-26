import { GreaterThan } from '../Greater Than/template';

type GetTupleOfGivenLength<T extends number, C extends 1[] = []> = C['length'] extends T
  ? C
  : GetTupleOfGivenLength<T, [...C, 1]>;

type FullFill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  C extends unknown[] = []
> = T extends [infer U, ...infer V]
  ? [...C, ...GetTupleOfGivenLength<Start>]['length'] extends End
    ? T
    : [N, ...FullFill<V, N, Start, End, [...C, U]>]
  : [];

export type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  C extends unknown[] = []
> = GreaterThan<Start, End> extends true
  ? T
  : T extends [infer U, ...infer V]
  ? C['length'] extends Start
    ? [...C, ...FullFill<T, N, Start, End>]
    : Fill<V, N, Start, End, [...C, U]>
  : T;

//[1,2,3,4],0,1,2 ==> [1,0,3,4]
//N = 0, Start = 1, End = 2
// export type Fill<
//   T extends unknown[],
//   N,
//   Start extends number = 0,
//   End extends number = T['length'],
//   C extends unknown[] = [],
//   B extends unknown[] = []
// > = GreaterThan<Start, End> extends true
//   ? T
//   : T extends [infer U, ...infer V]
//   ? [...B, ...GetTupleOfGivenLength<Start>]['length'] extends End
//     ? T
//     : C['length'] extends Start
//     ? [...C, N, ...Fill<V, N, Start, T['length'], [...C, U],[...B,U]>]
//     : Fill<V, N, Start, T['length'], [...C, U]>
//   : [];

//逻辑：
//如果Start > End，则返回原数组
//如果处理过的元组加上起始长度大于结束长度，则返回现元组
//如果处理过的元组等于起始长度，

type testStartFill = [...[1], ...FullFill<[2, 3, 4], 0>]; // expected to be [0, 0, 0]

//思路：
//先实现全量替换
//然后实现指定起始位置的替换
//思路：
//重复将待处理元组的第一个元素置入一个空元组
//当该元组的长度等于传入的起始位置时，全量替换待处理元组的剩余部分
//最后实现指定起始位置和结束位置的替换
//思路：
//改造全量替换，将处理过的元组置入一个空元组，当该数组的长度加上起始位置等于结束位置时停止处理。

type exp = Fill<[1, 2, 3, 4], 0>; // expected to be [0, 0, 0]
type exp1 = Fill<[1, 2, 3, 4], 0, 1>; // expected to be [1, 0, 0,0]
type exp2 = Fill<[2, 3, 4], 0, 1, 1>; // expected to be [0, 0, 0]
type exp3 = Fill<[1, 2, 3, 4], 0, 1, 2>; // expected to be [1, 0, 3,4]
