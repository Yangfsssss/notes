import type { Equal, Expect } from '@type-challenges/utils';
import { Fibonacci } from './template';

type cases = [Expect<Equal<Fibonacci<3>, 2>>, Expect<Equal<Fibonacci<8>, 21>>];
