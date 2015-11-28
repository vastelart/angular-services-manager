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

//BUILD

gulp.task('build', ['templates'], function() {
    var assets = useref.assets();

    return gulp.src(['app/index.html', 'app/data.json', 'app/login.json'])
    .pipe(assets)
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src('app/templates/*')
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});