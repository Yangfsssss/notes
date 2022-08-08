/** Item11:认识额外属性检查的局限性 */
//当一个对象字面量被绑定至一个变量或作为一个函数的参数使用时，它将经历额外属性检查。
//额外属性检查是发现错误的有效方法，但它与TypeScript类型检查器通常所做的结构性、可分配性检查不同。不要将其混为一谈。
//注意额外属性检查的局限性：引入一个中间变量将消除这些检查。

// For weak types, TypeScript adds another check to make sure that the value type and declared type have at least one property in common.
//This is effective at catching typos and isn’t strictly structural.
//But it happens during all assignability checks involving weak types.
//Factoring out an intermediate variable doesn’t bypass this check.
export interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  // elephant: 'present',
};

const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
};

const r1: Room = obj;

//weak types
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
//  const o: LineChartOptions = opts; //error:不能将类型“{ logScale: true }”分配给类型“LineChartOptions”。

//Things to Remember
//• When you assign an object literal to a variable or pass it as an argument to a
//function, it undergoes excess property checking.
//• Excess property checking is an effective way to find errors, but it is distinct from
//the usual structural assignability checks done by the TypeScript type checker.
//Conflating these processes will make it harder for you to build a mental model of assignability.
//• Be aware of the limits of excess property checking: introducing an intermediate
//variable will remove these checks.
