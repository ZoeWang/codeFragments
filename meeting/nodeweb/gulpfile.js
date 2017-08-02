// 使用gulp-load-plugins加载所有package.json中的模块
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync');

//webpack react
var webpackConfig = require("./webpack.config.js");
var webpack = require('gulp-webpack');

//源文件
var scssPath = 'views/**/*.scss',  //scss路径
      jsPath = 'views/**/*.js',
      reactPath ='views/**/js/template/*.jsx',
      imagePath ='views/**/*.{jpg,png,gif}',
      htmlPath ='views/**/*.html';
//输出目录
var distPath= "../nodeserver/views/";
var diststaticPath= "../nodeserver/public/";

var nodewebPath= "./views/index/js/";




//定义一个转义scss的任务
gulp.task('scssTocss',function(){
   return gulp.src(scssPath)
        // 编译sass
        .pipe(plugins.scss())
        // 添加前缀
        .pipe(plugins.autoprefixer({browsers:['last 2 version', 'ie >= 9']}))
        // 输出未压缩css
        .pipe(gulp.dest(diststaticPath))
        // 给文件添加.min后缀
        .pipe(plugins.rename({suffix: '.min'}))
        //压缩css
        .pipe(plugins.minifyCss())
        // 输出未压缩css
        .pipe(gulp.dest(diststaticPath))

        // 任务完成提醒
        .pipe(plugins.notify({message: '报告大人:小的已经将 css 编译完成'}))

});

//react 

gulp.task("webpack", function() {
    return gulp.src(reactPath)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(nodewebPath))
    .pipe(plugins.notify({ message: '报告大人:小的已经将 react 编译完成' }));
});





//js
gulp.task('myscript',function(){
   return gulp.src(jsPath)
        //代码检测
       .pipe(plugins.jshint())
           //编译es6
       .pipe(plugins.babel({presets: ['es2015']}))
       // js代码合并
        // .pipe(plugins.concat('main.js'))
        //输出未压缩js
        .pipe(gulp.dest(diststaticPath))
        //给文件添加.min后缀
        .pipe(plugins.rename({ suffix: '.min' }))
        //压缩脚本文件
        .pipe(plugins.uglify())
        //输出压缩文件到指定目录
        .pipe(gulp.dest(diststaticPath))

        //提醒任务完成
        .pipe(plugins.notify({ message: '报告大人:小的已经将 js 编译完成' }));
});

// Images
gulp.task('myimages',function(){
     return gulp.src(imagePath)
        .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(diststaticPath))

        .pipe(plugins.notify({ message: '报告大人:小的已经将 imgaes 编译完成' }));
});
//html
gulp.task('myhtml',function(){
   return gulp.src(htmlPath)
        .pipe(gulp.dest(distPath))
        .pipe(plugins.notify({ message: '报告大人:小的已经将 html 编译完成' }));
});

//清理文件
gulp.task('clean',function(){
    return gulp.src([publicCss, publicJs, publicImage], {read: false})
        .pipe(plugins.clean());
});


//browser-sync 监听变化,样式比较好用
//gulp.task('browser-sync', function () {
//    var files = [
//        'src/**/*.html',
//        'src/static/css/**/*.css',
//        'src/static/image/**/*.{png,jpg,gif}',
//        'src/static/js/**/*.js'
//    ];
//
//    browserSync.init(files, {
//        server: {
//            baseDir: './src'
//        }
//    });
//});

//gulp.task('browser-sync', function() {//注册任务
//    browserSync({//调用API
//        files: "./src/**/*.*",//监听整个项目
//        server: {
//            baseDir: "./src" //监听当前路径
//        }
//    });
//});



gulp.task('default',['webpack'],function(){
    gulp.start('myhtml','scssTocss','myimages','myscript')
});


gulp.task('watch',function() {
    gulp.watch(reactPath, ['webpack']);
    gulp.watch(scssPath, ['scssTocss']);
    gulp.watch(jsPath, ['myscript']);
    gulp.watch(imagePath, ['myimages']);
    gulp.watch(htmlPath, ['myhtml']);

});