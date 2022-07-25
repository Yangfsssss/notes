由 React Fiber 引起的关注
组件树转换为链表，可分段渲染。
渲染时可以暂停，去执行其他高优先级任务，空闲时再继续渲染。
如何判断空闲？---> requestIdleCallback

树无法分段，但链表可以。

区别：
requestAnimationFrame 每次渲染完都会执行，高优先级。
requestIdleCallback 空闲时才执行，低优先级。

连环问：它们是宏任务还是微任务？
都是宏任务。
需要等待DOM渲染完后才执行。

caniuse.com

```ts
const box = document.createElement('div');
const button = document.createElement('button');
button.innerText = 'click me';
box.appendChild(button);
document.body.appendChild(box);
button.id = 'btn1';


document.getElementById('btn1').addEventListener('click', () => {
  let curWidth = 100;
  const maxWidth = 400;

  function addWidth() {
    curWidth += 3;
    box.style.width = `${curWidth}px`;
    if (curWidth < maxWidth) {
      window.requestAnimationFrame(addWidth);
      window.requestIdleCallback(addWidth);
    }
  }

  addWidth();
});
```
