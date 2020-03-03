const HTMLPlugin = require('html-webpack-plugin')

//входная точка приложения
module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        //started
        contentBase: __dirname + '/dist'
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        //для понимания файлов webpack'ом
        extensions: ['.js']
    }
}