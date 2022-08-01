/**
 * @description 深拷贝 - 只考虑了简单的数组、对象
 * @param obj obj
 */

// function cloneDeep(obj: any) {
//   if (typeof obj !== 'object' || obj === null) return obj;

//   let result: any;
//   if (Array.isArray(obj)) {
//     result = [];
//   } else {
//     result = {};
//   }

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       result[key] = cloneDeep(obj[key]); // 递归
//     }
//   }

//   return result;
// }

// // 功能测试
// const a: any = {
//   set: new Set([10, 20, 30]),
//   map: new Map([
//     ['x', 10],
//     ['y', 20],
//   ]),
// };
// a.self = a;

// console.log(cloneDeep(a));

/**
 * @param obj obj
 * @param map WeakMap 为了避免循环引用
 */

export function cloneDeep(obj: any, map = new WeakMap()): any {
  if (typeof obj !== 'object' || obj === null) return obj;

  // 避免循环引用
  const objFromMap = map.get(obj);
  if (objFromMap) return objFromMap;

  let target: any = {};
  map.set(obj, target);

  // Map
  if (obj instanceof Map) {
    target = new Map();

    for (const [key, value] of obj) {
      const k = cloneDeep(key, map);
      const v = cloneDeep(value, map);
      target.set(k, v);
    }
  }

  // Set
  if (obj instanceof Set) {
    target = new Set();

    for (const value of obj) {
      const v = cloneDeep(value, map);
      target.add(v);
    }
  }

  // Array
  if (Array.isArray(obj)) {
    target = obj.map((item) => cloneDeep(item, map));
  }

  // Object
  for (const key in obj) {
    const value = obj[key];
    const cloneValue = cloneDeep(value, map);

    target[key] = cloneValue;
  }

  return target;
}

// 功能测试
const a: any = {
  set: new Set([10, 20, 30]),
  map: new Map([
    ['x', 10],
    ['y', 20],
  ]),
  info: {
    city: 'Shanghai',
  },
  fn: () => console.log(100),
};
a.self = a;

console.log(cloneDeep(a));
