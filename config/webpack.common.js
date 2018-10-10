let webpack = require('webpack');
let path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
    entry:{
        'main': ['babel-polyfill','./scripts/main.js','./scripts/polyfill.js']
    },
    context: path.join(process.cwd(), 'app'),
    resolve:{
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'app')
        ],
        alias: {
            'vue':path.resolve(process.cwd(), './node_modules/vue/dist/vue.min.js'),
            'vue-router':path.resolve(process.cwd(), './node_modules/vue-router/dist/vue-router.min.js'),
            'vuex':path.resolve(process.cwd(), './node_modules/vuex/dist/vuex.min.js'),
            'md5':path.resolve(process.cwd(), './node_modules/md5/md5.js'),
            '@':path.resolve(process.cwd(), 'app/scripts')
        },
        extensions: ['.vue','.js','.css']
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|swf)$/,
                use: 'url-loader?limit=10000&name=images/[name].[ext]?[hash]'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader:'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        },'less-loader'],
                    allChunks: true
                })
            },
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                    {
                        loader: 'css-loader',
                        options:{
                            minimize: true //css压缩
                        }
                    }
                    ]
                })
            },
        ]
    },
    performance: {
        hints: false
    },
    optimization:{
        splitChunks:{
            chunks: "all", 
        },
        runtimeChunk:true
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].bundle[hash:7].css'),
        new HtmlWebpackPlugin({ 
            template: './index.html',
            favicon: './favicon.ico',
            filename:'index.html',
            hash:true,//防止缓存
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            chunksSortMode:'dependency'
        })
    ]
}