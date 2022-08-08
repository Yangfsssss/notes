/** Item34: 宁愿选择不完整的类型，也不选择不准确的类型，Prefer Incomplete Types to Inaccurate Types */

type Expression1 = any;
type Expression2 = number | string | any[];

const tests2: Expression2[] = [
  10,
  'red',
  //@ts-ignore
  true,
  // ~~~ Type 'true' is not assignable to type 'Expression2'
  ['+', 10, 5],
  ['case', ['>', 20, 10], 'red', 'blue', 'green'], // Too many values
  ['**', 2, 31], // Should be an error: no "**" function
  ['rgb', 255, 128, 64],
  ['rgb', 255, 0, 127, 0],
];

type FnName = '+' | '-' | '*' | '/' | '>' | '<' | 'case' | 'rgb';
type CallExpression3 = [FnName, ...any[]];
type Expression3 = number | string | CallExpression3;

const tests3: Expression3[] = [
  10,
  'red',
  //@ts-ignore
  true,
  // ~~~ Type 'true' is not assignable to type 'Expression2'
  ['+', 10, 5],
  ['case', ['>', 20, 10], 'red', 'blue', 'green'],
  //@ts-ignore
  ['**', 2, 31], // Should be an error: no "**" function
  ['rgb', 255, 128, 64],
  ['rgb', 255, 0, 127, 0],
];

type Expression4 = number | string | CallExpression4;
type CallExpression4 = MathCall | CaseCall | RGBCall;
interface MathCall {
  0: '+' | '-' | '/' | '*' | '>' | '<';
  1: Expression4;
  2: Expression4;
  length: 3;
}
interface CaseCall {
  0: 'case';
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4 | 6 | 8 | 10 | 12 | 14 | 16; // etc.
}
interface RGBCall {
  0: 'rgb';
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4;
}

const tests4: Expression4[] = [
  10,
  'red',
  //@ts-ignore
  true,
  // ~~~ Type 'true' is not assignable to type 'Expression2'
  ['+', 10, 5],
  //@ts-ignore
  ['case', ['>', 20, 10], 'red', 'blue', 'green'],
  //@ts-ignore
  ['**', 2, 31], // Should be an error: no "**" function
  ['rgb', 255, 128, 64],
  //@ts-ignore
  ['rgb', 255, 0, 127, 0],
];

const okExpression: Expression4[] = [
  //@ts-ignore
  ['-', 12],
  // ~~~~~~~~~ Type '["-", number]' is not assignable to type 'string'
  //@ts-ignore
  ['+', 1, 2, 3],
  // ~~~~~~~~~~~~~~ Type '["+", number, ...]' is not assignable to type 'string'
  //@ts-ignore
  ['*', 2, 3, 4],
  // ~~~~~~~~~~~~~~ Type '["*", number, ...]' is not assignable to type 'string'
];

//Things to Remember
//• Avoid the uncanny valley of type safety: incorrect types are often worse than no types.
//• If you cannot model a type accurately, do not model it inaccurately! Acknowledge the gaps using any or unknown.
//• Pay attention to error messages and autocomplete as you make typings increasingly precise. It’s not just about correctness: developer experience matters, too.
