export type Join<T extends readonly unknown[], U extends number | string> = 
  T extends [infer Q extends string, ...infer W]
    ? W extends []
      ? Q
      :`${Q}${U}${Join<W,U>}`
   :''


//infer分离依次连接

type Res = Join<['a', 'p', 'p', 'l', 'e'], '-'>; // expected to be 'a-p-p-l-e'
type Res1 = Join<['Hello', 'World'], ' '>; // expected to be 'Hello World'
type Res2 = Join<['2', '2', '2'], 1>; // expected to be '21212'
type Res3 = Join<['o'], 'u'>; // expected to be 'o'
