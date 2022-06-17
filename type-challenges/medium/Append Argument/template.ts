type AppendArgument<Fn extends (...args: any[]) => unknown, A> = (...args: [...MyParameters<Fn>, A]) => MyReturnType<Fn>;

type Fn = (a: number, b: string) => number;

type AppendArgumentResult = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number
