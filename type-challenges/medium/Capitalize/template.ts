// type MyCapitalize<S extends string> = S extends `${infer U}${infer Rest}` ? `${Uppercase<U>}${Rest}`:S

type MyCapitalize<S extends string> = S extends `${infer U}${infer Rest}` 
  ? U extends keyof List 
    ?`${List[U]}${Rest}`
    : `${U}${Rest}`
  :S


type capitalized = MyCapitalize<'hello world'> // expected to be 'Hello world'

interface List  {
  a: 'A'
  b: 'B'
  c: 'C'
  d: 'D'
  e: 'E'
  f: 'F'
  g: 'G'
  h: 'H'
  i: 'I'
  j: 'J'
  k: 'K'
  l: 'L'
  m: 'M'
  n: 'N'
  o: 'O'
  p: 'P'
  q: 'Q'
  r: 'R'
  s: 'S'
  t: 'T'
  u: 'U'
  v: 'V'
  w: 'W'
  x: 'X'
  y: 'Y'
  z: 'Z'
}