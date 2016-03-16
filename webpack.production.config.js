var webpack = require('webpack');
var path = require("path");
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');


var config = {
    entry: {
        "dangercrew.alpha": [
            './src/index.js'
        ]
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
        plugins: [
            //new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true
                },
                mangle: true
                //except: ['$', 'exports', 'require']
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
        ],
    resolve: {
        //extensions: ['', '.js'],
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
            //{ test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery": "jQuery"
    }
};


module.exports = config;