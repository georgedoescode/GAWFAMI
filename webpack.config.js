const path = require('path');
HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        './lib/index': './lib/index.js',
        './app/index': './app/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ]
};
