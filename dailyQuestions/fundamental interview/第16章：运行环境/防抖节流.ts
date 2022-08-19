// 防抖：将一个函数转化为防抖版

export function debounce(fn: (...args: unknown[]) => unknown, delay: number) {
  let timer: NodeJS.Timeout | undefined;

  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };
}

const test = debounce(() => {
  console.log('executed test');
},300)

// test()
// test()
// test()
// test()
// test()
// test()
// test()
// test()

function throttle(fn: (...args: unknown[]) => unknown, delay: number){
  let flag = true;

  return (...args: unknown[]) => {
    if(flag) fn(...args);

    flag = false;

    setTimeout(() => {
      flag = true;
    },delay);
  }
}

const test1 = throttle(() => {
  console.log('executed test1');
},3000)
