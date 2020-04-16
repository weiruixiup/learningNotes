const path = require('path');
// 安装ts与ts-loader 直接打包是不行的 需要在新建tsconfig.json （注意路径）
// 在使用ts的时候 安装@types/xxx xxx是包的名字（比如node,jquery等等） 也会让使用依赖的时候遵守ts的规范

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    mode: 'production'
};
