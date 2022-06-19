type RemoveIndexSignature<T extends object> = {
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K];
};

//在对象类型中，number或[number]的key无法通过`${infer U}`筛选出来。
// type RemoveIndexSignature<T> = {
//   [K in keyof T as K extends `${infer U}` ? U : never]: T[K];
// };

//规则：
//string，number，symbol无法分配至以索引签名的形式定义的成员的key。

//思路：
//将以索引签名的形式定义的成员与其他成员区分然后排除。

type RemoveIndexSignatureFoo = {
  [key: string]: any;
  foo(): void;
  3: number;
  [3]: number;
  abc: boolean;
  ['abc']: boolean;
};

type RemoveIndexSignatureA = RemoveIndexSignature<RemoveIndexSignatureFoo>; // expected { foo(): void }
