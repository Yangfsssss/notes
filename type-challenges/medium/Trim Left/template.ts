// type TrimLeft<S extends string> = S extends `${infer U}${infer V}`
//   ? U extends ''
//     ? ''
//     : U extends ' ' | '\n' | '\t' | '\n\t'
//     ? TrimLeft<V>
//     : `${U}${V}`
//   : '';

type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer U}` ? TrimLeft<U> : S;

//模板字符串类型中infer U的最小单位是单个（空格）字符。

type trimed = TrimLeft<'  Hello World  '>; // expected to be 'Hello World  '
type trimed1 = TrimLeft<''>; // expected to be '''
type trimed2 = '' extends '' ? true : false; // expected to be 'true
type trimed3 = '' extends `${infer U}${infer V}` ? U : false; // expected to be false
type trimed4 = '   ' extends `${infer U}${infer V}` ? V : false; // expected to be false
