import { Equal } from "@type-challenges/utils";

export type MyIncludes<T extends  readonly unknown[], U> = T extends  [infer Q,...infer W]
    ? Equal<Q,U> extends true
      ? true
      : MyIncludes<W,U>
  : false;

  //思路：
  //1，将tuple中每个成员的类型依次与给定类型对比。
  //2，使用infer将tuple解构，得到第一个成员和剩余成员。
  //3，使用Equal工具类型递归对比第一个成员的类型和给定类型。

  //误区：
  //1，使用tuple成员的联合类型对比：
  //联合类型之间可以使用互相extends判断是否相等。
  //但联合类型的成员和单个字面量类型之间无法判断。
  //比如'abc'和string，boolean和false。

  

type isPillarMen = MyIncludes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`

type testIncludes0 = MyIncludes<[{}], { a: 'A' }>
type testIncludes01 = {a:'A'} extends {} ? true : false;
type testIncludes02 = [{}][number]
type testIncludes03 = {a:'A'} extends object ? true : false;


type testIncludes1 = MyIncludes<[boolean, 2, 3, 5, 6, 7], false>

type testIncludes11 = keyof boolean
type testIncludes12 = boolean extends {} ? true : false;
type testIncludes13 = boolean extends object ? true : false;
type testIncludes14 = false extends boolean ? true : false;
type testIncludes15 = string extends object ? true : false;
type testIncludes16 = number extends object ? true : false;
type testIncludes17 = 'a' extends 'a'|'b'|'c' ? true : false;
type testIncludes18 = 'a'|'b'|'c' extends 'a' ? true : false;
type testIncludes19 = boolean extends false ? true : false;
type testIncludes20 = boolean extends never ? true : false;

// Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
// Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
// Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
// Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
// Includes<[1], 1 | 2>, false>>,
// Includes<[1 | 2], 1>, false>>,

function myIncludes(arr:readonly any[],element:unknown){
  if(typeof element === 'object'||typeof element === 'function'){
    return false;
  };

  for(let i=0;i<arr.length;i++){
    if(arr[i]===element){
      return true;
    }
  }

  return false
}

function myIncludes1(list:readonly any[],key:string){
  function _(list:readonly any[],key:string):boolean{
    if(list.length===0){
      return false;
    }

    const [first,...rest] = list;

    if(first === key){
      return true
    }else {
      return _(rest,key)
    }
  }

  _(list,key)
}