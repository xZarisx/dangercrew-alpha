var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync')

gulp.task('sass', function () {
    return gulp.src('./src/_scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('s', function() {
    browserSync({
        server: {
            baseDir: "dist"
        },
        port:3002,
        files: ["*/**.css"],
        ghostMode: false
    });
});
gulp.task('sync-assets', function() {
    browserSync({
        proxy: "localhost:8080",
        port:3003,
        files: ['**/*.js', '**/*.css'],
        ghostMode: false
    });
});


gulp.task('sass:watch', function () {
    gulp.watch('./src/_scss/**/*.scss', ['sass']);
});
gulp.task('default', ['sass','sass:watch']);