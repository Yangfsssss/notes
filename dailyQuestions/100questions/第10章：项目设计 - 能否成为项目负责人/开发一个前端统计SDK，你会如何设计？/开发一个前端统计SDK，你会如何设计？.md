前端统计的范围：
    访问量PV；
    自定义事件（用户在页面上的一切行为）；
    性能，错误；

划重点：
    统计的范围；
    发送数据使用<img>；
    报错统计要结合Vue React报错；

连环问：sourcemap有什么作用？如何配置？
    sourcemap的作用：
        JS上线时要压缩，混淆；
        线上的JS报错信息，将无法识别行，列；
        sourcemap即可解决这个问题；
        阮一峰 sourcemap；
        npm:source-map；

    webpack通过devtool配置sourcemap：
        eval - JS在eval(...)中，不生成sourcemap；
        source-map - 生成单独的map文件，并在JS最后指定；
        eval-source-map，JS在eval(...)中，sourcemap内嵌；
        inline-source-map - sourcemap内嵌到JS中；
        cheap-source-map - sourcemap中只有行信息，没有列；
        eval-cheap-source-map - 同上，没有独立的map文件；

        reference:/webpack.config.js

    推荐：
        开发环境：
            eval；
            eval-source-map；
            eval-cheap-source-map；
        线上环境：
            source-map；
            无；

    划重点：
        开源项目，也要开源sourcemap；
        非开源项目，不要泄漏sourcemap！！！；
        了解sourcemap作用和配置即可，编码原理不必深究；

