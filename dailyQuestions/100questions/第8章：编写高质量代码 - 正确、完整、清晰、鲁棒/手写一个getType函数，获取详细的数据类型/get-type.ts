/**
 * @description  获取数据类型
 * @author Yang
 */

/**
 * 获取详细的数据类型
 * @param x
 */

export function getType(x: unknown): string {
  const originType = Object.prototype.toString.call(x);
  const spaceIndex = originType.indexOf(' ');
  // const type = originType.substring(spaceIndex + 1, originType.length - 1);
  const type = originType.slice(spaceIndex + 1, -1);

  //尽量操作简单数据类型
  // const type = originType.split(' ')[1].slice(0, -1);

  return type.toLowerCase();
}
