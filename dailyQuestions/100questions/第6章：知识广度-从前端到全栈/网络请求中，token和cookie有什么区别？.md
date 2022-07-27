cookie：
    HTTP无状态，每次请求都要带cookie，以帮助识别身份。
    服务端也可以向客户端set-cookie，cookie大小限制4kb。
    默认有跨域限制：不可跨域共享、传递cookie。（可以解决）

cookie本地存储：
    HTML5之前cookie常用于本地存储。
    HTML5之后推荐使用localStorage和sessionStorage。

现代浏览器开始禁止第三方cookie：
    和跨域限制不同。这里是：禁止网页引入第三方JS设置cookie。
    打击第三方广告，保护用户隐私。
    新增属性SameSite:Strict/Lax/None，值可自己选择。

cookie和session：
    cookie用于登陆验证，存储用户标识（如userId）。
    session在服务端，存储用户详细信息，和cookie一一对应。
    cookie + session是常见的登录验证的解决方案。

token vs cookie：
    cookie是HTTP规范，而token是自定义传递。
    cookie会默认被浏览器存储，而token需自己存储。
    token默认没有跨域限制。
    总结：
        cookie：HTTP标准；跨域限制；配合session使用。
        token：无标准；无跨域限制；用于JWT。

划重点：
    cookie的知识点很多，对于HTTP也很重要。
    session存在的价值。
    token和cookie要对比理解，否则容易混淆。

JWT（JSON Web Token）：
    将cookie和session结合使用，实现登录验证。
    （一个加密的包含cookie + session的字符串）

连环问：Session和JWT哪个更好？
    Session优点：
        原理简单，易于学习。
        用户信息存储在服务端，可快速封禁某个用户。
    Session缺点：
        占用服务端内存，硬件成本高。
        多进程，多服务器时，不好同步---需使用第三方缓存，如redis。
        默认有跨域限制。

    JWT优点：
        不占用服务端内存。
        多进程，多服务器不受影响。
        没有跨域限制。
    JWT缺点：
        用户信息存储在客户端，无法快速封禁某用户。
        万一服务端密钥被泄漏，则用户信息全部丢失。
        token体积一般大于cookie，会增加请求的数据量。

答案：
    如有严格管理用户信息的需求（保密、快速封禁）推荐Session。
    如没有特殊要求，则使用JWT（如创业初期的网站）。

连环问：如何实现SSO单点登录？
    基于cookie：
        cookie默认跨域不共享，但有些情况下可设置为共享。
        主域名相同，如www.baidu.com/image.baidu.com
        设置cookie domain为主域名，即可共享cookie。
    SSO：
        主域名完全不同，则cookie无法共享。
        需要使用一个第三方的服务来分发ticket。
        （OAuth2.0）

  答案：
    主域名相同，则可共享cookie。
    主域名不同，则需使用SSO。 


