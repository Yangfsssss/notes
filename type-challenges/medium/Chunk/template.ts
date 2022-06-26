export type Chunk<T extends unknown[], N extends number, C extends unknown[] = []> = T extends [infer U, ...infer Rest]
  ? C['length'] extends N
    ? [C, ...Chunk<Rest, N, [U]>]
    : Chunk<Rest, N, [...C, U]>
  : C extends []
  ? []
  : [C];

type testChunk = [1, 2, 3] extends [infer U, [any, 1, 2, 3][2], ...infer Rest] ? U : false;
type testChunk1 = [1, 2, 3] extends [infer U, [any, 1, 2, 3][2], ...infer Rest] ? Rest : false;
type testChunk2 = [1, 2] extends [infer U, [any, 1, 2][1], ...infer Rest] ? U : false;
type testChunk3 = [1, 2] extends [infer U, [any, 1, 2][1], ...infer Rest] ? Rest : false;
type testChunk4 = [1, 2, 3, 4] extends [...[infer U], 2, ...infer Rest] ? U : false;
type testChunk5 = [1, 2, 3, 4] extends [infer U, [1, 2, 3, 4][2], ...infer Rest] ? Rest : false;
type testChunk6 = [3] extends [...[infer U], 2] ? U : false;
type testChunk7 = [1, 2, 3, 4, 5, 6, 7, 8, 9] extends [...infer U, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][2], ...infer Rest]
  ? U
  : false;
type testChunk8 = [[1, 2], ...[[1, 2]]];

//思路：
//声明一个空元组，反复将待处理元组的第一个元素置入，直到其长度等于指定长度，
//此时该元组即为处理好的子元组，处理结果，重新开始置入。
//重复过程，直到待处理元组的长度为空。

//规则：
//将元组切分为指定长度的子元组。如果指定长度大于元组长度，返回整个元组。

type exp1 = Chunk<[1, 2, 3], 2>; // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4>; // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1>; // expected to be [[1], [2], [3]]
type exp4 = Chunk<[1, 2, 3, 4], 1>; // expected to be [[1], [2], [3]]
type exp5 = Chunk<[1, 2, 3, 4], 2>; // expected to be [[1], [2], [3]]
type exp6 = Chunk<[], 1>; // expected to be [[1], [2], [3]]
type exp8 = Chunk<[1, 2, 3, 4], 5>; // expected to be [[1], [2], [3]]
type exp9 = Chunk<[1, 2, 3, 4, 5, 6, 7, 8, 9], 3>; // expected to be [[1], [2], [3]]
