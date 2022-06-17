type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never;

//思路：
//使用infer U来代替所求的未定类型。

type param = Parameters<(a:string)=>number> // [a:string]