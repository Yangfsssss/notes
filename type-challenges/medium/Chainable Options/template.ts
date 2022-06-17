type Chainable<result = {}> = {
  option<K extends string, V>(key: K extends keyof result ? never : K, value: V): Chainable<result & { [k in K]: V }>;
  get(): result;
};

//
//函数的类型组成：泛型/参数类型/返回值类型
//function:generics/parameters/return type
//使用递归实现类型的累加。

declare const ChainableConfig: Chainable;

const result = ChainableConfig.option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// expect the type of result to be:
interface ChainableResult {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

type params = Parameters<Chainable['option']>;
