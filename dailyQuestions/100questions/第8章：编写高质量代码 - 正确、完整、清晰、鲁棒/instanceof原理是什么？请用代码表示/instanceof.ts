/**
 * @description 手写 instanceof
 * @author Yang
 */

/**
 * 自定义 instanceof
 * @param instance instance
 * @param origin class or function
 */

export function myInstanceof(instance: unknown, origin: unknown): boolean {
  if (instance === null) return false;

  const type = typeof instance;
  if (type !== 'object' && type !== 'function') {
    // 值类型
    return false;
  }

  let tempInstance = instance; // 防止修改instance
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true;
    }

    // 未匹配
    tempInstance = tempInstance.__proto__; // 顺着原型链，往上找
  }

  return false;
}
