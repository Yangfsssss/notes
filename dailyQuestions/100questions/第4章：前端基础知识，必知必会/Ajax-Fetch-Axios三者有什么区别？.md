三者都用于网络请求，但是不同维度。

Ajax（Asynchronous JavaScript and XML），一种技术统称。
  可用XMLHttpRequest或Fetch来实现。
Fetch，一个具体的API。
  浏览器原生API，用于网络请求。
  和XMLHttpRequest一个级别。
  Fetch语法更加简洁、易用，支持Promise。
  XMLHttpRequest的升级版。
Axios，一个第三方库。
  最常用的网络请求库。
  内部可用XMLHttpRequest和Fetch来实现。

库和API的区别：
  库有很多个，但API只有固定的几个。
  库由API来实现。

实现一个Ajax：
new-open-onReady-send 四部曲
```js
function ajaxByXMLHttpRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  };
  xhr.send(null);
}

function ajaxByFetch(url, callback) {
  fetch(url).then((response) => response.json()).then((response) => callback(response));
}
```