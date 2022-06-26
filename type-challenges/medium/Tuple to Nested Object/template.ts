type TupleToNestedObject<T extends readonly unknown[], U> = T extends [infer Q, ...infer W]
  ? Q extends string
    ? W extends []
      ? { [K in [Q][number]]: U }
      : { [K in [Q][number]]: TupleToNestedObject<W, U> }
    : never
  : U;

  // type TupleToNestedObject<T extends readonly unknown[], U> = T extends [infer Q extends string, ...infer W]
  //   ? {[K in Q]:TupleToNestedObject<W,U>}
  //   :U

//如何将一个字面量类型转换成key：
//[K in ['a'][number]]

// type testTupleToNestedObject = ['a'] extends [infer Q,...infer W] ?  {[K in  [Q][number]]:number} :false
type testTupleToNestedObject1 = ['a'] extends [infer Q, ...infer W] ? [Q][number] : false;
type testTupleToNestedObject2 = { [K in ['a'][number]]: string };

//infer递归

type TupleToNestedObjectA = TupleToNestedObject<['a'], string>; // {a: string}
type TupleToNestedObjectB = TupleToNestedObject<['a', 'b'], number>; // {a: {b: number}}
type TupleToNestedObjectC = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type
