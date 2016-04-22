var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casperJs = require('gulp-casperjs');
var app = require('./app.js');
var server = '';

gulp.task('test', function() {
  return gulp.src('app.spec.js').pipe(mocha());
})

gulp.task('casper', ['test-routes'], function () {
  return gulp.src('caspertesting.js')
    .pipe(casperJs());
});

gulp.task('test-routes', function () {
  return gulp.src('app.spec-route.js', {read: false})
             .pipe(mocha());
})

gulp.task('go', function () {
  nodemon({script: 'app.js'}).on('start', ['test', 'casper', 'test-routes']);
})

gulp.task('travis', ['start', 'test-routes', 'casper', 'end'], function () {
  server.close();
});

gulp.task('start', function() {
  server = app.listen(1337);
})

gulp.task('end', ['casper'], function () {
  server.close();
})
