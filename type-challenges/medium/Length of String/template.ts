type StringToTuple<S> = S extends '' ? [] : S extends `${infer U}${infer V}` ? [U, ...StringToTuple<V>] : never;

type LengthOfString<S extends string> = StringToTuple<S>['length'];

//思路：
//1. 将字符串转换为元组，取得元组的长度。
