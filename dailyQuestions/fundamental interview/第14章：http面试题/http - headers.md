常见的Request Headers：
    Accept：浏览器可接受的数据格式；
    Accept-Charset：浏览器可接受的字符集，如utf-8；
    Accept-Encoding：浏览器可接收的压缩算法，如gzip；
    Accept-Language：浏览器可接收的语言，如zh-CN；

    Connection: keep-alive：一次TCP连接重复使用；
    Content-type：发送数据的格式，如application/json；
    Cookie：浏览器发送的Cookie；

    Host：请求的主机名；

    User-Agent：浏览器信息；

常见的Response Headers：
    Content-type：返回数据的格式，如application/json；
    Content-Length：返回数据的大小，多少字节；
    Content-Encoding：返回数据的压缩算法，如gzip；

    Set-Cookie：返回的Cookie；

演示；

自定义header；

缓存相关的headers：
    Cache-Control：缓存控制；
    Expires：缓存过期时间；
    Last-Modified：最后修改时间；
    ETag；
    If-Modified-Since；
    If-None-Match；
