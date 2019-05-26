const gulp = require('gulp');
const connect = require('gulp-connect');
const imgmin = require('gulp-imagemin');
const jsmin = require('gulp-uglify');
const cssmin = require('gulp-clean-css');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

//js文件类库插件的转存
gulp.task('changeLibSrc',() => {
    gulp.src('./src/js/lib/**/*')
    .pipe(gulp.dest('./dist/js/lib'))
})
gulp.task('changePlugSrc',() => {
    gulp.src('./src/js/plug/**/*')
    .pipe(gulp.dest('./dist/js/plug'))
})

//css文件的压缩合并以及转存

gulp.task('css',() => {
    gulp.src('./src/css/**/*.css')
    .pipe(concat('./all.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload())
})


//js文件的压缩合并以及转存
gulp.task('js',() => {
    gulp.src('./src/js/js/**/*.js')
    .pipe(concat('./public.js'))
    .pipe(jsmin())
    .pipe(gulp.dest('./dist/js/js'))
    .pipe(connect.reload())
})

//图片的压缩和转存
gulp.task('img',() => {
    gulp.src('./src/images/*')
    .pipe(imgmin())
    .pipe(gulp.dest('./dist/images'))
})
//配置服务
gulp.task('server',() => {
    connect.server({
        root : './',
        port : 8888,
        livereload : true
    })
})
//监听自动刷新
gulp.task('watchServer',() => {
    //封装gulp-watch
    function gulpWatch(src,gulpTast){
        return watch(src,() => {
            gulp.start(gulpTast);
        })
    }
    //监听执行的任务
    gulpWatch('./src/css/**/*.css','css')
    gulpWatch('./src/js/js/**/*.js','js')
    gulpWatch('./src/images/**/*','img')
    
})
//出口任务
gulp.task('default',['server','watchServer','changeLibSrc','changePlugSrc']);