//写一个JS函数，实现数组扁平化，只减少一级嵌套
type MyFlatten = (parameters: unknown[]) => unknown[];

export const flatten: MyFlatten = (ary) => {
  if (!Array.isArray(ary)) {
    throw new Error('参数必须是数组');
  }

  let result: unknown[] = [];

  //push
  ary.forEach((item) => {
    Array.isArray(item) ? result.push(...item) : result.push(item);
  });

  //concat
  // result = result.concat(...ary);

  return result;
};
