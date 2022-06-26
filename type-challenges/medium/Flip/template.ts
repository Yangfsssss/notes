export type Flip<T extends Record<any, unknown>> = {
  [K in keyof T as T[K] extends keyof any ? T[K] : `${T[K] & (boolean | bigint | null | undefined)}`]: K;
};

// export type Flip<T extends Record<any, any>> = {
//   [K in keyof T as `${T[K]}`]: K;
// };

//K:x|y|z|
//keyof T:a|b|c

//如果T[K] extends string| number| symbol，那么它可以作为合法的key
//反之，将其转换为它的字符串形式，然后作为合法的key

//判断是否能作为合法的key：extends keyof any
//将不合法的key转换为合法的字符串形式：`${K & (boolean | bigint | null | undefined)}`
//或者`${K}`

//思路：
//构建出新的key：[K in T[keyof T]] ===> [K in keyof T as T[K]]
//构建时需要考虑新的key是否合法，不合法的情况需要将其转换
//构建出新的类型：K

type test = {
  a: 'x';
  b: 'y';
  c: 'z';
};

type testFlip = keyof test extends 'a' | 'b' | 'c' ? 'a' | 'b' | 'c' : false;
type testFlip1 = test[keyof test] extends 'x' | 'y' | 'z' ? 'x' | 'y' | 'z' : false;
type testFlip2 = test['a' | 'b' | 'c'];
type testFlip3 = keyof any;
type testFlip4 = `${bigint & (boolean | bigint | null | undefined)}`;

//keyof T:a|b|c
//T[]
type result1 = Flip<{
  a: 'x';
  b: 'y';
  c: 'z';
}>; // {x: 'a', y: 'b', z: 'c'}
type result2 = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
type result3 = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}
