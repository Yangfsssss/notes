Node和Element的区别：
    DOM是一棵树，所有的节点都是Node。
    Node是Element的基类。
    Element是其他HTML元素的基类，如HTMLDivElement。

HTMLCollection是Element的集合。
NodeList是Node的集合。

获取Node和Element的返回结果可能不一样：
    p.children instanceof HTMLCollection
    p.childNodes instanceof NodeList
    Node包含纯文字（空格）和注释，但HTMLCollection不包含。

扩展：
    HTMLCollection和NodeList都是类数组，而不是数组。
    将类数组转换为数组的方法：
```js
    Array.from(ArrayLike)
    Array.prototype.slice.call(ArrayLike)
    [...ArrayLike]
```