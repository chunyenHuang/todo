var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('test-routes', function () {
  return gulp.src('app.spec-route.js', {read: false})
             .pipe(mocha());
})

gulp.watch('app.js', ['go']);

gulp.task('test', function () {
  nodemon({script: 'app.js'}).on('start', ['test-routes']);
})
