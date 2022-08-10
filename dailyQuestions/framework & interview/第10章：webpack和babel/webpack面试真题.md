前端为何要进行打包和构建？
    代码层面：
        体积更小（Tree-Shaking、压缩、合并），加载更快；
        编译高级语言或语法（TS，ES6，模块化，scss）；
        兼容性和错误检查（Polyfill、postcss、eslint）；

    研发流程方面：
        统一、高效的开发环境；
        统一的构建流程和产出标准；
        继承公司构建规范（提测、上线等）；

module chunk bundle的区别：
    module - 各个源码文件，webpack中一切皆模块；
    chunk - 多模块合并成的，如entry import() splitChunk；
    bundle - 最终的输出文件；

loader 和 plugin 的区别：
    loader 模块转换器，如 less -> css；
    plugin 扩展插件，如 HtmlWebpackPlugin；

常见loader和plugin有哪些？
    https://www.webpackjs.com/loaders；
    https://www.webpackjs.com/plugins；
    把此前示例中的loader和plugin答出来即可；

babel和webpack的区别：
    babel - JS新语法编译工具，不关心模块化；
    webpack - 打包构建工具，是多个loader plugin的集合；

如何产出一个library？
    参考之前的webpack.dll.js；
    output.library；
    output:{
      // lib 的文件名：
      filename: 'library.js',
      // 输出lib到dist目录下：
      path: path.resolve(__dirname, 'dist'),
      // lib的全局变量名：
      library: 'library',
    }

babel-polyfill和babel-runtime的区别：
    babel-polyfill 会污染全局；
    babel-runtime 不会污染全局；
    产出第三方lib要用babel-runtime；

webpack如何实现懒加载？
    import()；
    结合 Vue React 异步组件；
    结合 Vue-router React-router异步加载路由；

为何proxy不能被polyfill？
    如Class可以用function模拟；
    如Promise可以用callback模拟；
    但Proxy的功能用Object.defineProperty()无法模拟；

webpack有哪些常见的性能优化手段？
    优化构建速度 - 可用于生产环境：
        优化babel-loader；
        IgnorePlugin；
        noParse；
        happyPack；
        ParallelUglifyPlugin；
    优化构建速度 - 不可用于生产环境：
        自动更新；
        热更新；
        DllPlugin；
    
    优化产出代码：
        小图片base64编码；
        bundle加hash；
        懒加载；
        提取公共代码；
        使用CDN加速；
        IgnorePlugin；
        使用production；
        ScopeHoisting；

    
