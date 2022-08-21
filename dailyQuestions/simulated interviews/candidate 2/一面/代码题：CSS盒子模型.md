```css
#box {
  /* width: 200px; */
  /* width: 100%; */
  height: 100px;
  margin: 15px 20px;
  padding: 10px 5px;
  border: 5px solid #ccc;
  /* box-sizing: border-box; */
}
```

计算box的尺寸：
    默认box-sizing:content-box，计算公式为：outfit = width + padding + border；content = width；
            box-sizing:border-box，计算公式为：outfit = width；content = width - padding - border；

将width改为100%，其他不变，会不会出现左右滚动条？
    会，因为box还有margin、padding和border，outfit大于html的宽度；

让box撑满浏览器宽度，但不出现滚动条，怎么办？
    不设置width属性 - CSS流式布局特性 - div自动横向撑满屏幕；
    将box的margin、padding和border设为0；
    将box的box-sizing设为border-box，并将margin设为0；

面试官想知道什么？
    CSS基础知识是否熟练？
    再如：布局，定位，响应式等；
    CSS不会考察太多，但基础题很重要；