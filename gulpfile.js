var gulp = require('gulp');
var karma = require('karma').server;
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

// Templates directory for build process
var templatesDirectory = path.join(rootDirectory, './templates');

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')

];

var templateFiles = [
  // Then add all of the Javascript template files
  path.join(templatesDirectory, '/**/*.js')
];

gulp.task('clean', function(cb) {
  rimraf('./dist', cb);
});

gulp.task('html2js', function(cb) {
  gulp.src('./templates/**/*.html')
    .pipe(plumber())
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      prefix: '/',
      moduleName: 'angularDeckster.templates'
    }))
    .pipe(concat('angular-deckster-tpls.js'))
    .pipe(gulp.dest('./templates')).on('end', function() {
        cb && cb();
    })
});

gulp.task('appHtml2js', function(cb) {
  gulp.src('./app/partials/**/*.html')
  .pipe(plumber())
  .pipe(minifyHtml({
    empty: true,
    spare: true,
    quotes: true
  }))
  .pipe(ngHtml2Js({
    prefix: '/',
    moduleName: 'decksterTestApp.templates'
  }))
  .pipe(concat('app-templates.js'))
  .pipe(gulp.dest('./app/scripts')).on('end', function() {
    cb && cb();
  })
});

gulp.task('sass', function () {
  sass(path.join(sourceDirectory, '/angular-deckster/styles/angularDeckster.scss'), { style: 'expanded' })
  .pipe(plumber())
  .on('error', function (err) {
    console.error('Error', err.message);
  })
  .pipe(rename('angular-deckster.css'))
  .pipe(gulp.dest('./dist'))
  .pipe(minifycss())
  .pipe(rename('angular-deckster.min.css'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['html2js', 'sass', 'clean'], function() {
  gulp.src(sourceFiles.concat(templateFiles))
    .pipe(plumber())
    .pipe(concat('angular-deckster.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('angular-deckster.min.js'))
    .pipe(gulp.dest('./dist'))
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint-src', 'test-src', 'build', done)
});

/**
 * Watch task
 */
gulp.task('watch', function () {
  // Watch JavaScript files
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch(sourceFiles, ['process-all']);
});

/**
 * Validate source JavaScript
 */

gulp.task('jshint-src', function () {
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', function () {
  runSequence('process-all', 'watch')
});
