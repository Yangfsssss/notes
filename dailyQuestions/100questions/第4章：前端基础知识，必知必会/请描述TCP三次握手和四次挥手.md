握手是连接，挥手是告别（断开）。

建立TCP连接
    先建立连接（确保双方都有收发消息的能力）。
    再传输内容（如发送一个get请求）。
    网络连接是TCP协议，传输内容是HTTP协议。

三次握手-建立连接
    1，Client发包，Server接收。Server：有Client要找我。
    2，Server发包，Client接收。Client：Server已经收到信息了。
    3，Client发包，Server接收。Server：Client要准备发送了。

四次挥手-关闭连接
    1，Client发包，Server接收。Server：Client已请求结束。
    2，Server发包，Client接收。Client：Server已收到，我等待它关闭。
    3，Server发包，Client接收。Client：Server此时可以关闭连接了
        （从等待关闭到关闭，中间可能还有一些零散的请求和数据，但不需要关心细节）。
    4，Client发包，Server接收。Server：可以关闭了（然后关闭连接）。