// 如何创建一个npm包：
// 1，编写好文件打包 ： 修改package.json中最终的"main":路径
// 2，执行 npm adduser (需要先在npn注册)
// 3，npm publish


const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        // 假如是一个npm的开源包，配置这个支持es规范，commonJs规范，requireJs规范的引入方式
        libraryTarget: 'umd',
        // 这样写可以直接引入<script src='./library'></script> 这样可以全局使用library这个变量
        library: 'library'
    }
};
