JS与CSS文件打包分离：
    减少单个文件的体积，进而提升浏览器加载速度；
    相互独立修改，互不影响；
    CSS文件放在index.html的顶部，让浏览器优先解析CSS；

面向webpack的本地mock方案：
    webpack-api-mocker；
    webpack-mock-server；
    手写一个mock插件/中间件；

基于YApi的远程mock方案；

前端工程的性能优化：
    如何做性能优化：
        找到影响性能的问题点（如何找？）；
        针对关键问题点制定合理的解决方案；
        全面的回归验证；