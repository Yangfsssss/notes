type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K;
};

//思路：
//1，遍历取得所有tuple成员的字面量类型组成的字面量联合类型的「key」,将「key」作为字面量类型作为它的类型。

//[K in T[number]]或[K in keyof T]代表遍历，而[key:string]代表索引类型。
//由「in」运算符取得的「key」可以作为「key」（在左边时），也可以作为字面量类型（在右边时）。
//在js中「key」可以是[(表达式)]，而在ts中几乎不支持*，因为类型总是静态的。
//对于对象类型：keyof 可以取得其所有的字符串和数字**形式的「key」，并返回一个由这些「key」组成的字符串/数字字面量联合类型。
//对于数组类型：其所有成员的类型都是一致的。
//对于元组类型：T[number]***可以取得其所有成员的字面量类型，并返回一个由这些类型组成的字面量联合类型。

//*：目前发现只支持字符串和数字的单值表达式。
//**：目前发现对象类型的「key」接受除BigInt之外的所有原始值。但除了Number以外都当作字符串处理。
//***：与对象类型不同，元组类型的「key」是固定从0开始的数字。

type test1 = {
  a: string;
  3: string;
  false: string;
  undefined: string;
  null: string;
  Symbol(ddd: string): string;
};

interface testI {
  a: string;
  3: string;
  false: string;
  undefined: string;
  null: string;
  Symbol(ddd: string): string;
}

type test2 = keyof test1;

const str1: test2 = 3;

type lit = 'lit';

interface Test {
  [3]: string;
  ['go']: string;
  // [4488n]: string;
}

const lit = 'lit';

const testObj: Test = {
  3: 'test1',
  go: 'test2',
};

const testStr: keyof Test = 'go';

// const tuple = ['tesla', 'model 3', 'model X', 'model Y', 3, false, Symbol('2016'), null, undefined, 4488n] as const;
const tuple = ['tesla', 'model 3', 'model X', 'model Y', 3, Symbol('2016')] as const;

type tupleType = typeof tuple;
type k = keyof tupleType;
type K = tupleType[number];
// const k1: tupleType[k] = 'model X';
const k2: k = '1';
// const k3: K = 4488n;

type result = TupleToObject<tupleType>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type readonlyObj = {
  readonly key1: string;
};
type Obj = {
  key1: string;
};

let obj1: readonlyObj = {
  key1: 'tesla',
};
// obj1.key1 = 'byd'
let obj2: Obj = {
  key1: 'byd',
};

obj1 = obj2;
