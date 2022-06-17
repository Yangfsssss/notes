type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

//T是什么：一个「接口」，或者声明了「对象类型」的「类型别名」。
//「接口」是什么：An interface declaration is another way to name an object type.(https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)
//声明一个「对象类型」的另一种方法。
//「类型别名」可以声明「对象类型」，也可以声明「其他类型」或「其他类型（与对象）的联合类型」。
//为什么T不能是「其他类型」或者「其他类型（与对象）的联合类型」：
//Pick的作用是从一个「对象类型」中提取指定的若干个key及其类型，返回其组成的新的「对象类型」。
//「key」是「对象类型」特有的结构*，「其他类型」与「其他类型（与对象）的联合类型」中不存在「key」。

//K是什么：一个「字符串字面量类型」或「字符串字面量的联合类型」。
//使用「in」运算符可以遍历取得「字符串字面量类型」或「字符串字面量的联合类型」对应的字符串值**，即「key」。
//然后将T中对应「key」的类型取出。

//思路：
//1，首先限制由K取得的「key」的集合为T的「key」的子集。（使用keyof取得T的「key」的集合）
//2，使用[P in K]代表由遍历K取得的「key」，使用T[P]在T中取出对应的类型。

//*元组和数组类型可以看作是另一种形式的「对象类型」。r
//**在js中，对象的key只会是字符串或者symbol，但ts中对象类型的「key」不属于这一范畴。
//to be continued...

interface T {
  key1: string;
  key2: number;
  123: string;
  // [Symbol('123')]: string;
}
type T1 = {
  key3: boolean;
  key4: symbol;
};
type T2 = 'key5' | 'key6';
type T3 = 'key1';
type T4 = {
  key1: string;
};
type T5 = { key3: boolean } & { key4: symbol };
type T6 = { key7: BigInt } | 'BigInt';
type T7 = {
  [K in T2]: string;
};

const keys: any = {
  key3: false,
  key4: Symbol(),
};

type E = MyPick<T, T3>;
