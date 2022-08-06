/**
 * @description 连续字符
 * @author Yang
 */

interface IRes {
  char: string;
  length: number;
}

/**
 * 求连续最多的字符和次数（嵌套循环）
 * @param str string
 */

export function findContinuousCharDumb(str: string): IRes {
  const res: IRes = {
    char: '',
    length: 0,
  };

  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0; // 临时记录当前连续字符的长度

  // O(n)
  // i 指定字符，j 测试字符
  for (let i = 0; i < length; i++) {
    tempLength = 0; // 新指定字符，重置

    for (let j = i; j < length; j++) {
      // 测试字符等于指定字符，增加记录长度
      if (str[i] === str[j]) {
        tempLength++;
      }

      // 测试字符不等于指定字符，或者已经测试到了最后一个元素；
      // 要结算这一轮指定字符的测试，并跳出，（开始下一轮）；
      if (str[i] !== str[j] || j === length - 1) {
        // 这轮的记录长度大于已知的记录长度，更新记录
        if (tempLength > res.length) {
          res.char = str[i];
          res.length = tempLength;
        }

        // 至少还能再测试一轮，更新指定字符，继续测试
        if (i < length - 1) {
          i = j - 1;
        }

        break;
      }
    }
  }

  return res;
}

/**
 * 求连续最多的字符和次数（双指针，嵌套循环思路优化版）
 * @param str string
 */

export function findContinuousCharSmart(str: string): IRes {
  const res: IRes = {
    char: ' ',
    length: 0,
  };

  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0;
  let i = 0;
  let j = 0;

  for (; j < length; j++) {
    if (str[i] === str[j]) {
      tempLength++;
    }

    if (str[i] !== str[j] || j === length - 1) {
      if (tempLength > res.length) {
        res.char = str[i];
        res.length = tempLength;
      }

      tempLength = 0;

      if (j < length - 1) {
        i = j;
        j--;
      }
    }
  }

  return res;
}

// 功能测试
// const str = 'aabbcccddeeee11223';
// console.log(findContinuousCharDumb(str));

// 性能测试
let str = '';
for (let i = 0; i < 1000 * 1000; i++) {
  str += i.toString();
}

console.time('dumb');
findContinuousCharDumb(str);
console.timeEnd('dumb'); // 125ms

console.time('smart');
findContinuousCharSmart(str);
console.timeEnd('smart'); // 145ms
