export type BEM<B extends string, E extends string[], M extends string[]> = 
  M extends []
    ? E extends []
      ? B
      : `${B}__${E[number]}`
    : E extends []
      ? `${B}--${M[number]}`
      :  `${B}__${E[number]}--${M[number]}`

// type TupleToStringWithPrefix<T extends readonly string[],P extends string> = 
//   T extends []
//     ? ''
//     : `${P}${T[number]}`

//     export type BEM<B extends string, E extends string[], M extends string[]> = 
//   `${B}${TupleToStringWithPrefix<E,'__'>}${TupleToStringWithPrefix<M,'--'>}`

//组成结果的表达式中有一个是联合类型，
//结果就会是自行运算的联合类型

//第一个泛型参数为字符串字面量类型。
//第二个泛型参数为一个字符串字面量类型组成的元组或空元组。
//第三个泛型参数为若干个字符串字面量类型组成的元组类型或空元组

//结果：
//B(__E)(--M[0])|B(__E)(--M[1])|...|B(__E)(--M[n])

type testBEM = BEM<'btn', ['price'], []>
type testBEM1 = BEM<'btn', ['price'], ['warning', 'success']>
type testBEM2 = BEM<'btn', [], ['small', 'medium', 'large']>

//in/out in ts@4.7
type Foo<in out T> = {
  x: T;
  // y: Bar<T>;
  y: (x: {value:Foo<T[]>}) => void;
};

type Bar<U> = (x: Baz<U>) => void;

type Baz<V> = { value: Foo<V[]> };

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

// foo1 = foo2;
// foo2 = foo1;

//The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.
//For example, the block component would be represented as btn, element that depends upon the block would be represented as btn__price, modifier that changes the style of the block would be represented as btn--big or btn__price--warning.
//Implement BEM<B, E, M> which generate string union from these three parameters. Where B is a string literal, E and M are string arrays (can be empty).

