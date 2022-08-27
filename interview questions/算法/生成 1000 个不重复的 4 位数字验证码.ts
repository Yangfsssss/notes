// 生成 1000 个不重复的 4 位数字验证码
// 例如：返回如下数组 [1234, 4567, ..., 8978]， 数组无重复项

// 思路：4个位数，逢9进1，遍历；

function generateVerificationCode() {
  const result = [];

  for (let i = 1, j = 0, m = 0, n = 0; i < 7; ) {
    result.push(Number(`${i}${j}${m}${n}`));
    if (result.length === 1000) return result;

    if (m < 9) {
      if (n === 9) {
        m++;
        n = 0;
      } else {
        n++;
      }

      continue;
    }

    if (j < 9) {
      if (m === 9) {
        j++;
        m = 0;
        n = 0;
      } else {
        m++;
      }

      continue;
    }

    if (i <= 7) {
      if (j >= 9) {
        i++;
        j = 0;
        m = 0;
        n = 0;
      } else {
        j++;
      }

      continue;
    }
  }

  return result;
}

console.log(generateVerificationCode());
console.log(new Set(generateVerificationCode()));
