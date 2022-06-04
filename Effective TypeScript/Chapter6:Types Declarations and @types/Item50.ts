/** Item50: 优先选择条件类型，而不是重载声明，Prefer Conditional Types to Overloaded Declarations */

// function double(x: number | string): number | string;

//使用泛型来捕获这种关系：
// function double<T extends number | string>(x: T): T;

//提供多个类型声明：
// function double(x: number): number;
// function double(x: string): string;

//使用条件类型
function double<T extends number | string>(x: T): T extends string ? string : number;
function double(x: any) {
  return x + x;
}

const _num = double(12);
const str = double('x');

//使用条件类型时，条件类型优先于联合类型
function _f(x: number | string) {
  //提供多个类型声明时，可以通过增加第三个string|number重载来修复这个问题：
  return double(x);
}

//虽然使用重载的类型声明写起来更容易，但使用条件类型的版本更正确，因为它覆盖了每个情况的组合。
//对于重载来说，情况往往是这样的：重载是独立处理的，而条件类型可以被类型检查器当做一个单一的表达式进行分析，并将它们分配到各个联合上。
//如果你发现自己写了一个重载类型的声明，应考虑使用条件类型来表达是否会更好。

//Things to Remember
//优先选择条件类型而不是重载类型声明。通过分配到各个联合上的方式，条件类型可以让声明支持联合类型，而无需额外重载。
