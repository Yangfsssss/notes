```js
const vnode = {
  tag: 'div',
  props:{
    className: 'container',
  },
  children:[
    {
      tag:'p',
      props:{
        dataset:{
          name:'p1'
        },
        on:{
          click:[onClick]
        }
      },
      children:[
        'hello',
        {
          tag:'b',
          props:{},
          children:[
            [name]
          ]
        }
        ]
    },
    {
      tag:'img',
      props:{
        src:[imgSrc]
      }
    },
    {
      tag:[MyComponent],
      props:{
        title:[title]
      }
    }
  ]
}
```

补充：
    events单独拿出来；
    children需要有顺序，所以用数组储存；
    组件也是变量；

注意事项：
    写render函数没有统一的标准，能表达出来即可；
    注意JSX中的常量和变量；
    注意JSX中的HTML tag和自定义组件；

面试官想知道什么？
    继续考察框架原理，因为一个题目不够；
    VDOM是框架原理的核心部分，候选人有没有掌握；
    不是直接问，而是通过一个场景来写，避免死记硬背；