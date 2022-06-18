type StringToUnion<T extends string> = T extends `${infer U}${infer V}` ? U | StringToUnion<V> : never;

//思路：
//infer递归。

type TestStringToUnion = '123';
type ResultStringToUnion = StringToUnion<TestStringToUnion>; // expected to be "1" | "2" | "3"
