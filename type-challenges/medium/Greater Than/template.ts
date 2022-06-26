type Transform<T extends number, Count extends unknown[] = []> = Count['length'] extends T
  ? Count[number]
  : Transform<T, [...Count, [...Count, 1]['length']]>;

export type GreaterThan<T extends number, U extends number> = Transform<T> extends Transform<U> ? false : true;

//用0+1逼近：
// type GreaterThan<
//   T extends number,
//   U extends number,
//   A extends unknown[] = []
// > = A["length"] extends T
//   ? false
//   : A["length"] extends U
//   ? true
//   : GreaterThan<T, U, [...A, unknown]>;

//思路：
//数字类型不能直接对比，需要将其转化为与其大小挂钩的能够比较的结构（类型）
//数字字面量联合类型
//2 ==> [1,2] ==> 1|2，3 ==> [1,2,3] ==> 1|2|3

type testGreaterThan4 = [1, 1, 1] extends [1, 1, 1, 1] ? true : false;
type testGreaterThan5 = [1, 1, 1, 1] extends [1, 1, 1] ? true : false;
type testGreaterThan6 = [1, 1, 1, 1]['length'] extends 4 ? true : false;
type testGreaterThan7 = [1, 1, 1, 1][number] extends 1 ? true : false;
type testGreaterThan8 = [1, 2][number] extends 1 | 2 ? true : false;
type testGreaterThan9 = 1 extends 1 | 2 ? true : false;
type testGreaterThan10 = Transform<3>;
type testGreaterThan11 = Transform<4>;
type testGreaterThan12 = Transform<5>;

type testGreaterThan = GreaterThan<2, 1>; //should be true
type testGreaterThan1 = GreaterThan<1, 1>; //should be false
type testGreaterThan2 = GreaterThan<10, 100>; //should be false
type testGreaterThan3 = GreaterThan<111, 11>; //should be true
