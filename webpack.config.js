const path = require('path'); //一般加上path，这样后面用的时候，直接path.join()就是当前目录加上自己写的目标目录
var webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        main: ['./src/index.js', 'webpack-hot-middleware/client?reload=true'],
        thirdpart: ['jquery']
    },
    // entry: {
    //     main: './src/index.ts'
    // },
    output: {
        filename: '[name]-[hash:8].js',
        path: path.join(__dirname, 'dist'),
        // publicPath: "/assets/"    //公共目录，不是必须配置的
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: "./"
                })
            },
            {
                test: /\.ts/, use: ['ts-loader']
            },
            {
                test: /\.html/, use: ['html-loader']
            },
            {
                test: /\.png/, use: ['file-loader']
            },
            {
                test: /iview.src.*?js$/, loader: 'babel-loader'
            },
            {
                test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name]-[contenthash:8].css'), // 把css抽离出来，加hash,并发布到对应文件中
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        }) //用来压缩js的，如果不加这个插件，打包生成的js就不会压缩成一行
    ]

    // extentions:{
    //     // 不是必须的。里面可以定义 在引用的时候不用写.js .ts .css后缀
    // },
}

module.exports = config;