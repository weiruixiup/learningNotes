const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack');

module.exports = {
    // 入口 可以直接是一个String  entry: './src/index.js', 等价于对象的写法
    entry: {
        main: './src/index.js'
        // 如果是多页应用的引入  切记需要在输出与此对应
        // pageOne: './src/views/pageOne.js',
        // pageTwo: './src/views/pageTwo.js',
        // pageThree: './src/views/pageThree.js'
    },

    // 出口
    output: {
        // 打包后的名字
        // filename: './dist.js', // 如果是单一入口这样写是可以的
        filename: '[name].js', // 如果是多入口
        // __dirname是个变量，指的就是和当前目录路径
        path: path.resolve(__dirname, 'dist')
        // 配置公共的cdn路径 会自动加到前缀
        // publicPath: 'http://cdn.com'
    },

    module: {
        // loader的执行顺序 从下到上 从右到左 eg：先转scss->sass-loader，然后css-loader，最后style-loader。
        rules: [
            // 图片
            {
                test: /\.(jpeg|png|jpg|gif)$/,
                use: {
                    // url-loader 能有 file-loader功能 区别是它转换成base64 直接放入到了js文件 而不会创建像file-loader一样的图片文件
                    // url-loader 优势就是直接放在js里面了 js加载完了图片就出来了 不会发起http请求
                    // url-loader 劣势就是直接放在js里面了 js是图片可能大 那么js文件就大
                    // 选择方式 根据图片的大小来决定 图片大file-loader；图片小url-loader
                    // limit 是url-loader中options的独有属性，类似下面例子 小于200kb才执行 否则执行file-loader
                    // 字体使用file-loader
                    loader: 'url-loader',
                    options: {
                        // name就是原来的名字 hash是对应的hash ext是后缀
                        name: '[name]_[hash].[ext]',
                        // 输出到指定的文件夹
                        outputPath: 'images/',
                        // 小于200kb才执行
                        limit: 204800
                    }
                }
            },
            // 字体
            {
                test: /\.(eot|ttf|svg|woff)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            // 样式
            {
                test: /\.(scss)$/,
                // npm install --save-dev css-loader
                // 处理css 一般都会将 css-loader style-loader混合使用
                // css-loader的作用是处理css之间的关系 比如在css文件中引入某css:@import './index.css'
                // style-loader 作用是将css-loader处理的文件挂载到head里面的style

                // sass-loader npm install sass-loader node-sass --save-dev

                // postcss-loader npm i -D postcss-loader
                // 解决的是类似处理-webkit-兼容的问题 自动加上
                // 在使用postcss-loader时候需要在与webpack.config.js同目录下 新建postcss.config.js
                // module.exports = {
                //     plugins: [require('autoprefixer')] 需要cnpm i autoprefixer --D
                // }

                // 如果要在每个loader中加上配置 可以在数组中写成对象的形式
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // css模块化打包开启 需要注意引入css的语法
                            modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            // babel处理es6
            // npm install babel-loader babel-core babel-preset-env
            // babel-loader只是打开了es6与webpack的通道，转义是babel-core babel-preset-env
            // 这样处理还不能兼容一些函数，对象在低版本下的兼容 需要在index.js中引入 import '@babel/polyfill' (所有的) 所以参见presets的配置
            {
                test: /\.js$/,
                // 除开什么目录的
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    // 这样配置只会打包所用到的es6语法 不会所有的都打包，降低文件大小
                    presets: [['@babel/preset-env',{
                        useBuiltIns:'usage'
                    }]]
                }
            }
            // 新建.babelrc也可以配置
        ]
    },

    // 插件 plugin 可以在webpack运行到某个时刻的时候 帮你做一些事 类似生命周期函数
    plugins: [
        // npm install --save-dev html-webpack-plugin 注意引入与实例
        // 会自动在dist下生存index.html与引入bundle.js(dist.js)
        // 可以接收一个参数template 表示需要生存的模版 比如生成一个有div id='root'的节点 （自动生成的没有任何节点）
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        ),

        // npm install --save-dev clean-webpack-plugin
        // 每次打包的时候 会自动删除原来的dist
        new CleanWebpackPlugin(),

        // HMR插件
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
    ],

    // 如果模式 development 不会压缩代码 一般根据 process.env.NODE_ENV 来动态处理  webpack --mode=production || development
    mode: 'development',

    // 开关sourceMap 在production默认是关闭none的，开启是 source-map。生产环境需要关闭，开发环境可以开启。
    // sourceMap简单说，Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便
    // 在开发环境 建议使用 cheap-module-eval-source-map
    // 在生产环境 建议使用 none
    devtool: 'none',

    // 开发中的服务
    // npm i webpack-dev-server -D 还需要安装 webpack-cli
    devServer: {
        // 作用的具体路径
        contentBase: './dist',
        // 是否自动打开浏览器
        open: true,
        // 设置端口
        port: 8001,
        // 代理 将/api开头替换成http://localhost:3000
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api': ''}
            }
        },

        // HMR：模块热替换，比如解决只是改变样式，不刷新整个页面。
        // 需要引入webpack的内置插件 注意引入的方式（解构体现）
        hot: true
    }
};
