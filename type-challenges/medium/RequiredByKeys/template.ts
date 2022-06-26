type RequiredByKeys<T extends object, K = keyof T> = {
  [P in keyof T as P extends K ? P : never]-?: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
} extends infer U
  ? {
      [P in keyof U]: U[P];
    }
  : never;

// type Copy<T> = Pick<T, keyof T>

// type RequiredByKeys<T, K = keyof T> = Copy<Omit<T, K & keyof T> & Required<Pick<T, K & keyof T>>>

//
//"-?","- readonly"可以分别去掉可选和只读的约束。

interface RequiredByKeysUser {
  name?: string;
  age?: number;
  address?: string;
}

type testRequiredByKeys = { key?: undefined } extends infer U
  ? { [P in keyof U as P extends keyof U ? P : 'b']-?: U[P] }
  : 'a';
type testRequiredByKeys1 = { key?: undefined } extends infer U ? { [P in keyof U]-?:P } : 'a';
type testRequiredByKeys2 = { key?: undefined } extends infer U ? keyof U : 'a';
type testRequiredByKeys3 = 'key' | undefined extends 'key' ? true : false;
type testRequiredByKeys4 =keyof {key?: undefined}
type testRequiredByKeys5 = {key?: undefined}

type UserRequiredName = RequiredByKeys<RequiredByKeysUser, 'name' | 'age' | 'address'>; // { name: string; age?: number; address?: string }
