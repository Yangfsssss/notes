type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : T;

type test<S extends string, U extends string = StringToUnion<S>, P extends string = U> = P extends any
  ? `${P}${AllCombinations<S, U extends P ? 'x' : U>}`
  : never;

export type AllCombinations<S extends string, U extends string = StringToUnion<S>, P extends string = U> =
  | U
  | (P extends any ? `${P}${AllCombinations<S, U extends P ? never : U>}` : never);

type testTest = test<'AB'>;
type testTest8 = AllCombinations<'ABC', StringToUnion<'BC'>>;
type testTesta = AllCombinations<'ABC', StringToUnion<'BC'>, 'B'> | AllCombinations<'ABC', StringToUnion<'BC'>, 'C'>;
type testTestB = AllCombinations<'ABC', StringToUnion<'BC'>, 'B'>;
type testTestC = AllCombinations<'ABC', StringToUnion<'BC'>, 'C'>;

type testTest9 = AllCombinations<'BC', 'B'>;

type testTest1 =
  | AllCombinations<'AB', StringToUnion<'AB'>, ''>
  | AllCombinations<'AB', StringToUnion<'AB'>, 'A'>
  | AllCombinations<'AB', StringToUnion<'AB'>, 'B'>;
type testTest7 =
  | AllCombinations<'ABC', StringToUnion<'ABC'>, ''>
  | AllCombinations<'ABC', StringToUnion<'ABC'>, 'A'>
  | AllCombinations<'ABC', StringToUnion<'ABC'>, 'B'>
  | AllCombinations<'ABC', StringToUnion<'ABC'>, 'C'>;
type testTest2 = AllCombinations<'ABC', StringToUnion<'ABC'>, ''>;
type testTest3 = AllCombinations<'ABC', '' | 'A' | 'B' | 'C', 'A'>;
type testTest4 = AllCombinations<'ABC', StringToUnion<'ABC'>, 'B'>;
type testTest5 = AllCombinations<'ABC', StringToUnion<'ABC'>, 'C'>;
type testTest6 =
  | ''
  | 'A'
  | 'B'
  | 'C'
  | `${'A'}${

        | AllCombinations<'ABC', 'BC'>
        | AllCombinations<'ABC', 'CB'>
        | AllCombinations<'ABC', 'B'>
        | AllCombinations<'ABC', 'C'>
      // | AllCombinations<'ABC', 'AB'>
      // | AllCombinations<'ABC', '' extends 'A' ? never : ''>
      // | AllCombinations<'ABC', 'A' extends 'A' ? never : 'A'>
      // | AllCombinations<'ABC', 'B' extends 'A' ? never : 'B'>
      // | AllCombinations<'ABC', 'C' extends 'A' ? never : 'C'>
    }`;

// type testTest8<T extends string,U extends string ,P extends string = U> = P extends any ?  `${T}${testTest8<T,>}`: never
// type testTest9 =  testTest8<'A','B'|'C'|'D' extends P ? never: 'x','B'|'C'|'D'>

type compute = 'A' | 'B' | ('Ax' | 'AxB' | 'Bx' | 'BxA');
type testAllCombination = AllCombinations<'AB', 'B'>;
type testAllCombination7 = AllCombinations<'ABC'>;
type testAllCombination8 = AllCombinations<'A'>;
type testAllCombination9 = AllCombinations<'B'>;
type testAllCombinations = AllCombinations<'AB'>;
type testAllCombination1 = AllCombinations<'ABC', never>;
type testAllCombinationass = `${''}${never | 'A' | 'B'}`;
type testAllCombinationass23 = `${'A'}${'' | 'B'}`;
type testAasdasd = AllCombinations<'ABC', 'A'>;
type testAasdasddd = AllCombinations<'ABC', ''>;
type tedasddd = `${'A' | 'B' | ''}${'A'}`;

//思路：
//infer递归

type AllCombinations_A = AllCombinations<'A'>;
// should be '' | 'A'
type AllCombinations_AB = AllCombinations<'AB'>;
// should be '' | 'A' | 'B' | 'AB' |  'BA'
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
