// type ObjectEntries<T extends object> = RequiredByKeys<T> extends infer U
//   ? {
//       [k in keyof U]: [k, U[k]] extends [k,...[never]]
//         ? k extends keyof T
//           ? [k,T[k]]
//           : never
//         : [k, U[k]]
//     }[keyof U]
//   : never;

// your answers
// type ObjectEntries<T, K extends keyof T = keyof T> = K extends keyof T ? [K, T[K] extends undefined ? undefined : Exclude<T[K], undefined>] : never

// your answers
type ObjectEntries<T, R = { [K in keyof T]-?: T[K] }, U extends keyof R = keyof R> = U extends any
  ? [U, [R[U]] extends [never] ? undefined : R[U]]
  : never;

//可选key的类型可以看做是其自身类型与undefined的联合类型

// {
//   name:[name,string];
//   age:[age,string];
//   location:[location,string[] | null]
// }

type testObjectEntries = ObjectEntries<Partial<Model>>;
type testObjectEntries1 = ObjectEntries<{ key?: undefined }>;
type testObjectEntries2 = ObjectEntries<{ key: undefined }>;
type testObjectEntries3 = RequiredByKeys<{ key?: undefined }>;
type testObjectEntries4 = RequiredByKeys<{ key: undefined }>;
type testObjectEntries5 = RequiredByKeys<{ key?: never }>;
type testObjectEntries6 = ObjectEntries<{ key?: never }>;

//结果是一个元组联合类型，那么：
//1，key的联合类型 extends [key,type]
//2，{[key:keyof K]:type}[K]

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];
