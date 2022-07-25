for...in是枚举对象及其原型链上可枚举（enumerable:true）的属性，得到key。
for...of是迭代iterable结构的一种方式，得到value。

适用于不同的数据类型。
{}/Map/Set/Generator

可枚举vs可迭代
    for...in用于可枚举数据，如对象、数组、字符串。
    for...of用于可迭代数据，如数组、字符串、Map、Set、Generator。

连环问：for await ...of有什么作用？
    迭代由promise组成的iterable，和Promise.all()类似。
    场景：图片批量上传（并发上传或顺序上传）。
  
