type Trim<S extends string> = S extends `${' ' | '\n' | '\t'}${infer U}` | `${infer U}${' ' | '\n' | '\t'}`
  ? Trim<U>
  : S;

type trimmed = Trim<'  Hello World  '>; // expected to be 'Hello World'

type testTrim1 = Trim<' str'>;
