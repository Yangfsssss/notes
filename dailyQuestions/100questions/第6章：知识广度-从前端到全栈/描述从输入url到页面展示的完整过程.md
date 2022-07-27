步骤：
    网络请求；
    解析；
    渲染；

网络请求：
    DNS查询（得到IP），建立TCP连接（三次握手）。
    浏览器发起HTTP请求。
    收到请求响应，得到HTTP源代码。

    继续请求静态资源：
        解析HTML过程中，遇到静态资源还会继续发起网络请求。
        JS CSS 图片 视频等。
        注意：静态资源可能有强缓存，此时不必请求。

解析：字符串 ---> 结构化数据
    HTML构建DOM树。
    CSS构建CSSOM树（style tree）。
    两者结合，形成render tree。

    解析过程很复杂：
        CSS可能来自<style><link>。
        JS可能内嵌或外链，还有defer、async逻辑。
        img可能内嵌（base64），可能外链。

    优化解析：
        CSS放在<head>中，不要异步加载CSS。
        JS放在<body>最下面（或合理使用defer async）。
        <img>提前定义width、height。

  渲染：Render Tree绘制到页面
      计算各个DOM的尺寸、定位，最后绘制到页面。
      遇到JS可能会执行（参考defer/async）。
      异步CSS、图片加载，可能会触发重新渲染。

答案：
    网络请求：DNS解析，HTTP请求。
    解析：DOM树，CSSOM树，Render Tree。
    渲染：计算、绘制，同时执行JS。

划重点：
    现代浏览器的渲染机制非常复杂，不要纠细节。
    要深入理解“字符串 ---> 结构化数据”这一步。
    能画出那张流程图。

连环问：重绘repaint和重排reflow有什么区别？
    动态网页，随时都会重绘、重排。
        网页动画。
        Modal Dialog弹窗。
        增加/删除一个元素，显示/隐藏一个元素。

    重绘：
        元素外观改变，如颜色、背景色。
        但元素的尺寸、定位不变，不会影响其他元素的位置。
    
    重排：
        重新计算尺寸和布局，可能会影响其他元素的位置。
        如元素高度增加，可能会使相邻元素位置下移。

    区别：
        重排比重绘影响更大，消耗也更大。
        所以，要尽量避免无意义的重排。

    减少重排的方法：
        集中修改样式，或直接切换css class。
        修改之前先设置display:none，脱离文档流。
        使用BFC特性，不影响其他元素位置。

        频繁触发（resize scroll）使用节流和防抖。
        使用createDocumentFragment批量操作DOM。
        优化动画，使用CSS3和requestAnimationFrame。

扩展：BFC
    Block Format Context块级格式上下文。
    内部的元素无论如何改动，都不会影响其他元素的位置。

    触发BFC的条件：
        根结点：<html>;
        float:left/right;
        overflow:auto/scroll/hidden;

        display:inline-block/table/table-row/table-cell;
        display:flex/grid;的直接子元素。
        position:absolute/fixed;
