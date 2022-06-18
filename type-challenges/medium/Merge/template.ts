type Merge<F extends object, S extends object> = {
  [K in keyof (F & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};

//思路：
//取出F和S的key合并，遍历取出其类型

type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};

type ResultMerge = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}
