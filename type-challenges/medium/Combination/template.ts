export type Combination<T extends string[], U extends string = T[number], P extends string = U> =
| U
| (P extends any ? `${P} ${Combination<T, U extends P ? never : U>}` : never);

//分配式条件类型一定以一个表达式的形式出现，
//这个表达式的运算结果也一定是一个联合类型。

type testCombination = ['foo', 'bar', 'baz'][number];// "foo" | "bar" | "baz"
// type testCombine = Combine<['foo', 'bar']>//"bar foo"|"foo bar"
// type testCombine1 = Combine<['foo', 'bar', 'baz']>
//"foo bar baz" | "foo baz bar" |"bar foo baz" | "bar baz foo" | "baz foo bar" |"baz bar foo"
type testCombine2 = ['bar'] extends [infer U extends string] ? U:false
type testCombine3 = [] extends [infer U extends string] ? U:false
type testCombine6 = Consist<['foo','bar','baz']> //'foo bar'|'bar foo'
type testCombine7 = Consist<['bar','baz']> //'foo bar'|'bar foo'

// expected to be "foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"
type Keys = Combination<['foo', 'bar', 'baz']>;
//foo:"foo"|"foo bar" |"foo baz"|"foo bar baz" |"foo baz bar"

type Consist<T extends string[]> = 
  T extends [infer U extends string, ...infer V extends string[]]
    ? V['length'] extends 0
      ? U
      : V['length'] extends 1
        ? `${U} ${V[0]}` | `${V[0]} ${U}`
        : `${U} ${Consist<V>}`
    : T[0]
