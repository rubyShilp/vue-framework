const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const uglifyjsPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
module.exports = webpackMerge(commonConfig, {
    output:{
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',    
        filename: '[name].bundle[hash:7].js',
        chunkFilename: '[name].bundle[hash:7].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    //压缩js
    optimization: {
        minimizer: [
            new uglifyjsPlugin({
                uglifyOptions: {
                    compress: false
                }
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
});