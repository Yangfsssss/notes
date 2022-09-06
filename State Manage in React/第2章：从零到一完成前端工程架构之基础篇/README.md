前端工程基础依赖包：
    babel相关：
        @babel/core：
            将JS代码分析成AST抽象语法树，方便各个插件分析语法并进行相应处理；
        @babel/plugin-transform-runtime：
            babel在转译的过程中可能需要用到help函数，对API的处理可能会引入polyfill。
            默认情况下，babel会定义若干个help，导致最终的产物中含有重复的help。
            而引入polyfill时会直接修改全局变量和原型，造成全局变量和原型的污染。
            这个插件的作用就是将help和polyfill改为从一个统一的地方引入，并且引入的对象与全局对象完全隔离，从而解决以上两个问题；
        @babel/preset-env：
            语法转换：ES+；
        @babel/preset-react：
            语法转换：JSX相关；

    webpack相关：
        webpack；
        webpack-cli；
        webpack-dev-server；
        webpack-merge；
        clean-webpack-plugin；
        html-webpack-plugin；
        open-browser-webpack4-plugin：打包完成后在浏览器中打开页面；

    loader相关：
        babel-loader；
        css-loader；
        style-loader：处理组件中的内连样式；
        sass-loader；
        node-sass；

    react相关：
        react: ^17.0.2；
        react-dom: ^17.0.2；

    eslint相关：
        eslint；
        eslint-config-airbnb：配置模版；
        eslint-plugin-import；
        eslint-plugin-babel；
        eslint-plugin-jsx-a11y；
        eslint-plugin-react；
        eslint-plugin-react-hooks；

