type Reverse<T extends readonly unknown[]> = T extends [infer U, ...infer V]
  ? [...Reverse<V>,U]
  : T


//infer递归

type ReverseA = Reverse<['a', 'b']> // ['b', 'a']
type ReverseB = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']