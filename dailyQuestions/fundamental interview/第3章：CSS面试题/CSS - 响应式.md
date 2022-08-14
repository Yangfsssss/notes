rem是什么？
    rem是一个长度单位：
        px，绝对长度单位，最常用；
        em，相对长度单位，相对于父元素，不常用；
        rem，相对长度单位，相对于根元素，常用于响应式布局；

响应式布局的常见方案：
    media-query，根据不同的屏幕宽度设置根元素font-size；
    rem，基于根元素的相对单位；

vw/vh：
    rem的弊端：
        “阶梯性”
    网页视口尺寸：
        window.screen.height - 屏幕高度；
        window.innerHeight - 网页视口高度；
        document.body.clientHeight - body高度；

        100vh = window.innerHeight；
        100vw =  window.innerWidth；

