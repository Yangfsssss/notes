解释jsonp的原理，为何它不是真正的ajax？
    ajax通过XMLHttpRequest对象实现；
    jsonp通过script标签实现；

    浏览器的同源策略（服务端没有同源策略）和跨域；
    哪些html标签能绕过跨域？
        script/img；
    jsonp的原理：
        1，本地定义响应函数；
        2，通过script的src属性加载jsonp的脚本；



document load 和ready的区别：
    即onload和onDOMContentLoaded的区别；

== 和 === 的不同之处：
    == 会尝试类型转换；
    === 严格相等；
    if(a == null){...} 这一个场景下用==而不是===；
