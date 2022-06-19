type FindLastOne<T extends string> = T extends `${infer U}${infer V}` ? (V extends '' ? U : FindLastOne<V>) : T;

type EndsWith<T extends string, U extends string> = U extends ''
  ? true
  : FindLastOne<U> extends FindLastOne<T>
  ? EndsWith<Replace<T, FindLastOne<T>, ''>, Replace<U, FindLastOne<U>, ''>>
  : false;

// type EndsWith<T extends string, U extends string> = T extends `${infer Q}${U}` ? true : false;

//在字符串字面量类型中，
//将某个字符替换为''（空字符串）可以看做是去除该字符。

//思路：
//找到两个泛型的末尾，对比。
//如果符合，则去掉末尾，递归
//直到不符合或U为空

//思路2:
//结构化类型：
//如果T以U结尾，则T一定 extends `${Front}${U}`。

type testEndsWith = Replace<'abc', 'c', ''>;
type testEndsWith1 = Replace<'abc', 'b', ''>;

type EndsWithA = EndsWith<'abc', 'bc'>; // expected to be false
type EndsWithB = EndsWith<'abc', 'abc'>; // expected to be true
type EndsWithC = EndsWith<'abc', 'd'>; // expected to be false
