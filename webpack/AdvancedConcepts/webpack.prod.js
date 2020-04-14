// 生产环境配置
// 安装webpack-merge
// 合并common配置
// 修改 package.json配置 webpack-dev-server --config webpack.prod.js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
// css文件分割 (用于prod) 可以安装optimize-css-assets-webpack-plugin可以压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const proConfig = {
    mode: 'production',
    devtool: 'none',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        // css文件分割
        rules: [
            // 样式
            {
                test: /\.(scss)$/,
                use: [
                    // 改成特殊的loader
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // css模块化打包开启 需要注意引入css的语法
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // css模块化打包开启 需要注意引入css的语法
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        // contenthash 加入后会缓存没有改变的内容 页面加载速度会提升
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = merge(proConfig, commonConfig);
