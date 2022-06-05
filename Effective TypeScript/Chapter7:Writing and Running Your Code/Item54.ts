/** Item53: 了解如何迭代对象，Know How to Iterate Over Objects */

const _obj = {
  one: 'uno',
  two: 'dos',
  three: 'tres',
};
let k: keyof typeof _obj;
for (k in _obj) {
  const v = _obj[k];
}

//另一个例子：
interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  let k: keyof ABC;
  for (k in abc) {
    const v = abc[k]; //v是string|number，但在下面x的例子中，v可以是Date，实际上，它可以是任何值。
  }
}

const x = { a: 'a', b: 'b', c: 2, d: new Date() };
foo(x); //可以调用，因为x可以分配给ABC，为了允许这种情况的发生，TypeScript给k提供了它唯一能确信的类型，即string。

//在没有类型错误的情况下迭代对象的键和值：
function _foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    console.log(k, v);
    //k:string
    //v:any
    //虽然这些类型可能很难处理，但至少它们是诚实的！
  }
}

//你还应该小心原型链污染的可能性。即使是在你定义了对象字面量的情况下，for-in也会产生额外的键：
// Object.prototype.z = 3;//don't
const __obj = { x: 1, y: 2 };
for (const k in __obj) {
  console.log(k);
}
//x
//y
//z
//你永远不应该把可枚举的属性添加到Object.prototype中。

//可以使用keyof声明或Object.entries来遍历对象的键和值。
//keyof适用于常量，或其他你知道对象不会有额外的键而你想要精确类型的情况。
//Object.entries有更普遍的适用性，尽管键和值的类型更难处理。

//Things to Remember
//当你确切地知道键和值是什么时，使用let k: keyof T;和for-in循环来迭代对象。请注意，你的函数收到的任何作为参数的对象都可能有额外的键。
//使用Object.entries来遍历任何对象的键和值。
