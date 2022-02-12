/** Tasks, microtasks, queues and schedules */
//https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

//##Tasks-------------------------------------------------------------------------------------------------------------------------------------
//Tasks are scheduled so the browser can get from its internals into JavaScript/DOM land
//and ensures these actions happen sequentially.
//Between tasks, the browser may render updates.
//Getting from a mouse click to an event callback requires scheduling a task, as does parsing HTML,
//and in the above example, setTimeout.

//=>Tasks are scheduled to ensure actions happen sequentially.
//=>Browser may render updates between tasks.
//=>Executing an DOM event callback and parsing HTML schedules a task.

//##setTimeout-------------------------------------------------------------------------------------------------------------------------------------
//setTimeout waits for a given delay then schedules a new task for its callback.

//=>setTimeout schedules a task.

//##Microtask-------------------------------------------------------------------------------------------------------------------------------------
//Microtasks are usually scheduled for things that should happen straight after the currently executing script,
//such as reacting to a batch of actions, or to make something async without taking the penalty of a whole new task.
//The microtask queue is processed after callbacks as long as no other JavaScript is mid-execution,
//and at the end of each task.
//Any additional microtasks queued during microtasks are added to the end of the queue and also processed.
//Microtasks include mutation observer callbacks, and as in the above example, promise callbacks.

//=>Things happen straight after the currently executing script are scheduled as microtask.
//=>Microtasks are processed:
//1,after callbacks(as long as no other JavaScript is mid-execution).
//2,at the end of each task.
//=>Additional microtasks queued during microtasks are added to the end of the queue and also processed.

//##Promise-------------------------------------------------------------------------------------------------------------------------------------
//Once a promise settles, or if it has already settled, it queues a microtask for its reactionary callbacks.
//This ensures promise callbacks are async even if the promise has already settled.
//So calling .then(yey, nay) against a settled promise immediately queues a microtask.
//This is why promise1 and promise2 are logged after script end,
//as the currently running script must finish before microtasks are handled.
//Promise1 and promise2 are logged before setTimeout, as microtasks always happen before the next task.

//=>A promise  queues a microtask when it settles or it has already settled  for its reactionary callbacks,
//so promise callbacks are async even if the promise has already settled.
//=>Promises should be part of the microtask queue, and for good reason.

//A more complex example:
//Level 1 boss fight
function test() {
  const outer = document.createElement('div');
  outer.innerHTML = 'outer';
  const inner = document.createElement('div');
  inner.id = 'inner';
  inner.innerHTML = 'inner';
  outer.appendChild(inner);
  document.body.appendChild(outer);

  // Let's listen for attribute changes on the
  // outer element
  new MutationObserver(function () {
    console.log('mutate');
  }).observe(outer, {
    attributes: true,
  });

  // Here's a click listener…
  function onClick() {
    console.log('click');

    setTimeout(function () {
      console.log('timeout');
    }, 0);

    Promise.resolve().then(function () {
      console.log('promise');
    });

    outer.setAttribute('data-random', Math.random());
  }

  // …which we'll attach to both elements
  inner.addEventListener('click', onClick);
  outer.addEventListener('click', onClick);

  //UI Interface click:
  //1,queue a task:onClick() --- DOM event callback
  //2,current task stack is empty --- execute next task --- onClick()
  //3,onClick execution:log:'click' --- queue:task('timeout') --- queue:microtask('promise) --- queue:microtask('mutate)
  //4,execution over,no other JavaScript is mid-execution --- execute microtasks
  //5,microtasks execution:log:'promise','mutate'
  //6,task doesn't finish,onClick() bubbles
  //7,repeat 2-5
  //8,task finishes,execute other tasks sequentially --- setTimeout('timeout') --- setTimeout('timeout)
  //9,log:'timeout','timeout'
  //end

  //Additional：冒泡（bubble）和捕获（capture）
  //冒泡：
  //当DOM元素接收到DOM事件时，浏览器检查此元素上是否注册过该事件的冒泡阶段的处理程序，
  //如果是，运行处理程序，然后移动至下一个直接的父元素，重复以上过程，直至<html />元素。

  //捕获：
  //当DOM元素接收到DOM事件时，浏览器检查<html />上是否注册过该事件的捕获阶段的处理程序，
  //如果是，运行处理程序，然后移动至<html />下一级的原始DOM元素的祖先元素，重复以上过程，直至原始DOM元素。

  //当addEventListener(type,listener,options?)的第三个参数值为true时，事件注册在捕获阶段
  //否则事件注册在冒泡阶段

  //当DOM元素接收到DOM事件时，浏览器先冒泡后捕获，完成两个阶段后才算事件处理完成。
  //调用e.stopPropagation()方法可以结束冒泡阶段
}

// test()

//Level 1 boss's angry older brother
function test1() {
  test();
  const innerDiv = document.getElementById('inner');
  innerDiv.click();
}

//Previously, this meant that microtasks ran between listener callbacks, 
//but .click() causes the event to dispatch synchronously, 
//so the script that calls .click() is still in the stack between callbacks. 
//The above rule ensures microtasks don't interrupt JavaScript that's mid-execution.

//=>microtasks can be ran between listener callbacks or after listener callbacks.
//it depends on whether there's javascript is mid-execution.

//##Summery----------------------------------------------------------------------------------------------------------------------------------
//···Tasks execute in order,and the browser may render between them.
//···Microtasks execute in order,and are executed:
//1,after every callback,as long as no other JavaScript is mid-execution.
//2,at the end of each task.