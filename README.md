#webpack
webpack 1.x
http://webpack.github.io/docs/

---->
webpack 2.x
https://doc.webpack-china.org/concepts/

1.x和2.x区别：
2.x版本多了一些plugin,loader ---->举例
webpack配置的写法上有更新，比如loaders的写法.
从1.x版本到2.x版本的webpack配置文件的更新：
https://doc.webpack-china.org/guides/migrating/

#webpack四大核心

entry
output
plugin
loaders(webpack 2.x,把module.loaders，改为module.rules)

#使用webpack
需要下载webpack
下载方式：
npm install webpack -g 全局,会生成package.json
npm install webpack --save-dev 会加到本项目开发中参数

安装的时候可以用cnpm，也可以直接用nrm切换安装源。但是要先安装nrm
npm config list
npm install -g nrm
nrm ls
nrm use taobao
npm config list
查看npm配置就可以看到现在用的是哪个


#demo:

简单demo从hello world开始：
1.新建webpack.config.js的webpack的配置文件
2.新建index.html。新建index.js，并在webpack.config.js中把entry配置为index.js(index.ts同理)
3.index.js中引入依赖，写上要执行的方法
4.编译命令 webpack --config webpack.config.js
也可直接使用"webpack"命令。
webpack 提供了 Node.js API，可以在 Node.js 运行时下直接使用。
demo核心代码：
<pre><code>
const path = require('path'); 
var webpack = require("webpack");
const config = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name]-[hash:8].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html/, use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/index.html'
        })
    ]
}
module.exports = config;

</code>
</pre>

#用express启node服务(配置在server.js中)：

var express = require('express');//启动node服务
var app = express();
app.use('/hello', function(req, res, next){
    res.send("hello");
})
app.listen(3000, function(){

});
启动命令：node server.js

#gulp demo

npm install --global gulp
npm install --save-dev gulp
全局安装了gulp，项目也安装了gulp。全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能。
npm init  //可以自动生成package.json

配置hello任务gulp.task
gulp hello 运行hello任务

npm install gulp-sass --save-dev  安装gulp-sass插件
配置sass任务
gulp sass    运行sass任务

demo代码：
<pre><code>
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
  // 将你的默认的任务代码放在这
    console.log('hello world!');
});
gulp.task('sass',function(){
    return gulp.src('src/main/webapp/static/styles/scss/apply.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/main/webapp/static/styles/css'))
});</code>
</pre>
             
#gulp VS webpack

1. Gulp侧重于前端开发的 整个过程 的控制管理（像是流水线），我们可以通过给gulp配置不通的task（通过Gulp中的gulp.task()方法配置，比如启动server、sass/less预编译、文件的合并压缩等等）来让gulp实现不同的功能，从而构建整个前端开发流程。

2. Webpack有人也称之为 模块打包机 ，由此也可以看出Webpack更侧重于模块打包，当然我们可以把开发中的所有资源（图片、js文件、css文件等）都可以看成模块，最初Webpack本身就是为前端JS代码打包而设计的，后来被扩展到其他资源的打包处理。Webpack是通过loader（加载器）和plugins（插件）对资源进行处理的。


3. 另外我们知道Gulp是对整个过程进行控制，所以在其配置文件（gulpfile.js）中配置的每一个task对项目中 该task配置路径下所有的资源 都可以管理。比如，对sass文件进行预编译的task可以对其配置路径下的所有sass文件进行预编译处理：
<pre><code>
gulp.task('sass',function(){
    gulp.src('src/styles/*.scss')
       .pipe(sass().on('error',sass.logError))
       .pipe(gulp.dest('./build/prd/styles/'));//编译后的输出路径
});</code>
</pre>
上面这个task可以对 'src/styles/*.scss' 目录下的所有以 .scss 结尾的文件进行预处理。


4. Webpack则不是这样管理资源的，它是根据模块的 依赖关系 进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源.
通俗的说，Webpack就是需要通过其配置文件（webpack.config.js）中 entry 配置的一个入口文件（JS文件）,如下图
 entry: {
     app: __dirname + "/src/scripts/app.js",
}
然后Webpack进入该 app.js 文件进行解析.
解析过程中，发现一个 app.scss 文件，然后根据 webpack.config.js 配置文件中的 module.loaders 属性去查找处理 .scss 文件的loader进行处理，处理 app.scss 文件过程中，如果发现该文件还有其他依赖文件，则继续处理 app.scss 文件的依赖文件，直至处理完成该“链路”上的依赖文件，然后又遇到一个 Greeter.js 模块，于是像之前一样继续去查找对应的loader去处理…

所以，Webpack中对资源文件的处理是通过入口文件产生的依赖形成的，不会像Gulp那样，配置好路径后，该路径下所有规定的文件都会受影响。


5. 备注：Gulp对js文件的模块化工作是通过Webpack实现的，具体来说是通过安装 gulp-webpack 模块和相关的 loader 模块进行js模块化管理的。


#angular、vue、react三大框架模块管理遵循的规范

webpack打包成一个文件，一次都加载完，需要哪个就去执行哪个。不像传统的页面，引入很多文件，要一个个按顺序加载。
生成的都是闭包，变量隔离，并能避免污染作用域。

vue,angularx,react加载内部模块时遵循commonjs ---> 打包成一个文件了,并转成浏览器能执行的。
一般情况下，前端的采用require加载的都是遵循commonjs规范，例如angular、react、vue中的require某个模块和插件。采用回调函数加载的都是使用AMD规范，例如angularjs创建module时angular.module([], function() {})；很多外部模块的引入也是采用的AMD规范，因为要走网络请求。 
综上：这三个框架采用的规范和是不是node环境没有关系，加载内部模块方法采用require时，遵循commonjs规范；采用回调函数方式加载时，采用AMD规范。

------
#模块化方式

require是commonjs的模块化的方法，import是 es6的模块化方式，webpack的模块化，也是CommonJs规范。
require和requirejs不一样，require是es5语法，引入一个模块。requirejs是引入js文件，类似seajs，都是模块化工具。和直接引入文件比，好处在于不污染作用域中的对象。也可以管理依赖关系。
自己实现requirejs方法：可以用自执行的闭包实现。

require 用来加载代码，而 exports 和 module.exports 则用来导出代码。
module.exports 和exports区别：
module.exports 初始值为一个空对象 {}
exports 是指向的 module.exports 的引用
require() 返回的是 module.exports 而不是 exports


#js模块化的规范

amd 和 cmd 和 commonjs

amd --->requirejs
依赖前置。提前执行。但requirejs从2.0也可以延时执行。
定义模块的时候需要制定依赖模块，并以形参的方式引入factory中

cmd --->seajs
依赖就近。延时执行。按需加载，定义一个模块的时候不需要立即制定依赖模块，在需要的时候require就可以了。

commonjs --->nodejs
commonjs是服务器端模块化的规范。Nodejs采用了这个规范。
一个单独文件就是一个模块，每个模块都是一个单独的作用域。也就是说，在该模块内部定义的变量，无法被其它模块读取，除非定义为global对象的属性。
commonjs规范加载模块是同步的，只有加载完成，才能执行后面的操作。
AMD规范是异步加载，允许指定回调函数。由于nodejs主要用于服务端编程，模块文件一般都已经存在与本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以commonjs规范比较适用。
但是，如果是浏览器环境，要从服务器加载模块，就必须采用异步模式，因此浏览器端一般采用AMD规范。
