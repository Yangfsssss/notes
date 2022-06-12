type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U>
  ? U extends Promise<unknown>
    ? MyAwaited<U>
    : U
  : T;

//思路：
//1，infer推断。
//2，递归处理嵌套的情形。

const await_p = Promise.resolve<Promise<string | number>>(Promise.resolve<string>('a'));

type P = MyAwaited<typeof await_p>;
