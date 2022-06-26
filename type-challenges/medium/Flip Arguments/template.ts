type FlipArguments<T extends (...args: any[])=>any> = T extends (...args: infer U) => infer V
  ? (...args: Reverse<U>) => V
  : never

  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
  // (arg0: boolean, arg1: number, arg2: string) => void