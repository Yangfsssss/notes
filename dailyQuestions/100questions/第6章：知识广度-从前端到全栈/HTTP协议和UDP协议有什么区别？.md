网络协议：
    HTTP协议在应用层。
    TCP、UDP协议在传输层。
    严格来说，应该拿TCP和UDP进行比较。

TCP协议：
    有连接（三次握手）。
    有断开（四次挥手）。
    稳定传输。
  
UDP协议：
    无连接，无断开。
    不稳定传输，但效率高。
    适用于视频会议、语音通话。

答案：
    HTTP是应用层，TCP、UDP是传输层。
    TCP有连接，有断开，稳定传输。
    UDP无连接，无断开，不稳定传输，但效率高。

连环问：HTTP协议1.0/1.1/2.0有什么区别？
    1.0：
    最基础的HTTP协议。
    支持基本的GET、POST方法。
    1.1：
    缓存策略、cache-control、E-tag等。
    支持长连接：Connection: keep-alive，一次TCP连接多次请求。
    断点续传，状态码206。
    支持新的方法PUT、DELETE等，可用于Restful风格的API。
    2.0：
    可压缩header，减少体积。
    多路复用，一次TCP连接可以支持多个HTTP并行请求。
    服务端推送。