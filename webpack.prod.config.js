const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =  require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'public');

const getVersion = packageName => {
    const content = fs.readFileSync(`${path.join(__dirname, 'node_modules', packageName, 'package.json')}`, 'utf8');
    return JSON.parse(content).version;
};

module.exports  = {
    mode: 'production',
    entry: {
        app: path.join(src, 'index.js'),
    },
    output: {
        chunkFilename: '[name].[chunkhash:8].js',
        filename: '[name].[hash:8].js',
        path: dist,
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    optimization: {
        nodeEnv: process.argv.mode
    },
    resolve: {
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'webpack-strip-block',
                enforce: 'pre',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:  'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: 'file-loader',
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top',
                            singleton: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'primary-color': '#2e95f9',
                            },
                        },
                    },
                ],
                include: [
                    path.join(__dirname, 'node_modules'),
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: "[name]_[local]_[hash:base64:5]",
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: path.join(src, 'index.ejs'),
            templateParameters: {
                title: 'React Boilerplate',
                version: {
                    react: getVersion('react'),
                    reactDom: getVersion('react-dom'),
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ]
}