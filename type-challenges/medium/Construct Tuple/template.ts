export type ConstructTuple<L extends number,R extends unknown[] = []> =
   Equal<R['length'],L> extends true
    ? R
    : ConstructTuple<L,[...R,unknown]>

type result = ConstructTuple<2> // expect to be [unknown, unkonwn]