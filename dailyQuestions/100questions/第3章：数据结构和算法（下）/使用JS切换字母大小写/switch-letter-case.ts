/**
 * @description 切换字母大小写
 * @author Yang
 */

/**
 * 切换字符大小写（正则表达式）
 * @param s string
 */
export function switchLetterCaseUsingRegExp(s: string): string {
  let res = '';

  const length = s.length;
  if (length === 0) return res;

  const regLowercase = /[a-z]/;
  const regUppercase = /[A-Z]/;

  // String.prototype.replace()一样
  for (let i = 0; i < length; i++) {
    const c = s[i];

    if (regLowercase.test(c)) {
      res += c.toUpperCase();
    } else if (regUppercase.test(c)) {
      res += c.toLowerCase();
    } else {
      res += c;
    }
  }

  return res;
}

/**
 * 切换字符大小写（ASCII编码）
 * @param s string
 */
export function switchLetterCaseUsingASCII(s: string): string {
  let res = '';

  const length = s.length;
  if (length === 0) return res;

  for (let i = 0; i < length; i++) {
    const c = s[i];
    const code = c.charCodeAt(0);

    // if (code >= 65 && code <= 90) {
    //   res += c.toLowerCase();
    // } else if (code >= 97 && code <= 122) {
    //   res += c.toUpperCase();
    // } else {
    //   res += c;
    // }

    // 另一种判断方式
    if (c >= 'a' && c <= 'z') {
      res += String.fromCharCode(code - 32);
    } else if (c >= 'A' && c <= 'Z') {
      res += String.fromCharCode(code + 32);
    } else {
      res += c;
    }
  }

  return res;
}

/**
 * 切换字符大小写（toUpperCase()/toLowerCases()）
 * @param s string
 */
export function switchLetterCaseUsingToUpperCase(s: string): string {
  let res = '';

  const length = s.length;
  if (length === 0) return res;

  for (let i = 0; i < length; i++) {
    const c = s[i];

    if (c.toUpperCase() === c) {
      res += c.toLowerCase();
    } else if (c.toLowerCase() === c) {
      res += c.toUpperCase();
    }
  }

  return res;
}

// 功能测试
// const str = '100aBcD$#xYz';
// console.log(switchLetterCaseUsingRegExp(str));
// console.log(switchLetterCaseUsingASCII(str));

// 性能测试
const str =
  '100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz';
console.time('switchLetterCaseUsingRegExp');
for (let i = 0; i < 100 * 1000; i++) {
  switchLetterCaseUsingRegExp(str);
}
console.timeEnd('switchLetterCaseUsingRegExp'); // 851ms

console.time('switchLetterCaseUsingASCII');
for (let i = 0; i < 100 * 1000; i++) {
  switchLetterCaseUsingASCII(str);
}
console.timeEnd('switchLetterCaseUsingASCII'); // 324ms
