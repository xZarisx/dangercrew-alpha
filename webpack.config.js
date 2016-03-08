var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        "dangercrew.alpha": [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery": "jQuery"
    }
};