type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

//思路：
//1，遍历「对象类型」中的「key」，将其设置为「readonly」。

//Object Types:「readonly」 Properties
//https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties
