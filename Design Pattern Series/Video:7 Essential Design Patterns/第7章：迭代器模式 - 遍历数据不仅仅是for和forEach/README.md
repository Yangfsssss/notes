主要内容：
    概念介绍，解决的问题；
    代码演示和UML类图；
    应用场景 + Generator生成器；

场景：
    有序结构；
        字符串；
        数组；
        NodeList等DOM集合；
        Map；
        Set；
        Arguments；

    Symbol.iterator和迭代器；
        所有有序对象，都内置了Symbol.iterator方法；
        执行该方法会返回迭代器对象；

    迭代器的应用；
        用于for...of；
        解构、扩展操作符、Array.from()；
        用于创建Map和Set；
        用于Promise.all()和Promise.race()；
        用于yield*；

生成器：执行后返回一个迭代器的函数；
    基本使用；
    yield*语法；
    yield遍历DOM树；

学习方法：
    UML类图要结合代码理解；
    设计模式要结合使用场景，否则记不住；
  
  注意事项：
      一开始可能听不懂，坚持一下，后面会豁然开朗；
      简单的for循环不是迭代器；