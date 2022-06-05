/** Item55: 了解DOM的层次结构，Understand the DOM hierarchy*/

//有了TypeScript，DOM元素的层次结构变得更加明显。
//了解从Element和EventTarget中得到的Node有助于你调试类型错误以及决定断言的合适时机。
//因为很多API都是基于DOM的，所以即使你使用的是React或d3这样的框架，这一点也很重要。

//追踪用户拖拽过<div>时的鼠标：
function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  // targetEl.classList.add('dragging');//error

  // const dragStart = [eDown.clientX, eDown.clientY];//error

  const handleUp = (eUp: Event) => {
    // targetEl.classList.remove('dragging');//error
    // targetEl.removeEventListener('mouseup', handleUp);//error
    // const dragEnd = [eUp.clientX, eUp.clientY];//error
    console.log(
      'dx,dy = '
      // [0, 1].map((i) => dragEnd[i] - dragStart[i])
    );
  };

  // targetEl.addEventListener('mouseup', handleUp);//error
}

const div = document.getElementById('surface');
// div.addEventListener('mousedown', handleDrag);//error

//DOM层次结构中的类型
//EventTarget:                      window,XMLHttpRequest
//Node:                                    document,Text,Comment
//Element:                              includes HTMLElements,SVGElements
//HTMLElement:                 <i>,<b>ß
//HTMLButtonElement:    <button>

//TypeScript并不总是能让你获得最具体的类型，特别是在使用document.getElementById()时。
document.getElementsByTagName('p')[0]; // HTMLParagraphElement
document.createElement('button'); // HTMLButtonElement
document.querySelector('div'); // HTMLDivElement
document.getElementById('my-div'); // HTMLElement
//虽然断言通常是不受欢迎的，但在你比TypeScript知道得多的情况下，使用断言就没什么问题。
document.getElementById('my-div') as HTMLDivElement; // HTMLElement

//如果启用了strictNullChecks，你就需要考虑document.getElementById返回null的情况。
//根据这是否会真的发生，你可以添加一个if语句或一个断言。

//除了Node和Element的层次结构外，还有Event的层次结构。
//普通的Event属于最一般的事件类型。更具体的类型包括：
//UIEvent:                  任何类型的用户界面事件
//MouseEvent:          由鼠标触发的事件，如点击
//TouchEvent：        移动设备上的触摸事件
//WheelEvent：        旋转滚轮引发的事件
//KeyBoardEvent：按键

//解决方法：
//TypeScript对DOM的声明广泛使用了上下文，内嵌mousedown处理程序给TypeScript提供了更多信息来工作。
//也可以声明参数类型是更具体的MouseEvent而不是Event。
function addDragHandler(el: HTMLElement) {
  el.addEventListener('mousedown', (eDown) => {
    const dragStart = [eDown.clientX, eDown.clientY];
    const handleUp = (eUp: MouseEvent) => {
      el.classList.remove('dragging');
      el.removeEventListener('mouseup', handleUp);
      const dragEnd = [eUp.clientX, eUp.clientY];
      console.log(
        'dx,dy = ',
        [0, 1].map((i) => dragEnd[i] - dragStart[i])
      );
    };
  });
}

const _div = document.getElementById('surface');
//addDragHandler需要一个不为null的HTMLElement。
//如果你知道这个元素是存在的，你也可以用一个断言来代替。
//这是一个将null值推到边界的例子。
if (_div) {
  addDragHandler(_div);
}

//Things to Remember
//DOM有一个类型层次结构，你在编写JavaScript时通常可以忽略它。但是，这些类型在TypeScript中变得越来越重要。了解它们将有助于你为浏览器编写TypeScript。
//了解Node，Element，HTMLElement和EventTarget，以及Event和MouseEvent的区别。
//要么在你的代码中为DOM元素和Event使用足够具体的类型，要么给TypeScript提供上下文来推断它。
