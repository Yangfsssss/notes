type MyReturnType<T extends (...args: any[])=>any> = T extends (...args: any[]) => infer U ? U : never;

const MyReturnTypeFn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof MyReturnTypeFn> // should be "1 | 2"