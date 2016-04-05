// var webpack = require('webpack');
// var path = require('path');

// module.exports = {
//     devtool: 'eval',
//     entry: {
//         "dangercrew.alpha": [
//             'webpack-dev-server/client?http://0.0.0.0:8080',
//             'webpack/hot/only-dev-server',
//             './src/index.js'
//         ]
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].bundle.js'
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         // new WebpackDevServer(webpack(config), {
//         //     hot: true,
//         //     publicPath: config.output.publicPath
//         // }),
//         new webpack.NoErrorsPlugin()
//     ],
//     resolve: {
//         extensions: ['', '.js']
//     },
//     module: {
//         loaders: [
//             { test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
//             { test: /\.scss$/, loaders: ["style", "css", "sass"] }
//         ]
//     },
//     externals: {
//         "react": "React",
//         "react-dom": "ReactDOM",
//         "jquery": "jQuery"
//     }
// };


var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery": "jQuery"
    }
};