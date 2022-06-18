type IsUpperCase<T extends string> = T extends Uppercase<T> ? (T extends Lowercase<T> ? false : true) : false;

//使用IsFirstUpperCase:boolean判断U是不是S的第一个字符
// type KebabCase<S extends string, IsFirstLetter = true> = S extends `${infer U}${infer V}`
//   ? `${IsUpperCase<U> extends true ? `${IsFirstLetter extends true ? '' : '-'}${Lowercase<U>}` : U}${KebabCase<
//       V,
//       false
//     >}`
//   : S;

//第一次递归时使用默认的泛型的类型S[0]来判断U是不是S的第一个字符，
//之后指定传入S，使判断一直为非第一个字符。
type KebabCase<S extends string, OriStr extends string = S[0]> = S extends `${infer U}${infer V}`
  ? `${IsUpperCase<U> extends true ? `${U extends OriStr ? '' : '-'}${Lowercase<U>}` : U}${KebabCase<V, S>}`
  : S;

type WhatIsIt<S extends string, OriStr extends string = S[0]> = OriStr;
type testWhatIsIt = WhatIsIt<'oo', 'Foo'>;

//FoFo,S = FoFo,OriStr = S[0] = F,U = F,V = oFo
//`f${KebabCase<'oFo',FoFo>}`
//oFo,S = oFo,OriStr = FoFo,U = o,V = Fo
//`o${KebabCase<'Fo','oFo'>}`
//Fo,S = Fo,OriStr = S[0] = F,U = F,V = o
//

//模版字符串的组合
//递归中特殊情况的处理
//泛型的类型和其默认类型

//如果泛型的默认类型与另一个泛型有关且没有被指定的泛型参数传入，则它的类型会随另一个泛型的变化而变化。
//如果泛型的默认类型是一个确定的类型，则它的变化只取决于是否有指定的泛型参数传入。

type testKebabCase = KebabCase<'FooBarBaz'>;
type testKebabCase1 = 'F' extends 'FooBarBaz'[0] ? true : false;
type testKebabCase2 = KebabCase<'fooBarBaz'>;
type testKebabCase3 = 'fooBarBaz' extends `${infer U}${infer V}` ? V : false;
type testKebabCase4 = KebabCase<'fooBarBaz'>;
type testKebabCase5 = 'foo-bar-baz' extends `-${infer U}` ? U : never;
type testKebabCase6 = KebabCase<'foo-bar'>;
type testKebabCase7 = KebabCase<'-'>;
type testKebabCase8 = '😎' extends `${infer U}` ? U : never;
type testKebabCase9 = '😎' extends string ? true : never;
type testKebabCase10 = KebabCase<'😎'>;
type testKebabCase11 = KebabCase<'FooFarFaz'>;
type testKebabCase12 = KebabCase<'ABC'>;
type testKebabCase13 = KebabCase<'ZooZarZaz'>;
//思路：
//infer递归。

//FooBarBaz -> foo-bar-baz
