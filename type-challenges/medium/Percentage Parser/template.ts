type HandleHead<A extends string> = A extends `${infer U}${infer V}`
  ? U extends '+' | '-'
    ? [U, V]
    : ['', A]
  : ['', ''];

type HandleRest<R extends string> = R extends `${infer U}%` ? [U, `%`] : [R, ''];

type PercentageParser<A extends string> = [HandleHead<A>[0], ...HandleRest<HandleHead<A>[1]>];

// type PercentageParser<A extends string> = A extends `${infer V}${infer U}%`
//   ? V extends '+' | '-'
//     ? [V, U, '%'] //"+85%"
//     : ['', `${V}${U}`, '%'] //"85%"
//   : A extends `${infer V}${infer U}`
//   ? V extends '+' | '-'
//     ? [V, U, ''] //"+85",'+'
//     : `${V}${U}` extends '%'
//     ? ['', '', '%'] //"%"
//     : ['', `${V}${U}`, ''] //"85"
//   : ['', '', '']; //''

//infer的最小单位是空字符串类型，但不能重复出现
//空字符串类型能且仅能占用一个infer U的位置。

type TestPercentageParser = '8' extends `${infer U}` ? U : never;
type TestPercentageParser1 = '+85%' extends `${infer U}${infer V}${infer X}` ? X : never;
type TestPercentageParser2 = '+85%' extends `${'+' | '-'}${infer V}%` ? V : never;
type TestPercentageParser3 = '85%' extends `${'+' | '-'}${infer V}%` ? V : never;
type TestPercentageParser4 = '85' extends `${'+' | '-'}${infer V}%` ? V : never;
type TestPercentageParser5 = '%' extends `${infer U}%` ? U : false;
type TestPercentageParser8 = '%' extends `${infer U}${infer V}` ? V : false;
type TestPercentageParser6 = `${never}${never}` extends '' ? true : never;
type TestPercentageParser7 = PercentageParser<'%'>;
type TestPercentageParser9 = '' extends `${infer U}${infer V}` ? V : false;
type TestPercentageParser10 = 'ab' extends `${infer U}${infer V}${infer X}` ? X : false;

//结果总是由三部分组成
//1，正负号，没有为空字符串
//2，数值，没有为空字符串
//3，百分号，没有为空字符串

//思路：
//infer分离

type PString1 = '';
type PString2 = '+85%';
type PString3 = '-85%';
type PString4 = '85%';
type PString5 = '85';

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]
