function isObject(obj: unknown): boolean {
  return typeof obj === 'object' && obj !== null;
}

export function isEqual(data: Record<keyof any, unknown>, target: Record<keyof any, unknown>): boolean {
  // 补充：
  if (!isObject(data) || !isObject(target)) {
    return Object.is(data, target);
  }

  // 补充：
  if (Object.is(data, target)) return true;

  // 补充：
  if (Object.keys(data).length !== Object.keys(target).length) return false;

  for (const key of Object.keys(data)) {
    // if (!Object.is(data[key], target[key])) {
    // if (typeof data[key] === 'object') {

    // return会直接结束遍历，所以要特别注意return的时机
    // return isEqual(data[key] as Record<keyof any, unknown>, target[key] as Record<keyof any, unknown>);
    const result = isEqual(data[key] as Record<keyof any, unknown>, target[key] as Record<keyof any, unknown>);

    if (!result) {
      return false;
    }
    // } else {
    // return false;
    // }
    // }
  }

  return true;
}
