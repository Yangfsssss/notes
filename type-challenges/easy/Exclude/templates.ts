type MyExclude<T, U> = T extends U ? never : T;

//联合类型进行extends运算时并不整体参与运算，而是每个成员单独参与运算。

//思路：
//1，应该返回一个T与U的交集。

//Exclude from T those types that are assignable to U

type t = 'a' | 'b' | 'c';
type u = 'c' | 'd' | 'e';

type tt = t[];

interface t1 {
  a: string;
  b: string;
  c: string;
}
interface u1 {
  c: string;
  d: string;
  e: string;
}

type z = 'c';
interface z1 {
  c: string;
}

type x = z extends u ? true : false;
type x1 = z1 extends u1 ? true : false;
