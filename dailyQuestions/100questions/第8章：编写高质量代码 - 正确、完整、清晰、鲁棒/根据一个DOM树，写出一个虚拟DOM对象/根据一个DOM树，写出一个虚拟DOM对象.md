将以下 DOM 结构转换为 vnode：
```html
<div id="div1" style="border: 1px solid #ccc; padding: 10px;">
  <p>
    一行文字
    <a href="xxx.html" target="_blank">
      链接
    </a>
  </p>

  <img src="xxx.png" alt="图片" class="image" />

  <button click="clickHandler">点击</button>
</div>;
```

```js
const vnode = {
  tag: 'div',
  props: {
    id: 'div1',
    style: {
      border: '1px solid #ccc',
      padding: '10px',
    },
  },
  children: [
    {
      tag: 'p',
      props: {},
      children: [
        '一行文字',
        {
          tag: 'a',
          props: {
            href: 'xxx.html',
            target: '_blank',
          },
          children: ['链接'],
        },
      ],
    },
    {
      tag: 'img',
      props: {
        src: 'xxx.png',
        alt: '图片',
        className: 'image',
      },
    },
    {
      tag: 'button',
      props: {
        events: {
          click: 'clickHandler',
        },
      },
      children: ['点击'],
    },
  ],
};
```


答案：
    vdom就是用JS对象的形式来表示DOM结构，vnode即对应着DOM结构的一个node节点。

注意事项：
    vdom结构没有固定的标准，例如tag可以改为name，data可以改为props。只要能合理使用JS数据表达DOM即可。
    style和event要以对象的形式，更易读，更易扩展。
    class是ES内置关键字，要改为className。其他的还有如for改为htmlFor。