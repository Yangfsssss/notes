//Equal的实现。
type Equal<X, Y> = (<T>() => T extends X ? 'a' : 'b') extends <T>() => T extends Y ? 'a' : 'b' ? true : false;

type IsNever<T> = Equal<T, never>;

//never无法直接比较，需要借助其他结构将never转换为一个类型。
//元组：
type IsNeverTuple<T> = [T] extends [never] ? true : false;
//数组：
type IsNeverArray<T> = T[] extends never[] ? true : false;
//对象：
type IsNeverObject<T> = { k: T } extends { k: never } ? true : false;
type isNeverRecord<T> = { k: T } extends Record<string, never> ? true : false;

// type isNeverUnion<T> = T | T extends never | never ? true : false;

type testIsNever = IsNever<never>;
type testIsNever1 = Equal<never, never>;

type IsNeverA = IsNever<never>; // expected to be true
type IsNeverB = IsNever<undefined>; // expected to be false
type IsNeverC = IsNever<null>; // expected to be false
type IsNeverD = IsNever<[]>; // expected to be false
type IsNeverE = IsNever<number>; // expected to be false
