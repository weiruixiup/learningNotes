const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.export = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
    ],
    mode: 'development',

    optimization: {
        // Tree Shaking 的配置 只能对ES Module起作用 import xxx
        // Tree Shaking （摇树） 假如index.js中引入一个test.js文件，test.js中有a，b两个方法。但是在index.js中只使用了a方法，如果在开发模式下（mode: 'development'）不配置optimization，那么b方法也会被打包。开启下面的配置，并且在package.json中配置"sideEffects":false，那么不会被打包引用。如果在生产模式下（mode: 'production'），webpack会自己处理好，不需要配置optimization与package.json
        usedExports: true,

        // SplitChunksPlugin
        // code splitting 代码分割 与webpack无关
        // 实现代码分割，有助于提升性能
        // 同步代码：只需要配置下面即可
        // 异步代码：无需配置，会自动分割
        splitChunks: {
            // 对同步或者异步进行代码分割 （async，all） 默认一个all就行 默认是async
            chunks: 'all',
            // 大于 30kb才分割
            minSize: 30000,
            // 当一个模块至少被运用多少次才会分割
            minChunks: 1,
            // 同时加载的模块数，最多是5个
            maxAsyncRequests: 5,
            // 入口文件引入的库最多3个文件分割
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            // 如果是同步库打包需要的配置 （与chunks配合使用）
            cacheGroups: {
                vendors: {
                    // 从node_modules去匹配
                    test: /[\\/]node_modules[\\/]/,
                    // 假如如何两个cacheGroups，那么根据这个priority大小决定优先级
                    priority: -10,
                    // 指定对应名字
                    filename: 'vendors.js'
                },
                // 若果同步的chunks不是node_modules下的，就走默认default
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'default.js'
                }
            }
        }
    }

    // chunk是什么 ： 打包出来的每一个js文件就是一个chunk
};

