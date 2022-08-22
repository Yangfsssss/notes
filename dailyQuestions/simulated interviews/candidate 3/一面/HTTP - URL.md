URL有哪些组成部分？
    协议：http/https；
    host：www.baidu.com；
    pathname：/news；
    param：?date=20220822；

    补充：
        hash：#120；
        port（一般不显示）：80；

分别对应JS中location什么属性？
    host：window.location.host；
    pathname：window.location.pathname；

    补充：
        协议：window.location.protocol；
        hash：window.location.hash；
        port：window.location.port；
        param：window.location.search；

        URL：window.location.href；

补充：常用协议的默认端口（port）：
    http：80；
    https：443；
    ftp：22；

追问：手写函数getParamValue(key)；
    1，正则；
    2，分割字符串；
    3，URLSearchParams；

面试官想知道什么？
    是否熟悉HTTP基础知识，URL组成；
    是否了解一些高级API，如URLSearchParams；
    HTTP基础知识不熟悉，做不了前端；