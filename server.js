var express = require('express');//启动node服务

var app = express();
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var compiler = webpack(webpackConfig);
var devMiddleware = webpackDevMiddleware(compiler, {
    // publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
        colors: true
    }
})
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler, {
    reload: true
}));


app.use('/hello', function(req, res, next){
    res.send("hello");
})

app.listen(3000, function(){

});