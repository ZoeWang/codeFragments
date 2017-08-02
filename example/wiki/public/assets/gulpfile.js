var gulp = require('gulp'),
	os = require('os'),			//系统操作函数u
	gutil = require('gulp-util'),		//工具库
	less = require('gulp-less'),
	concat = require('gulp-concat'),		//文件合并插件
	gulpOpen = require('gulp-open'),
	uglify = require('gulp-uglify'),		//js 压缩
	cssmin = require('gulp-cssmin'),		//css 压缩
	md5 = require('gulp-md5-plus'),			//md5   加密
	fileinclude = require('gulp-file-include'),		//一个文件包含插件
	clean = require('gulp-clean'),				//清空文件夹
    spriter = require('gulp-css-spriter'),		//将css代码中的切片图片合并成雪碧图
    base64 = require('gulp-css-base64'),		//图片转换成Base64编码
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    connect = require('gulp-connect');			//运行网络服务器插件

 var host = {
 	path: 'dist/',
 	port: 3000,
 	html: 'index.html'
 };

// mac chrome: "Google chrome"
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

// 将图片拷贝到目标目录
gulp.task('copy:images', function(done) {
	gulp.src(['wiki2.0/images/**/*']).pipe(gulp.dest('dist/images')).on('end',done);
});

// 压缩合并css，css中既有自己写的.less,也有引入第三方库的.css
gulp.task('lessmin', function(done){
	gulp.src(['wiki2.0/less/*.less','wiki2.0/css/*.css'])
		.pipe(less())
		// 这里可以加css sprite 让每个css合并成为一个雪碧图
		.pipe(spriter({}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css/'))
		.on('end',done);
});

// 将js加入10位md5 ,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

// 将css 加上10位md5,并修改html中的引用路径,该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['wiki2.0/html/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/app'))
        .on('end', done);
        // .pipe(connect.reload());
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'lessmin'], function (done) {
    var timestamp = +new Date();
    gulp.src('dist/css/style.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch('wiki2.0/**/*', ['lessmin', 'build-js', 'fileinclude'])
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/app'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lessmin', 'build-js', 'watch', 'open']);