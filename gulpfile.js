var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var server = require('gulp-server-livereload');

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      port: 8000,
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['sass','webserver'], function() {
  gulp.watch(['app/scss/**/*.scss'], ['sass']);
});
