/** Item38: 为any类型使用最窄的范围，Use the Narrowest Possible Scope for any Types */

interface Bar {
  bar: 'bar';
}
interface Foo {
  foo: 'foo';
}

function expressionReturningFoo(): Foo {
  throw new Error('Function not implemented.');
}

function processBar(b: Bar) {
  //...
}

function fy() {
  const x = expressionReturningFoo();
  // @ts-ignore
  processBar(x);
}

function fy1() {
  const x: any = expressionReturningFoo();
  processBar(x);
}

function fy2() {
  const x = expressionReturningFoo();
  processBar(x as any);
}

interface Config {
  a: number;
  b: number;
  c: {
    key: 'value';
  };
}

const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: 'value1' as any,
  },
} as any;

//Things to Remember
//• Make your uses of any as narrowly scoped as possible to avoid undesired loss of type safety elsewhere in your code.
//• Never return an any type from a function. This will silently lead to the loss of type safety for any client calling the function.
//• Consider @ts-ignore as an alternative to any if you need to silence one error.
