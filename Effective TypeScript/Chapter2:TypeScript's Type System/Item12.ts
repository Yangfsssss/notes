/** Item12:尽可能将类型应用于整个函数表达式 */
//考虑将类型声明应用于整个函数表达式，而不是分别用于它们的参数和返回类型。
//如果你在重复编写相同的类型签名，请归因出一个函数类型或寻找一个现有的类型。
//如果你是一个库的作者，请提供常见的回调类型。
//使用typeof fn来匹配另一个函数的签名

function rollDice1(sides: number): number {
  return 3;
}

type RollDiceFn = (sides: number) => number;

const rollDice2: RollDiceFn = (sides) => {
  return 3;
};
