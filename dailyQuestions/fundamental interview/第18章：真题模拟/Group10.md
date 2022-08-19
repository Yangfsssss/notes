如何捕获JS程序中的异常？
    1，try...catch...finally...：手动捕获异常；
    2，window.onerror：自动捕获异常；
        对于跨域的js，如CDN的，不会有详细的报错信息；
        对于压缩的js，还要配合sourceMap反查到未压缩代码的行、列；

什么是JSON？
    json是一种数据格式，本质是一段字符串；
    json格式和JS对象结构一致，对JS语言更友好；
    window.JSON是一个全局对象：JSON.stringify()/JSON.parse()；

获取当前页面url参数：
    传统方式：查找location.search；
```js
    function query(name){
      const search = location.search.substr(1);
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const result = search.match(reg);
      if(res === null) return null;

      return res[2];
    }
```

    新API：URLSearchParams；
        注意浏览器兼容性问题；
```js
    function query(name){
      const search = new URLSearchParams(location.search);
      return search.get(name);
    }
```