babel：
    前端开发环境必备工具；
    同webpack，需要了解基本的配置和使用；
    面试考察概率不高，但要求必回；

环境搭建 & 基本配置：
    环境搭建：
    .babelrc配置：
    presets 和 plugins：
          "presets": [
                //  基础预配置
                ["@babel/preset-env", { 
                  // 按需引入
                  "useBuiltIns": "usage",
                  "corejs": 3,
                   }], 
                // react 配置
                "@babel/preset-react", 
                // TypeScript 配置
                "@babel/preset-typescript"
            ]  

babel-polyfill：
    什么是polyfill？
    core-js和regenerator；
      core-js：核心polyfill的合集；
      regenerator：generator的polyfill；
    babel-polyfill是这两者的集合；
    babel 7.4 之后弃用了babel-polyfill；
    推荐直接使用core-js和regenerator；
    但不影响面试会考察它；

    babel-polyfill的按需引入：
        babel-polyfill文件较大；
        只有一部分功能，无需全部引入；
        配置按需引入；

babel-runtime；
    babel-polyfill的问题：
        会污染全局环境：
            window.Promise = ...；
            Array.prototype.includes = ...；
        如果做一个独立的web系统，则无碍；
        如果做一个第三方lib，则会有问题；
    babel-runtime用来解决这个问题：
        // package.json
        "dependencies": {
            "@babel/runtime": "^7.17.2",
        },
          "devDependencies": {
            "@babel/plugin-transform-runtime": "^7.17.0",
        }, 

        // .babelrc
          "plugins": [
              ["@babel/plugin-transform-runtime",
              {
               "absoluteRuntime": false,
               "corejs": 3,
               "helpers": true,
               "regenerator": true,
              "useESModules": false
              }
          ],
        ],

总结：
    环境搭建 & 基本配置；
    babel-polyfill；
    babel-runtime；