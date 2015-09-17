
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    usemin = require('gulp-usemin'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    exec = require('child_process').exec;

var path = {
  dist: 'dist',
  index: 'src/index.html',
  bower_fonts: 'src/bower_components/**/*.{ttf,woff,woff2,eof,svg}',
  styles: 'src/css/**/*.*',
  scripts: 'src/js/**/*.js',
  e2e: 'e2e/**/*.js',
  templates: 'src/html/**/*.html'
};

path.join = function join(basepath, path) {
    var _path = path + '';
    var basepath_ = basepath + '';

    if (basepath_.slice(-1) === '/') {
        basepath_ = basepath_.slice(0, basepath_.length - 1);
    };
    if (_path.slice(0, 1) === '/') {
        _path = _path.slice(1);
    };
    return basepath_ + '/' + _path;
}


gulp.task('index', function() {
    return gulp.src(path.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest(path.join(path.dist, '')));
});

gulp.task('copy-bower_fonts', function() {
    return gulp.src(path.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(path.join(path.dist,'lib')));
});

gulp.task('scripts', function() {
    return gulp.src([path.scripts])
        .pipe(concat('soddtree.js'))
        .pipe(gulp.dest(path.join(path.dist, 'js')));
});

gulp.task('templates', function() {
    return gulp.src(path.templates)
//        .pipe(minifyHTML())
        .pipe(gulp.dest(path.join(path.dist, 'html')));
});
  
/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([path.scripts], ['scripts']);
    gulp.watch([path.templates], ['templates']);
    gulp.watch([path.index], ['index']);
    gulp.watch([path.e2e], ['e2e']);
});


/**
 * E2E Test
 */
gulp.task('e2e', function() {
  exec('./node_modules/.bin/protractor', function(error, stdout, stderr) {
    console.log(stdout);
  });
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: path.dist,
        livereload: true,
        port: 8888
    });
});


gulp.task('livereload', function() {
    gulp.src([path.join(path.dist, '**/*.*')])
        .pipe(watch(path.join(path.dist, '**/*.*')))
        .pipe(connect.reload());
});


gulp.task('build', ['index', 'templates', 'scripts', 'copy-bower_fonts']);
gulp.task('default', ['build', 'webserver', 'livereload', 'e2e', 'watch']);