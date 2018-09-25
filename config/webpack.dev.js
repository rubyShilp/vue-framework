const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig=require('./webpack.common');
module.exports=webpackMerge(commonConfig,{
    output:{
        path: path.join(process.cwd(), 'dist'),
        publicPath: 'http://127.0.0.1:8086/',    
        filename: '[name].bundle[hash:7].js',
        chunkFilename: '[id].chunk[hash:7].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devServer:{
        contentBase:path.join(process.cwd(), 'dist'),
        host:'127.0.0.1',
        hot: true,
        historyApiFallback: true,
        quiet: false,
        noInfo: false,
        stats: {
            // Config for minimal console.log mess.
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        },
        //代理访问后台地址
        proxy:[
            {
                context:['/user'],
                target:'http://172.17.177.60:8084/',
                changeOrigin:true,
                secure:false
            }
        ],
    }
})