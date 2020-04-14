// 公用配置

// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 设置环境变量是production 通过package.json里面 webpack --env.production
module.exports = {
    entry: './src/index.js',

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
                // 处理css 一般都会将 css-loader style -loader混合使用
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
                    presets: [['@babel/preset-env', {
                        useBuiltIns: 'usage'
                    }]]
                }
            }
            // 新建.babelrc也可以配置
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ]

};
