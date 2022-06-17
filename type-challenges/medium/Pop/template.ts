type Pop<T extends any[]> = T extends [...infer Front, infer Last] ? Front : never;

// type Pop<T extends any[]> = T extends [infer First, ...infer Back]
//   ? Back['length'] extends 0
//     ? []
//     : Back['length'] extends 1
//     ? [First]
//     : [First, ...Pop<Back>]
//   : never;

// type Pop<T extends any[]> =  [any,...T][T['length']]  extends [infer Fake, ...infer Ori,infer Last]
//   ? 

//
//1，infer推断出最后一个成员
//2，递归
//3，

type PopArr1 = ['a', 'b', 'c', 'd'];
//['a', Pop<'b','c','d'>]
//['a','b', Pop<'c','d'>]
//['a','b', 'c',]
type PopArr2 = [3, 2, 1];

type re1 = Pop<PopArr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<PopArr2>; // expected to be [3, 2]

// Array.prototype.pop;

type testPop1 = ['a', 'b', 'c', 'd'] extends [infer First, ...infer Back] ? Back : never;
type testPop2 = Pop<['d']>;
