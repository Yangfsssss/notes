/** Item23: 一次性构建对象，Create Objects All at Once*/
//尽量一次性构建出整个对象。
//需要以类型安全的方式有条件地添加属性，可以使用null或{}进行对象扩展：
declare let hasMiddle: boolean;
const firstLast = { first: 'Harry', last: 'Truman' };
const president = { ...firstLast, ...(hasMiddle ? { middle: 'S' } : {}) };
//middle:string|undefined
president.middle;

function addOptional<T extends object, U extends object>(a: T, b: U | null): T & Partial<U> {
  return { ...a, ...b };
}

//如果想要通过转换另一个对象或数组来构建对象或数组，在这种情况下，“一次性构建对象”的
//等价方法是使用内置函数构造，或使用工具库（如Lodash），而非使用循环。
