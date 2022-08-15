JS基础知识，规定语法（ECMA262标准）；
JS Web API，网页操作的API（W3C标准）；
前者是后者的基础，两者结合才能真正实际应用；

JS Web API：
    DOM；
    BOM；
    事件绑定；
    ajax；
    存储；

前言：
    vue和React框架应用广泛，封装了DOM操作；
    但DOM操作一直都会是前端工程师的基础、必备知识；
    只会vue而不懂DOM操作的前端程序员，不会长久；

题目：
    DOM是哪种数据结构？
    DOM操作的常用API；
    attr和property的区别；
    一次性插入多个DOM节点，考虑性能；

知识点：
    DOM的本质：
        从HTML文本中解析出的一棵树；

    DOM节点操作：
        获取DOM节点；
        attribute/property：
            property：修改对象属性，不会体现到html结构中；
            attribute：修改html属性，会改变html结构；
            两者都有可能引起DOM重新渲染；
            尽量用property；
            
    DOM结构操作：
        新增/插入节点；
            appendChild，插入/移动；

        获取子元素列表，获取父元素：
            node.childNodes/node.parentNode
            nodeType；

        删除子元素：
            removeChild()；

    DOM性能：
        DOM操作非常“昂贵”，避免频繁的DOM操作；
        对DOM查询做缓存；
        将频繁操作改为一次性操作；

        DOM查询做缓存；
        将频繁操作改为一次性操作，document.createDocumentFragment()；

解答：
    1，树；
    2，DOM节点/结构/attr/property操作；
    3，略；
    4，略；