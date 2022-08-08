/** Item10:避免对象包装类 */
//String，Number，Boolean，Symbol，BigInt
//基本数据类型可以分配给对象包装器，但对象包装器类型不能分配给基础数据类型

export let stringA = '3';
let stringB: String = stringA;
// stringA = stringB; //error:不能将类型“String”分配给类型“string”。“string”是基元，但“String”是包装器对象。如可能首选使用“string”。

let numberA = 3;
let numberB: Number = numberA;
// numberA = numberB; //error:同上

let booleanA = true;
let booleanB: Boolean = booleanA;
// booleanA = booleanB; //error:同上

let symbolA = Symbol();
let symbolB: Symbol = symbolA;
// symbolA = symbolB; //error:同上

let BigIntA = BigInt(3);
let BigIntB: BigInt = BigIntA;
// BigIntA = BigIntB; //error:同上

//Things to Remember:
//• Understand how object wrapper types are used to provide methods on primitive
//values. Avoid instantiating them or using them directly.
//• Avoid TypeScript object wrapper types. Use the primitive types instead: string
//instead of String, number instead of Number, boolean instead of Boolean, symbol
//instead of Symbol, and bigint instead of BigInt.
