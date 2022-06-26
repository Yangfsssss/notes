export type AllCombinations<S extends string, U extends string = StringToUnion<S>, P extends string = U> =
  | U
  | (P extends any ? `${P}${AllCombinations<S, U extends P ? never : U>}` : never);

type testAllCombinations = 'C' extends `${infer U}${infer V}` ? U : never;
type testAllCombinations1 = 'C' extends `${infer U}${infer V}` ? V : never;
type testAllCombinations2 = '' extends `${infer U}` ? U : never;
// type testAllCombinations3 = Combine<'ABC'>;
type testAllCombinations4 = 'ABC' extends `${infer Q}${infer W}${infer Z}` ? Q | W | Z : never;
type testAllCombinations5 = StringToUnion<'ABC'>;
type testAllCombinations6 = StringToUnion<'A'>;
type testAllCombinations7 = StringToUnion<'AB'>;
type testAllCombinations8 = 'A' | 'B' extends `${infer Q}` | `${infer W}` ? `${Q}${W}` : false;
type testAllCombinations9 = StringToUnion<'AB'> extends `${infer Q}` | `${infer W}` ? `${Q}${W}` : false;
type testAllCombinations10 = StringToUnion<'ABC'> extends `${infer Q}` | `${infer W}` | `${infer Z}`
  ? `${Q}${W}${Z}`
  : false;
type testAllCombinations11 = StringToUnion<'ABC'> extends `${infer Q}` ? `${Q}${Q}${Q}` : false;
type testAllCombinations12 = StringToUnion<'AB'> extends `${infer Q}${infer W}` ? `${Q}` : false;

//思路：
//infer递归

type AllCombinations_A = AllCombinations<'A'>;
// should be '' | 'A'
type AllCombinations_AB = AllCombinations<'AB'>;
// should be '' | 'A' | 'B' | 'AB' |  'BA'
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
