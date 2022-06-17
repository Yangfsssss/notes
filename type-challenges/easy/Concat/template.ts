// type Concat<T extends readonly any[], U extends any[]> = T extends [...infer Q]
//   ? U extends [...infer W]
//     ? [...Q, ...W]
//     : never
//   : never;

type Concat<T extends readonly unknown[], U extends unknown[]> = [...T, ...U];

//ts也支持拓展操作符（spread operator）。

type Result = Concat<[1], [2]>; // expected to be [1, 2]
type Result1 = Concat<[1, 2], [3, 4]>; // expected to be [1, 2]

//homework：
//infer spread
//first --> [1, 2, 3] --> 1
//tail --> [1, 2, 3] --> 3
