/**
 * @description 括号匹配
 * @author Yang
 */

/**
 * 判断左右括号是否匹配
 * @param left 左括号
 * @param right 右括号
 */

function isMatch(left: string, right: string): boolean {
  if (left === '{' && right === '}') return true;
  if (left === '(' && right === ')') return true;
  if (left === '[' && right === ']') return true;

  return false;
}

/**
 * 判断括号是否匹配
 * @param str str
 */

export function matchBracket(str: string): boolean {
  const length = str.length;
  if (length === 0) return true;

  const stack: string[] = [];

  const leftSymbols = '{[(';
  const rightSymbols = ')]}';

  for (const i of str) {
    if (leftSymbols.includes(i)) {
      // 左括号，压栈
      stack.push(i);
    } else if (rightSymbols.includes(i)) {
      // 右括号，判断栈顶（是否出栈）
      const top = stack[stack.length - 1];

      if (isMatch(top, i)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// 功能测试
const str = '{a(b[c)]d)e}f';
console.log(matchBracket(str));
