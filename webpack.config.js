let path = require('path')
module.exports = {
    target: 'node',
    // bundle入口
    entry: ['./app.ts'],
    // bundle输出
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}