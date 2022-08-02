const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ production }) => ({
    entry: './src/index.tsx',
    mode: production ? 'production' : 'development',
    output: {
        clean: true,
        path: production ? path.resolve(__dirname, 'docs') : undefined,
        filename: production ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
    },
    target: 'web',
    devServer: {
        port: '3000',
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        dot: true,
                        ignore: ['**.html'],
                    },
                },
            ],
        }),
    ],
});
