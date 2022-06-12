import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'b' | 'c' | 'd'>, Exclude<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>>,
  Expect<Equal<MyExclude<'a' | string | 'c', string | 'c' | 'd'>, Exclude<'a' | string | 'c', string | 'c' | 'd'>>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>
];
