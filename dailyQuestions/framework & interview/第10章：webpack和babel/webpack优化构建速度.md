webpack性能优化 - 构建速度：
    大厂必考 & 社区热议话题；
    优化打包构建速度 - 开发体验和效率；
    优化产出代码 - 产品性能；

    构建速度：
        优化babel-loader：
            use:['babel-loader?cacheDirectory=true'], 开启缓存；
            include:/exclude:,确定范围；

        IgnorePlugin避免引入无用模块：
            import moment from 'moment';默认会引入所有语言JS代码，代码过大；
            如何只引入中文？
            // 忽略 moment 下的 /locale 目录
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
             })；
             // 手动引入中文语言包；
             import 'moment/locale/zh-cn'; 

        noParse：
            module:{
              //  `react.min.js` 文件已经采用模块化处理过；
              // 忽略对 `react.min.js` 文件的递归解析处理；
              noParse:[ /react\.min\.js$/ ],
            }
        IgnorePlugin vs noParse：
            IgnorePlugin直接不引入，代码中没有；
            noParse引入，但不打包；
        
        happyPack 多进程打包：
            JS单线程，开启多进程打包；
            提高构建速度（特别是多核CPU）；
            use: ['happypack/loader?id=babel']；
            plugins: [
                new HappyPack({
                    id: 'babel',
                    loaders: ['babel-loader?cacheDirectory=true']
                })
            ]；

        ParallelUglifyPlugin：
            webpack内置Uglify工具压缩JS；
            JS单线程，开启多进程压缩更快；
            和 happyPack 同理；
        关于开启多进程：
            项目较大，打包较慢，开启多进程能提高速度；
            项目较小，打包很快，开启多进程会降低速度（进程开销）；
            按需使用；

        自动刷新：
            watch:false；
            watchOptions:{...}；
            开发环境使用devServer，无需配置watch；

        热更新（自动刷新升级版）：
            自动刷新：整个网页全部刷新，速度较慢，状态会丢失；
            热更新：新代码生效，网页不刷新，状态不丢失；
            热更新需要配置，按需使用；
            entry: {
              index :[
                  'webpack-dev-server/client?http://localhost:8080/',
                  'webpack/hot/dev-server',
                  path.join(srcPath, 'index.ts'),
              ]
            }；
            new webpack.HotModuleReplacementPlugin()；
            devServer:{
                hot:true,
            }；
            if (module.hot) {
                module.hot.accept(['./math.ts'], function () {
                const sum2 = sum(10, 20);
                console.log('sum2 in hot', sum2);
              });
            }
            
        DllPlugin 动态链接库插件：
            前端框架Vue/React，体积大，构建慢；
            框架较稳定，不常升级版本；
            同一个版本只构建一次即可，不用每次都重新构建；

            webpack已内置DllPlugin支持；
            DllPlugin - 打包出dll文件；
            DllReferencePlugin - 使用dll文件；
            （使用 addAssetHtmlPlugin 将react.dll.js注入到模版html中）

总结：
    可用于生产环境：
        优化babel-loader（include/exclude）；
        IgnorePlugin；
        noParse；
        happyPack；
        ParallelUglifyPlugin；

    不可用于生产环境：
        自动刷新；
        热更新；
        DllPlugin；

