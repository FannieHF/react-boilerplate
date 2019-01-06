const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        lib: [
            'react',
            'react-dom',
            'react-hot-loader',
            'whatwg-fetch',
        ],
    },
    output: {
        filename: '[name].js',
        library: '[name]',
        path: path.join(__dirname, 'public/dll'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader:  'babel-loader'
                }
            },
        ],
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname, 'public/dll/manifest.json'),
        }),
    ],
};
