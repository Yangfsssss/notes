题目：
    手写一个简易的ajax；
    跨域的常用实现方式；

知识点：
    XMLHttpRequest：
        xhr.readyState：
            0 - （未初始化）还没有调用send()方法；
            1 - （载入）一调用send()方法，正在发送请求；
            2 - （载入完成）send()方法执行完成，已经接收到全部响应内容；
            3 - （交互）正在解析响应内容；
            4 - （完成）响应内容解析完成，可以在客户端调用；

    状态码：
        xhr.status：
            2xx - 表示成功处理请求，如200；
            3xx - 表示重定向，浏览器直接跳转，如301，永久重定向/302，单次重定向/304，使用缓存资源；
            4xx - 客户端请求错误，如403/404；
            5xx - 服务器端错误，如500/503；

    跨域：
        同源策略：
            ajax请求时，浏览器要求当前网页和server必须同源（安全）；
            同源：协议、域名、端口，三者必须一致；

        跨域解决方案：
            加载图片/css/js可无视同源策略：
                <img src="跨域的图片地址" />；
                <link href="跨域的css地址" />；
                <script src="跨域的js地址" />；

            <img src="第三方服务地址"/>可用于统计打点，可使用第三方统计服务；
            <link /><script />可使用CDN，CDN一般都是外域；
            <script />可实现JSONP；

            所有的跨域，都必须经过server端允许和配合；
            未经server段允许就实现跨域，说明浏览器有漏洞，危险信号；

            JSONP：
                <script />可绕过跨域限制；
                服务器可以任意动态拼接数据返回，只要符合格式要求；
                所以，<script />就可以获得跨域的数据，只要服务端愿意返回；

            CORS - 服务器设置http header；

工具：
    jQuery；
    fetch；
    axios；

```js
    const xhr = new XMLHttpRequest();

    // xhr.open('GET',url,true);
    xhr.open('POST',url,true);

    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          alert(xhr.responseText);
        }
      }
    };

    // xhr.send();
    xhr.send(JSON.stringify({
      name:'张三',
      age:20
    }));
```

