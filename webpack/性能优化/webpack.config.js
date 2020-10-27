// 1，更新node,npm,yarn
// 2，尽可能少的模块上使用loader （比如在rules里面使用include或者exclude）
// 3，尽可能少使用plugin
// 4，resolve参数配置
// 5，使用DllPlugin提高打包速度
// 6，控制包文件大小
// 7，合理使用sourceMap
// 8，开发环境无用插件剔除


const path = require('path');
module.exports = {
    resolve: {
        // 当引入一个文件的时候，默认会引入js或者jsx的文件 比如写法是file/child，那么会找以child.js或者child.jsx结尾的东西
        extensions: ['.js', '.jsx'],
        // 比如写法是file/child 就是我们常写的import直接到文件夹的index 是引入的child文件夹下的index.js或者index.jsx
        mainFiles: ['index'],
        // 别名
        alias: {
            @: path.resolve(__dirname, '../src')
        }
    }
};
