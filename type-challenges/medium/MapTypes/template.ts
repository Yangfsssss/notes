type MapTypes<
  T extends Record<keyof any, unknown>,
  R extends {
    mapFrom: unknown;
    mapTo: unknown;
  }
> = {
  [K in keyof T]: R extends any ? (R['mapFrom'] extends T[K] ? R['mapTo'] : never) : never;
} extends infer U
  ? {
      [K in keyof U]: [U[K]] extends [never] ? T[K] : U[K];
    }
  : never;
  //使用{key:type} extends infer U ? {key:type}实现递进处理。
  //即先处理一次，再对处理的结果进行再次处理。

// type MapTypes<
//   T extends Record<keyof any, unknown>,
//   R extends {
//     mapFrom: unknown;
//     mapTo: unknown;
//   }
// > = {
//   [K in keyof T]: T[K] extends R['mapFrom']
//     ? R extends {
//         mapFrom: T[K];
//         mapTo: infer To;
//       }
//       ? To
//       : never
//     : T[K];
// };
//使用infer占位要求取的类型。


// [K in keyof T as Equal<T[K], R['mapFrom']> extends true ? never : K]:T[K] extends R['mapFrom'] ? R['mapTo'] : T[K]
type testMapTypes = MapTypes<
  { fields: Record<string, boolean> },
  { mapFrom: Record<string, boolean>; mapTo: string[] }
>;
type testMapTypes1 = MapTypes<
  { name: string; date: Date },
  { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
>;
type testMapTypes9 = MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>;
type testMapTypes2 = ({ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string })['mapFrom'];
type testMapTypes3 = ({ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string })['mapFrom'] extends {
  name: string;
  date: Date;
}['name']
  ? true
  : false;
type testMapTypes4<T> = keyof T extends string ? true : false;
type testMapTypes5 = testMapTypes4<{ name: string; date: Date }>;
type testMapTypes6 = ({ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string })['mapTo'];
type testMapTypes7 = keyof ({ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string });
// type testMapTypes8<T extends {mapFrom:string, mapTo:string}> = T extends any ? T['mapFrom']  extends S[K] ? T['mapTo'];
type testMapTypes10 = { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string } extends object
  ? true
  : false;

type StringToNumber = {
  mapFrom: string; // value of key which value is string
  mapTo: number; // will be transformed for number
};

//接受两个对象类型参数
//第一个为Record<keyof any,unknown>
//第二个为{mapFrom:keyof any;mapTo:unknown}
//将第一个参数中key的类型等于mapFrom的类型的成员的类型更改为mapTo的类型

// type StringToNumber = { mapFrom: string; mapTo: number;}
// MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }

// type StringToNumber = { mapFrom: string; mapTo: number;}
// type StringToDate = { mapFrom: string; mapTo: Date;}
// MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }

// type StringToNumber = { mapFrom: string; mapTo: number;}
// MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeAN/* A type.
