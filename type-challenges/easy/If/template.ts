type If<C extends boolean, T, F> = C extends true ? T : F;

//类型的可分配性在严格和非严格模式下的区别：
//https://www.typescriptlang.org/docs/handbook/type-compatibility.html

type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'

type n = null extends true ? 1 : 2;
