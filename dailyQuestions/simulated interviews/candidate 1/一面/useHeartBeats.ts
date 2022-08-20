import { useEffect } from 'react';

export const useHeartBeats = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Hello');
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 使用setTimeout模拟setInterval：即将setInterval长任务改为分片执行的短任务
  useEffect(() => {
    let timer: NodeJS.Timeout;

    function fn() {
      console.log('Hello');

      // 自己将自己推入定时器，无限循环，直至定时器被清除
      timer = setTimeout(fn, 1000);
    }

    timer = setTimeout(fn, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
};
