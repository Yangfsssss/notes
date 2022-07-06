export type LastIndexOf<T extends readonly unknown[], U> = T extends [...infer Q, infer Tail]
  ? Equal<U, Tail> extends true
    ? Q['length']
    : LastIndexOf<Q, U>
  : -1;

//infer [...infer U,Tail]

type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2>; // 3
type Res2 = LastIndexOf<[0, 0, 0], 2>; // -1
