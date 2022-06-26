export type Permutation<T, U = T> = [T] extends [never] ? [] : T extends U ? [T, ...Permutation<Exclude<U, T>>] : [];
//Permutation<[]> = []
//Permutation<'C'> = ['C',...Permutation[]] = ['C']
//Permutation<'B'> = ['B',...Permutation[]] = ['B']
//Permutation<'B'|'C> = ['B',...Permutation['C']]|['C',...Permutation['B']] = ['B','C']|['C','B']
//Permutation<'A'|'B'|'C> = ['A',...Permutation['B'|'C']]|['B',...Permutation['A'|'C']]|['C',...Permutation['A'|'B']]
//= ['A','B','C']|['A','C','B']|['B','A','C']|['B','C','A']|['C','A','B']|['C','B','A']

//对象类型取联合类型形式的索引：
// export type Permutation<T extends keyof any> = [T] extends [never]
//   ? []
//   : {
//       [P in T]: [P, ...Permutation<Exclude<T, P>>];
//     }[T];

type resultObj = {
  A: ['A', 'B', 'C'] | ['A', 'C', 'B'];
  B: ['B', 'A', 'C'] | ['B', 'C', 'A'];
  C: ['C', 'A', 'B'] | ['C', 'B', 'A'];
}['A' | 'B' | 'C'];

//思路：
//取出联合类型的成员，然后排列组合。

//取得联合类型的成员的两种方法：
//1，「in」。
//2，extends，利用联合类型的计算规则。

type testPermutation = 'A' extends infer U | infer V ? U : never;
type testPermutation1 = 'A' extends infer U | infer V ? V : never;
type testPermutation2 = 'A' | 'B' extends infer U | infer V ? U : never;
type testPermutation3 = 'A' | 'B' extends infer U | infer V ? V : never;
type testPermutation4 = 'A' | 'B' extends infer U ? U : never;
type testPermutation5 = 'A' | 'B' extends infer U | infer V | infer Z ? Z : never;
type testPermutation6 = 'A' | 'B' extends [infer U, infer V] ? V : never;
type testPermutation7 = 'A' | 'B' extends [...infer U] ? U : never;
type testPermutation8 = 'A' | 'B' | 'C' extends [infer U, infer V, infer Z][number] ? [U, V, Z] : never;
type testPermutation9 = ['A', 'B', 'C'][number] extends 'A' | 'B' | 'C' ? true : false;
type testPermutation10 = ['A', ...(['B', 'C'] | ['C', 'B'])];
type testPermutation11 = Permutation<boolean>;

//「元组类型」与「对象类型」的统一：
type ObjectType = {
  0: string;
  1: number;
  2: boolean;
};

type TupleType = [string, number, boolean];

// {0:string;1:number;2:boolean} extends {0:string;1:number;2:boolean} &{length:number;pop:...;push:...;...}
type TupleAssignObject = TupleType extends ObjectType ? true : false; //元组类型可分配至对象类型
type ObjectAssignTuple = ObjectType extends TupleType ? true : false; //对象类型不可分配至元组类型

type KeyOfTuple = keyof TupleType;
type KeyOfObject = keyof ObjectType;

//0|1|2 extends 0|1|2|'length'|'pop'|'push'|...
type KeyOfTupleAssignKeyOfObject = KeyOfTuple extends KeyOfObject ? true : false; //元组类型的key的联合类型不可分配至对象类型的key的联合类型
type KeyOfObjectAssignKeyOfTuple = KeyOfObject extends KeyOfTuple ? true : false; //对象类型的key的联合类型可分配至元组类型的key的联合类型

//「数组类型」与「对象类型」的统一：
type ObjectType1 = {
  [key: number]: string;
  // 0: string;
  // 1: string;
  // 2: string;
  // 3: string;
  // 4: string;
};

type ArrayType = Array<string>;

type testArrayAssignObject1 = ['9999'] extends { 2580: string } ? true : false;
type testArrayAssignObject2 = ['9999'] extends ArrayType ? true : false;
type testArrayAssignObject3 = { 2580: string } extends ObjectType1 ? true : false;

//string[] extends {[key:number]:string}
type ArrayAssignObject = ArrayType extends ObjectType1 ? true : false; //数组类型可分配至对象类型
type ObjectAssignArray = ObjectType1 extends ArrayType ? true : false; //对象类型不可分配至数组类型

type KeyOfArray = keyof ArrayType;
type KeyOfObject1 = keyof ObjectType1;

//number extends number|'length'|'pop'|'push'|...
type KeyOfArrayAssignKeyOfObject = KeyOfArray extends KeyOfObject1 ? true : false; //数组类型的key的联合类型不可分配至对象类型的key的联合类型
type KeyOfObject1AssignKeyOfArray = KeyOfObject1 extends KeyOfArray ? true : false; //对象类型的key的联合类型可分配至数组类型的key的联合类型

type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
