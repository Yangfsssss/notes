回顾bind()应用：
     返回一个新函数，但不执行；
     绑定this和部分参数；
     如果是箭头函数，无法改变this，只能改变参数；
  
  分析：
      返回新函数；
      绑定this；
      同时绑定执行时的参数（apply或者call）；

连环问：手写函数call和apply：
    call和apply的应用：
        bind返回一个新函数（不执行），call和apply会立即执行函数；
        绑定this；
        传入执行参数；

    分析：如何在函数执行时绑定this：
  ```js
        const obj = {
          x:100,
          fn(){
            this.x
          }
        }
  ```
      执行obj.fn()，此时fn内部的this就指向obj；
      可借此来实现函数绑定this；

      划重点：
          想用call实现apply，用apply实现call。这不可取。
          原生call/apply的this如果是值类型，也会被new Object()包装。
          Symbol的作用。