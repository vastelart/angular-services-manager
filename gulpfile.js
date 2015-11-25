var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css')
    clean = require('gulp-clean'),
    //imagemin = require('gulp-imagemin'),
    //imageminJpegtran = require('imagemin-jpegtran'),
	ngAnnotate = require('gulp-ng-annotate'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync').create();

//SERVER

gulp.task('serve', ['php-serve'], function () {
    browserSync.init({
        proxy: '127.0.0.1:9000',
        port: 9090,
        open: true,
        notify: false,
    });

    gulp.watch('app/**/*.html').on('change', browserSync.reload);
});

gulp.task('php-serve', function() {
    php.server({
        base: 'app',
        port: 9000,
        keepalive: true
    });
});