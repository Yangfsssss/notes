export type TrimRight<S extends string> = S extends `${infer U}${' ' | '\n' | '\t'}` ? TrimRight<U> : S;

//思路：

type Trimed = TrimRight<'   Hello World    '>; // expected to be '   Hello World'
type Trimed1 = TrimRight<'Hello World    '>; // expected to be 'Hello World'
type Trimed2 = TrimRight<'     str     '>;
type Trimed3 = TrimRight<'   foo bar  \n\t '>;
