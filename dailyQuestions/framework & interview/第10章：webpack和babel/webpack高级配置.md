基本配置只能做demo，不能做线上项目；
面试考察基本配置，只是为了快速判断你是否用过webpack；
以下高级配置，也是通过面试的必要条件；

多入口：
    1，设置多个entry；
    2，设置output[filename]；
    3，设置多个 HtmlWebpackPlugin实例，注意配置chunks；

抽离CSS文件：
    1，拆分，dev环境下用老style-loader；prod环境下用MiniCssExtractPlugin.loader代替；
    2，prod环境下，添加MiniCssExtractPlugin实例抽离css文件（注意文件名使用hash）；
    3，在optimization[minimizer]中添加TerserJSPlugin和CssMinimizerPlugin实例压缩CSS；

抽离公共代码（代码分割）：
    1，在prod环境下，向optimization[splitChunks]中添加{chunks: 'all/async',cacheGroups:{
      [模块名]:{
        name: [模块名]
        priority: -10,
        test: /[\\/]node_modules[\\/]/,
        minSize: 30000,
        minChunks: 1,
      }
    }；
    2，设置HtmlWebpackPlugin实例中的chunks属性以调整各个页面所需的chunks；

异步加载JS（懒加载）：
    使用import();

支持Vue/React：
    React： .babelrc -- >"presets": ["@babel/preset-react"];
    Vue：vue-loader;






    