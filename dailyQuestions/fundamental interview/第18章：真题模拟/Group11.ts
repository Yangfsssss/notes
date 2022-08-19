/** 将url参数解析为JS对象：传统方法 */
function queryToObj() {
  const res: Record<keyof any, string> = {};
  const search = location.search.substring(1);

  search.split('&').forEach((item) => {
    const [key, value] = item.split('=');
    res[key] = value;
  });

  return res;
}

/** 将url参数解析为JS对象：使用URLSearchParams */
function queryToObjUsingURLSearchParams() {
  const res: Record<keyof any, string> = {};
  const pList = new URLSearchParams(location.search);

  pList.forEach((value, key) => {
    res[key] = value;
  });

  return res;
}

/** 数组flatten：栈 */
export function flatten(ary: unknown[]): unknown[] {
  const stack = [...ary];
  const result: unknown[] = [];

  while (stack.length) {
    const item = stack.shift();

    if (Array.isArray(item)) {
      stack.unshift(...(item as unknown[]));
    } else {
      result.push(item);
    }
  }

  return result;
}

/** 数组flatten：递归 */
function flattenRecursive(arg: unknown[]) {
  const result: unknown[] = [];

  for (const item of arg) {
    if (Array.isArray(item)) {
      result.push(...flattenRecursive(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

/** 数组flatten：使用concat递归 */
function flattenUsingConcatRecursive(arg: unknown[]): unknown[] {
  const isDeep = arg.some((item) => item instanceof Array);
  if (!isDeep) return arg;

  const res = Array.prototype.concat.apply([], arg);
  return flattenUsingConcatRecursive(res);
}

/** 数组去重：使用Array.from()/new Set() */
function deduplicate(ary: unknown[]): unknown[] {
  return Array.from(new Set(ary));
  // 或者使用扩展运算符：
  return [...new Set(ary)];
}

/** 数组去重：常规遍历 */
function deduplicateNormal(ary: unknown[]): unknown[] {
  const res: unknown[] = [];

  for (const item of ary) {
    if (!res.includes(item)) {
      res.push(item);
    }
  }

  return res;
}
