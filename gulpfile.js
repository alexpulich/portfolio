var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    useref = require('gulp-useref');
    // gulpif = require('gulp-if'),
    // uglify = require('gulp-uglify'),
    // minifyCss = require('gulp-minify-css');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port: 8888
    });
    opn('http://localhost:8888')
});

gulp.task('start-builded', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
    opn('http://localhost:8888')
});

gulp.task('build', function () {
    var assets = useref.assets();
    
    return gulp.src('app/*.html')
        .pipe(assets)
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src('./app/css/*.css')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./app/js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/css/*.css'], ['css']);
    gulp.watch(['./app/js/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);
