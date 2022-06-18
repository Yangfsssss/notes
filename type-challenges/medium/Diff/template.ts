type Diff<O extends object, O1 extends object> = {
  [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: K extends keyof O
    ? O[K]
    : K extends keyof O1
    ? O1[K]
    : never;
};

type DiffFoo = {
  name: string;
  age: string;
};
type DiffBar = {
  name: string;
  age: string;
  gender: number;
};
type DiffCoo = {
  name: string;
  gender: number;
};

type testDiff = Diff<DiffFoo, DiffBar>;
type testDiff1 = keyof (DiffFoo | DiffBar);

//思路
//从两个对象类型的key的联合类型中除去它们公共key的联合类型，再取得余下key对应的类型。

//Get an Object that is the difference between O & O1
