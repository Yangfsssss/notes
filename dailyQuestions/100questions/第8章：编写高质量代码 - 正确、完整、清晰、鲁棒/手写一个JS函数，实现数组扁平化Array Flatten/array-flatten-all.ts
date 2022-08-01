export const flattenAll = (arg: any[]): unknown[] => {
  if (!Array.isArray(arg)) {
    throw new Error('参数必须是数组');
  }

  let result: unknown[] = [];

  //concat
  // for (const item of arg) {
  //   if (Array.isArray(item)) {
  //     result = result.concat(flattenAll(item));
  //   } else {
  //     result = result.concat(item);
  //   }
  // }

  //push
  for (const item of arg) {
    if (Array.isArray(item)) {
      result.push(...flattenAll(item));
    } else {
      result.push(item);
    }
  }

  return result;
};

//思路：
//不修改原数组，返回一个修改好的新数组。
//如果元素为数组，则递归调用flattenAll函数，将其中的元素添加到新数组中。
//如果元素不是数组，则将其直接添加到新数组中。
