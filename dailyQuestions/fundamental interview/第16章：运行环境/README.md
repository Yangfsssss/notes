运行环境即浏览器（server端游nodejs）；
下载网页代码，渲染出页面，期间会执行若干JS；
要保证代码在浏览器中稳定且高效；

网页加载过程；
性能/体验优化；
安全；

题目：
    从输入url到渲染出页面的整个过程；
    window.onload和DOMContentLoaded的区别；
        window.onload：
            页面的全部资源加载完才会执行，包括图片、视频等；
        DOMContentLoaded：
            DOM渲染完即可执行，此时图片、视频可能还没有加载完；

知识点：
    加载资源的形式；
        html代码；
        媒体文件，如图片、视频等；
        javascript css；

    加载资源的过程；
        DNS解析：域名 -> IP地址；
        浏览器根据IP地址向服务器发起http请求；
        服务器处理http请求，并返回给浏览器；
        
    渲染页面的过程；
        根据HTML代码生成DOM Tree；
        根据CSS代码生成CSSOM；
        将DOM Tree和CSSOM整合形成Render Tree； 

        根据Render Tree渲染页面；
        遇到<script />则暂停渲染，优先加载并执行JS代码，完成再继续；
        直至把Render Tree渲染完成；