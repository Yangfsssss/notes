回顾vdom和diff：
    h函数；
    vnode数据结构；
    patch函数；

```js
const vdom = {
  tag: 'div',
  props: {
    className: 'box',
    id: 'div1',
  },
  children: [
    {
      tag: 'p',
      children: ['hello world'],
    },
    {
      tag: 'ul',
      props: {
        style: {
          'font-size': '20px',
        },
        children: [
          {
            tag: 'li',
            children: 'a',
          },
        ],
      },
    },
  ],
};
```

    diff算法：
        只比较同一层级，不跨级比较；
        tag不相同，则直接删掉重建，不再深度比较；
        tag和key，两者都相同，则认为是相同节点，不再深度比较；

        Vue2.x Vue3.0 React 三者实现vdom细节都不同；
        核心概念和实现思路都一样；
        面试主要考察后者，不用掌握全部细节；
