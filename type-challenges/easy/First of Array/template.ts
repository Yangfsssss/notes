//1，
// type First<T extends any[]> = T extends [] ? never : T[0];
//2，
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
//3，
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
//4，
type First<T extends any[]> = T extends [infer U, ...infer rest] ? U : never;

//思路：
//1，判断T是否为空数组类型。
//2，判断T的「length」成员的类型是否为数字字面量类型「0」。
//3，判断T的第一个成员的类型是否属于T的所有成员的类型组成的联合类型。
//4，使用infer推断T是否存在第一个成员。

//infer:
//在所需类型的位置用infer U代替，如果传入的泛型符合extends条件，用传入泛型对应位置的类型推断出U的类型。

type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
