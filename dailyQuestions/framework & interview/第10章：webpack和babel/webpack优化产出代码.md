webpack性能优化 - 产出代码：
    体积更小；
    合理分包，不重复加载；
    速度更快，内存使用更小；

    小图片base64编码；
    bundle加hash；
    懒加载；
    提取公共代码；
    IgnorePlugin；
    使用CDN加速：
        1，配置打包cdn地址：output['publicPath'] = 'https://cdn.example.com/assets/'；
        2，将打包结果上传至cdn；
        适用于JS、CSS、图片、字体等资源；
    使用 production：
        自动开启代码压缩；
        Vue React 等会自动删掉调试代码（如开发环境的warning）；
        启动Tree-Shaking：
            必须使用 ES6 Module 才能让 Tree Shaking 生效；
            commonjs 就不行；

            ES6 Module 和 Commonjs的区别：
                ES6 Module 静态引入，编译时引入；
                Commonjs 动态引入，执行时引入；
                只有ES6 Module才能静态分析，实现Tree-Shaking；
    Scope Hoisting：
        webpack打包的产物是一些函数，使用Scope Hoisting将这些函数放置在同一个作用域；
        代码体积更小；
        创建函数作用域更少；
        代码可读性更好；