export type Fibonacci<
  T extends number,
  N1 extends 1[] = [],
  N2 extends 1[] = [1],
  Count extends 1[] = [1]
> = T extends [...Count, 1]['length'] ? [...N1, ...N2]['length'] : Fibonacci<T, [...N2], [...N1, ...N2], [...Count, 1]>;

// export type Fibonacci<
//   T extends number,
//   Index extends 1[] = [1],
//   Prev extends 1[] = [],
//   Cur extends 1[] = [1],
//   > = T extends Index['length']
//             ? [...Cur]['length']
//             : Fibonacci<T,[...Index,1],Cur,[...Prev,...Cur]>

//递归状态的迁移：
//递归的前一个状态是什么？下一个状态是什么？如何从前一个状态迁移到下一个状态？

//用1[]类型数组的长度来代替数字进行数字运算。

//1:
//0,1,1 ==> 1
//2:
//1,1,2 ==>2

//1,1,2,3,5,8,13,21,34
//[1,1,2,3,5,8,13,21,34]
type Result = Fibonacci<2>; // 2
type Result1 = Fibonacci<3>; // 2
type Result2 = Fibonacci<4>; // 2
type Result3 = Fibonacci<5>; // 2
type Result4 = Fibonacci<6>; // 2
type Result5 = Fibonacci<7>; // 2
type Result26 = Fibonacci<8>; // 21

function fibonacci(m: number): number {
  if ((m = 1)) return 1;
  if ((m = 0)) return 0;

  return 1 + fibonacci(m - 1);
}

function exactOneInFibonacci(n: number): number {
  return fibonacci(n - 1) + fibonacci(n - 2);
}
