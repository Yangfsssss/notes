/** Item49: 提供回调中this的类型，Provide a Type for this in Callbacks */

//因为this是JavaScript中的一部分，所以TypeScript会为其建模。
//如果函数在参数中声明了this，那么它必须是第一个参数。
function addKeyListener(element: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) {
  element.addEventListener('keydown', (e) => {
    //this是特殊的参数
    // fn(el,e);

    //TypeScript会强制要求使用正确的this上下文来调用函数
    // fn(e)

    fn.call(element, e);
  });
}

//作为函数的使用者，你可以在回调中引用this，并获得完全的类型安全：
declare let _el: HTMLElement;
addKeyListener(_el, function (e) {
  this.innerHTML;
});

//如果在这里使用一个箭头函数，this就会被覆盖，TypeScript会捕获这个问题：
class Foo {
  registerHandler(el: HTMLElement) {
    addKeyListener(_el, (e) => {
      // this.innerHTML
    });
  }
}

//不要忘记this，如果你在回调中设置了this的值，那么它就是你的API的一部分，就应该在你的类型声明中包含它。

//Things to Remember
//了解this绑定的工作原理
//当this成为你的API的一部分时，应该在回调中为它提供一个类型。
