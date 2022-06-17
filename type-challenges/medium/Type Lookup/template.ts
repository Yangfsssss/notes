type LookUp<U extends { type: any; [key: string]: any }, T extends U['type']> = U extends { type: T } ? U : never;

interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 3;
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

interface Shark {
  // type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDogType = LookUp<Cat | Dog, 3>; // expected to be `Dog`

type LookUpTest1 = keyof Cat | keyof Dog;
type LookUpTest2 = (Cat | Dog)['type'];
type LookUpTest3 = LookUpTest1;
type LookUpTest4 = Cat[keyof Cat];
type LookUpTest5 = Cat | Dog extends infer Q | infer W ? Q : never;
// type LookUpTest6 = typeof (Cat|Dog)
type LookUpTest7 = Dog extends { type: 'dog' } ? true : false;
