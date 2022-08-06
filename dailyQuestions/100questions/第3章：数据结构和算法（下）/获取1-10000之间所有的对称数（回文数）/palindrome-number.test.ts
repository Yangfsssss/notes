/** test
 * @author Yang
 */

import {
  findPalindromeNumbersArrayReverse,
  findPalindromeNumbersStringCompare,
  findPalindromeNumbersReverseNumber,
} from './palindrome-number';

describe('对称数', () => {
  test('正常情况', () => {
    // const number = findPalindromeNumbersArrayReverse(200);
    // const number = findPalindromeNumbersStringCompare(200);
    const number = findPalindromeNumbersReverseNumber(200);

    expect(number).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99, 101, 111, 121, 131, 141, 151, 161, 171, 181, 191,
    ]);
    expect(number.length).toEqual(28);
  });

  test('max 小于等于 0', () => {
    // const number = findPalindromeNumbersArrayReverse(0);
    // const number = findPalindromeNumbersStringCompare(0);
    const number = findPalindromeNumbersReverseNumber(0);

    expect(number).toEqual([]);
    expect(number.length).toEqual(0);
  });
});
