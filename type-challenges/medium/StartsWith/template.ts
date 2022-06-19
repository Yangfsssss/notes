type StartsWith<T extends string, U extends string> = T extends `${infer Q}${infer W}`
  ? U extends `${infer M}${infer N}`
    ? Q extends M
      ? StartsWith<W, N>
      : false
    : true
  : false;

// type StartsWith<T extends string, U extends string> = T extends `${U}${infer W}` ? true : false;

//思路：
//递归对比，直到无法满足U extends `${infer M}${infer N}`，即U为空时，
//返回true。

//思路2:
//结构化类型：
//如果T以U开头，则T一定 extends `${U}${Rest}`。

type StartsWithA = StartsWith<'abc', 'ac'>; // expected to be false
type StartsWithB = StartsWith<'abc', 'ab'>; // expected to be true
type StartsWithC = StartsWith<'abc', 'abcd'>; // expected to be false
