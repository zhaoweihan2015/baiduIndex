var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    livereload = require("gulp-livereload"),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    htmlmin = require('gulp-htmlmin'),
    stylus = require('gulp-stylus');
gulp.task('default', function() {    
    gutil.log(gutil.colors.red('hello'));    
    gutil.log(gutil.colors.green('hello'));
});
gulp.task("jsmin", function() {
    gulp.src("src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/*.html', function(event) {
        livereload.changed(event.path);
    });
})
gulp.task('diststylus', function() {
    return gulp.src('src/css/*.styl')
        .pipe(stylus({
            compress: true //是否压缩
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('srcstylus', function() {
    return gulp.src('src/css/*.styl')
        .pipe(stylus({
            compress: false
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('src/css'));
});
gulp.task('rev', function() {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src(["src/rev.json", "src/index.html"])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(process.cwd()));
});