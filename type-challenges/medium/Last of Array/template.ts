// type Last<T extends readonly any[]> = T extends [...infer Front,infer Last] ? Last : never;

// type Last<T extends readonly any[]> = T extends [infer A,...infer Rest] 
//   ? Rest extends []
//     ? A
//     : Last<Rest>
//   : never;

type Last<T extends readonly any[]> = [any,...T][T['length']];


//
//1，infer推断出最后一个成员类型。
//2，递归。
//3，使用any（或者任意类型）和T组成一个长度为T+1的数组类型，将T放在尾部，使用T['length']作为索引取得原来T的最后一个成员。

type LastArr1 = ['a', 'b', 'c']
type LastArr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1

type roll = [...LastArr1,'d'][LastArr1['length']]

// Array.prototype.unshift