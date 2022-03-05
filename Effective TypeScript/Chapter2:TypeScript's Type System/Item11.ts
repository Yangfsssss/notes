/** Item11:认识额外属性检查的局限性 */
//当一个对象字面量被绑定只一个变量或作为一个函数的参数使用时，它将经历额外属性检查。
//额外属性检查是发现错误的有效方法，但它与TypeScript类型检查器通常所做的结构性、可分配性检查不同。不要将其混为一谈。
//注意额外属性检查的局限性：引入一个中间变量将消除这些检查
interface Room {
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

//Duck Type
type SubType = {
  key1: number;
};

type MiddleType = {
  key1: number;
  key2: number;
};

const middleObj: MiddleType = {
  key1: 3,
  key2: 5,
};

const subObj: SubType = middleObj;

export {};
