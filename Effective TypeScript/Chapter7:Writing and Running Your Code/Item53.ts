/** Item53: 使用ECMAScript特性，而非TypeScript特性，Prefer ECMAScript Features to TypeScript Features */

//枚举：
const enum Flavor {
  VANILLA = 0,
  CHOCOLATE = 1,
  STRAWBERRY = 2,
}

let flavor = Flavor.CHOCOLATE;
flavor = 5; //数字值的枚举，任何数字都可以分配到这个枚举。
Flavor['STRAWBERRY']; // "VANILLA"
// Flavor.STRAWBERRY = 5; // error

enum _Flavor {
  VANILLA = 'vanilla',
  CHOCOLATE = 'chocolate',
  STRAWBERRY = 'strawberry',
}

let _flavor = _Flavor.CHOCOLATE;
// _flavor = 'strawberry'; //error,字符串值的枚举，无法再次分配。

function scoop(flavor: _Flavor) {}

// scoop('vanilla')//error in ts, but works in js
scoop(_Flavor.VANILLA); //ok
//JavaScript和TypeScript用户的这些体验的不一致性是应避免字符串值枚举的原因之一。

//枚举的替代方案--字面量类型的联合
type __Flavor = 'vanilla' | 'chocolate' | 'strawberry';

let __flavor: __Flavor = 'chocolate';
// __flavor = 'mint chip';//error

//它提供了和枚举一样强大的安全性，并且具有更直接地编译成JavaScript的优势。
//它还在你的编辑器中提供了同样强大的自动补全特性。

//参数属性：
class Person {
  //参数和非参数属性的混用会隐藏你的类的设计。
  // first: string;
  // last: string;
  // name:string;
  constructor(public name: string) {}
}
const p = new Person('name');

//如果你的类只由参数属性组成，而没有方法，你可以考虑把它做成interface，并使用对象字面量。
//由于结构类型（item4），两者是可以相互赋值的。
interface _Person {
  name: string;
}

const __p: Person = { name: 'Jed Bartlet' };
const ___p: _Person = { name: 'Jed Bartlet' };
//尽量避免通过混用参数和非参数属性来隐藏你的类的设计。

//命名空间和三斜线导入：
namespace __foo {
  function bar() {}
}
/// <reference path='other.ts'/>
// foo.bar();

//现在，在自己的代码中应该使用ECMAScript 2015风格的模块，参见条款58。

//装饰器：
//装饰器可以用来标注或修改类、方法和属性。
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @logged
  greet() {
    return 'Hello ' + this.greeting;
  }
}

function logged(target: any, name: string, descriptor: PropertyDescriptor) {
  const fn = target[name];
  descriptor.value = function () {
    console.log(`Calling ${name}`);
    return fn.apply(this, arguments);
  };
}

console.log(new Greeter('Dave').greet());
//在被标准化之前，不要使用TypeScript的装饰器。

//Things to Remember
//大体上，你可以删除你的代码中所有的类型来将TypeScript转换成JavaScript。
//枚举、参数属性、三斜线倒入和装饰器是上述规则的历史遗留的例外。
//为了使TypeScript在你的代码库中的角色尽可能保持清晰，我建议避免使用这些特性。
