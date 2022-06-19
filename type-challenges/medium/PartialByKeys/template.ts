type PartialByKeys<T extends object, K = keyof T> = {
  [P in keyof T as P extends K ? P : never]?: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
} extends infer U
  ? {
      [K in keyof U]: U[K];
    }
  : never;

//使用infer U可以将用&组合的对象类型推断为单个对象类型。

//思路：
//操作key。

interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, 'name'>; // { name?:string; age:number; address:string }
