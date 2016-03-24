var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace')
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

gulp.task('scripts', function() {
    gulp.src(['./src/*.js', './src/components/**/*.js', './src/services/**/*.js', './src/shared/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('combine', function() {
  return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(rev())
    .pipe(revReplace())
    .pipe(gulp.dest('dist'));
});

gulp.task('components', function () {
  return gulp.src(['./src/components/**/*.html'])
    .pipe(gulp.dest('dist/src/components'));
});

gulp.task('rename', ['combine'], function() {
  return gulp.src('dist/index-*.html')
    .pipe(rename('dist/index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('fixindex', ['rename'], function() {
  return gulp.src('dist/index-*.html', {read: false})
    .pipe(clean({force: true}));
});


gulp.task('build', ['combine', 'components', 'rename', 'fixindex']);
