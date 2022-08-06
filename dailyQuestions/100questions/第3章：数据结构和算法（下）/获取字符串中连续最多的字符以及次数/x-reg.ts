/**
 * @description 正则表达式
 * @author Yang
 */

export const str = '100abc';
const reg = /^\d+/;

console.time('reg');
for (let i = 0; i < 1000 * 1000; i++) {
  reg.test(str);
}
console.timeEnd('reg'); // 27ms

console.time('indexOf');
for (let i = 0; i < 1000 * 1000; i++) {
  str.indexOf('100');
}
console.timeEnd('indexOf'); // 1ms
