/** Item21: 理解类型收缩*/
//类型收缩是类型扩展的反动作，最常见的例子是null检查：
const el = document.getElementById('foo');
if (el) {
  //el:HTMLElement
  el.innerHTML = 'party time'.blink();
} else {
  //el:null
  alert('No element #foo');
}

//其他收缩类型的方法：
//instanceof;
//属性检查;
//内置检查函数，如Array.isArray();
//switch;
//##自定义类型保护 is：
//场景：函数参数是一个联合类型，但函数内部存在一些处理过程，使得函数的返回值一定是联合类型的某个成员，
//此时可以使用自定义类型保护来确保函数返回值的类型。
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Micheal'].map((who) => jackson5.find((n) => n === who)).filter(isDefined);
