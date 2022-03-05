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
//##自定义类型保护：
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Micheal'].map((who) => jackson5.find((n) => n === who)).filter(isDefined);
