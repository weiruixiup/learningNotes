// 开发环境配置
// 安装webpack-merge
// 合并common配置
// 修改 package.json配置 webpack-dev-server --config webpack.dev.js

const {HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
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
    devtool: 'cheap-module-eval-source-map',

    // 开发中的服务
    // npm i webpack-dev-server -D 还需要安装 webpack-cli
    devServer: {
        // 作用的具体路径
        contentBase: './dist',
        // 是否自动打开浏览器
        open: true,
        // 设置端口
        port: 8001,
        // 代理
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api': ''}
            }
        },

        // HMR：模块热替换，比如解决只是改变样式，不刷新整个页面。
        // 需要引入webpack的内置插件 注意引入的方式（解构体现）
        hot: true
    },
    optimization: {
        usedExports: true
    }
};

module.exports = merge(devConfig, commonConfig);
