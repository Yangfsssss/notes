// 将一个用字符串表示的金额进行 3 位切割，小数部分四舍五入保留两位
// 例如：'23456789.1284' => '23,456,789.13'

// 思路：
// 将字符串从尾到头遍历，结果分为小数和整数两部分，用isDecimalPart区分；注意：先判断是否含有小数；
// 直到"."之前为小数部分，取完之后用toFixed(2).substring(1)处理；注意：需要包含.xxxx一同处理，并去掉结果0.xx中的0；
// "."之后为整数部分，使用j计数，每三个数增加一个","；
// 遍历结束，返回 整数部分 + 小数部分

export function cashDisplay(str: string): string {
  let decimalPart = '';
  let integerPart = '';

  let isDecimalPart = true;

  // 判断是否存在小数
  if (!str.includes('.')) {
    isDecimalPart = false;
  }

  let j = 0;

  const length = str.length;

  for (let i = length - 1; i >= 0; i--) {
    // 遇到"."时，结束小数部分并切换
    if (str[i] === '.') {
      // 将.xxxx四舍五入保留两位小数为0.xx并去掉0.xx中的0
      decimalPart = Number('.' + decimalPart)
        .toFixed(2)
        .substring(1);
      isDecimalPart = false;
      continue;
    }

    // 处理小数部分
    if (isDecimalPart) {
      decimalPart = str[i] + decimalPart;
    }

    // 处理整数部分
    if (!isDecimalPart) {
      if (j === 3) {
        integerPart = str[i] + ',' + integerPart;
        j = 1;
      } else {
        integerPart = str[i] + integerPart;
        j++;
      }
    }
  }

  return integerPart + decimalPart;
}

console.log(cashDisplay('23456789.1284'));
console.log(cashDisplay('234567892223'));
