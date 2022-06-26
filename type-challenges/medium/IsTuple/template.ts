export type IsTuple<T extends any> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
  ? Equal<T['length'], number> extends true
    ? false
    : true
  : false;

type testIsTuple = number[]['length'] extends 3 ? true : false;
type testIsTuple1 = never extends readonly unknown[] ? true : false;
type testIsTuple2 = number[] extends readonly unknown[] ? true : false;
type testIsTuple3 = readonly [1] extends unknown[] ? true : false;
let testIsTuple4: readonly unknown[] = ['abc'];
const testIsTuple5: number[] = [1];
testIsTuple4 = testIsTuple5;

//思路：
//元组的length属性的类型是一个数字字面量类型，而数组的length属性的类型是number。

//规则：
//成员数量与其位置和类型确定的数组类型为元组类型。

type case1 = IsTuple<[number]>; // true
type case2 = IsTuple<readonly [number]>; // true
type case3 = IsTuple<number[]>; // false
type case4 = IsTuple<never>; // false
type case5 = IsTuple<readonly string[]>; // false
