// type RemoveElementByIndex<T extends unknown[], I extends number, C extends unknown[] = []> = T extends [
//   infer U,
//   ...infer V
// ]
//   ? C['length'] extends I
//     ? [...C, ...V]
//     : RemoveElementByIndex<V, I, [...C, U]>
//   : T;

type RemoveCertainElement<T extends unknown[], K> = T extends [infer U, ...infer Rest]
  ? Equal<U, K> extends true
    ? RemoveCertainElement<Rest, K>
    : [U, ...RemoveCertainElement<Rest, K>]
  : T;

// type testRemoveElement = RemoveElement<[1, 1, 2, 2, 3, 3], 3>; // expected to be [1,1, 2, 3,3]
// type testFindAndRemoveElement = RemoveCertainElement<[1, 1, 2, 2, 3, 3], 1>; // expected to be [1,1, 2,2]

export type Unique<T extends unknown[], C extends 1[] = [], L extends number = T['length']> = [C['length'], 1] extends L
  ? T
  : T extends [infer U, ...infer Rest]
  ? [U, ...Unique<RemoveCertainElement<Rest, U>, [...C, 1]>]
  : T;



// type Includes<T extends unknown[], K extends unknown> = T extends [infer U, ...infer Rest]
//   ? Equal<U, K> extends true
//     ? true
//     : Includes<Rest, K>
//   : false;

//
// export type Unique<T extends unknown[], C extends unknown[] = []> = T extends [infer U, ...infer Rest]
//   ? Includes<C, U> extends true
//     ? Unique<Rest, C>
//     : Unique<Rest, [...C, U]>
//   : C;

type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, 'a', 2, 'b', 2, 'a']>; // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]

function unique<T extends unknown[]>(arg: T, i: number = 0, j: number = 1): unknown[] {
  let first = arg[i];

  while (j < arg.length) {
    if (first === arg[j]) {
      arg.splice(j, 1);
    }

    j++;
  }

  i++;
  if (i < arg.length) {
    unique(arg, i, i + 1);
  }

  return arg;
}
