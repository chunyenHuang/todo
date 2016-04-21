var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casperJs = require('gulp-casperjs');

gulp.task('test', function() {
  return gulp.src('app.spec.js').pipe(mocha());
})

gulp.task('casper', function () {
  gulp.src('caspertesting.js')
    .pipe(casperJs());
});

gulp.task('test-routes', function () {
  return gulp.src('app.spec-route.js', {read: false})
             .pipe(mocha());
})

gulp.task('go', function () {
  nodemon({script: 'app.js'}).on('start', ['test', 'casper', 'test-routes']);
})
