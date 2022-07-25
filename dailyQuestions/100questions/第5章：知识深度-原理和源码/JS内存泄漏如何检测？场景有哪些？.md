垃圾回收 GC
    回收再也用不到的数据。
    有些数据由于外部引用的原因而不能被回收。
    分清哪些是垃圾，哪些是符合用户预期的常驻内存占用。

垃圾回收的算法
    引用计数（早期浏览器），会有循环引用问题。
    标记清除（现代浏览器），定期从window向下递归遍历所有属性，看能不能得到某个对象，如果得到，保留该属性；反之，删除该属性。

    删除建立了引用，但属性已经无法被获取到的对象。

连环问：闭包是内存泄漏吗？
    不是，内存泄漏是非预期的常驻内存占用的情况。

如何检测内存泄漏？
    检测内存泄漏就是检测内存的变化情况，如果内存是一个持续升高的状态，说明存在内存泄漏。
    内存泄漏的检测方法：
        1. 在浏览器中，可以使用console.log(window.performance.memory.jsHeapSizeLimit)来检测。
        2. 在浏览器中，可以使用console.log(window.performance.memory.usedJSHeapSize)来检测。
        3. 在浏览器中，可以使用console.log(window.performance.memory.totalJSHeapSize)来检测。
        4. 在浏览器中，可以使用console.log(window.performance.memory.jsHeapSize)来检测。
        5. 在浏览器中，可以使用console.log(window.performance.memory.usedHeapSize)来检测。
        6. 在浏览器中，可以使用console.log(window.performance.memory.totalHeapSize)来检测。

前几年前端不大注重内存泄漏，因为不像后端7*24小时运行。
近几年前端功能不断复杂，内存问题也要重点考虑。（互联网软件）

内存泄漏的场景，扩展：WeakMap和WeakSet
    WeakMap和WeakSet中的引用关系不影响垃圾回收。