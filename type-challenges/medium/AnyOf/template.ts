type Falsy = false | 0 | '' | [] | Record<string | number | symbol, never>;

type AnyOf<T extends readonly unknown[]> = T[number] extends Falsy ? false : true;

//规则：
//1 extends {}  ｜ true
//{} extends Record<string | number | symbol, never> ｜ true
//1 extends Record<string | number | symbol, never> ｜ false

//{}在这里是一个假值类型，但真值类型1可以分配到它。
//所以需要一个真值类型1无法分配，但假值类型{}可以分配的类型
//就是Record<string | number | symbol, never>

//思路：
//如果元组成员的联合类型无法 extends Falsy，说明至少有一个真值，返回true。

type testAnyOf = 1 | '' | false | [] | {} extends Falsy ? false : true;
type testAnyOf1 = [1, '', false, [], {}][number] extends 1 | '' | false | [] | {} ? true : false;
type testAnyOf2 = [1, '', false, [], {}][number];
type testAnyOf3 = [1, '', false, [], {}][number] extends Falsy ? true : false;
type testAnyOf4 = 1 | '' | false | [] | {} extends Falsy ? true : false;
type testAnyOf5 = 1 extends Falsy ? true : false;
type testAnyOf6 = {} extends { a: string } ? true : false;
type testAnyOf7 = [][number] extends never ? true : false;
type testAnyOf9 = [][number] extends Record<string | number | symbol, never> ? true : false;
type Remove<T, S> = T extends S ? never : T;
type testAnyOf8 = Remove<[1, '', false, [], {}][number], {}>;
type testAnyOf10 = {} extends Record<string | number | symbol, never> ? true : false;
type testAnyOf11 = 1 extends Record<string | number | symbol, never> ? true : false;
type testAnyOf12 = 1 extends {} ? true : false;

let testAnyOf5: Falsy = false;
let testAnyOf6: 1 = 1;
// testAnyOf5 = 1;

type Sample1 = AnyOf<[1, '', false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be Falsy.
