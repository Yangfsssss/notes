type IsUnion<T, U = T> = [T] extends [never] ? false : T extends U ? ([U] extends [T] ? false : true) : false;

//Distributive Conditional Types:分配式条件类型
//https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

//什么是有效的联合类型：
//这个联合类型无法分配至它的任意一个成员。

//规则：
//1，如果T extends U = T，且[U] extends [T]，那么：
//（不进入分配式条件类型）T不是一个联合类型，或者
//（进入分配式条件类型）T不是一个有效的联合类型。

// type IsUnion<
//   T,
//   F = T // Must declare another variable
// > = T extends unknown // T extends something is required
//   ? 'F != T' extends (F extends T ? never : 'F != T')
//     ? true
//     : false
//   : never;

//如何判断一个类型是不是联合类型

type testIsUnion = string | 'a' extends 'a' ? true : false;
type testIsUnion1 = 'a' extends 'a' | string ? true : false;
type testIsUnion2 = keyof string | number;
type testIsUnion3 = IsUnion<string | 'a'>;
type testIsUnion4 = string extends 'a' | string ? true : false;
type testIsUnion5 = IsUnion<string | never>;
type testIsUnion6 = IsUnion<string | number>;
type testIsUnion7 = string | number extends infer U | infer V ? U : never;
type testIsUnion8 = string | number extends infer U | infer V ? V : never;
type testIsUnion9 = string | 'a' extends infer U | infer V ? U : never;
type testIsUnion10 = string | never extends infer U | infer V ? U : never;
type testIsUnion11 = string | never extends infer U | infer V ? V : never;
type testIsUnion12 = string extends infer U | infer V ? V : never;
type testIsUnion13 = [string];
type testIsUnion14 = [string | number | boolean];
type testIsUnion15 = ['a' | 'b' | 'c' | 'd'];
type testIsUnion16 = ['a'] extends ['a' | 'b' | 'c' | 'd'] ? true : false;
type testIsUnion17 = ['a', 'b'] extends ['a' | 'b' | 'c' | 'd'] ? true : false;
type testIsUnion18 = [string] extends [string] ? true : false;
type testIsUnion19 = [string | number] extends [string | number] ? true : false;
type testIsUnion20 = IsUnion<never>;
type testIsUnion21 = [string | number] extends [string] ? true : false;
type testIsUnion22 = [string | never] extends [string] ? true : false;
type testIsUnion23 = [string | never] extends [never] ? true : false;
type testIsUnion24 = never extends never ? true : false;
type testIsUnion25 = [never] extends [never] ? true : false;
type testIsUnion26 = string extends never ? true : false;

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false
