// Require gulpfile configuration file
const conf = require('./config/.config.json');

// Require necessary packages for transpiling files
const babel = require('gulp-babel'),
      browserSync = require('browser-sync'),
      gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      bless = require('gulp-bless'),
      changed = require('gulp-changed'),
      concat = require('gulp-concat'),
      cssnano = require('gulp-cssnano'),
      ftp = require('vinyl-ftp'),
      gutil = require('gulp-util'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      runSequence = require('run-sequence'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      wait = require('gulp-wait'),
      watch = require('gulp-watch'),
      pump = require('pump');


gulp.task('css', () => {
  return gulp.src([conf.dev.css])
    .pipe(wait(200))
    .pipe(changed(conf.build.css, { extension: 'css' }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(bless())
    .pipe(cssnano())
    .pipe(gulp.dest(conf.destination + 'css'));
});



gulp.task('js', function (cb) {
  pump([
        gulp.src([conf.dev.js]),
        changed(conf.build.js, { extension: 'js' }),
        babel(),
        uglify(),
        gulp.dest(conf.destination + 'js')
    ],
    cb
  );
});

gulp.task('img', () => {
  return gulp.src([conf.dev.img])
    .pipe(imagemin())
    .pipe(gulp.dest(conf.destination + 'images'));
});

gulp.task('base', () => {
    return gulp.src(['assets/css/style.scss'])
    .pipe(wait(200))
    .pipe(changed(conf.build.css, { extension: 'css' }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(bless())
    .pipe(cssnano())
    .pipe(gulp.dest(conf.destination + 'css'));

});

gulp.task('fonts', () => {
  return gulp.src([conf.dev.fonts])
    .pipe(gulp.dest(conf.destination + 'fonts'));
});


gulp.task('html', () => {
  return gulp.src([conf.dev.html])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(conf.build.html));
});



gulp.task('watch', () => {
  var css = gulp.watch([conf.dev.cssAll], ['css']);
  var base = gulp.watch(['assets/css/style.scss'], ['base']);
  var js = gulp.watch([conf.dev.js], ['js']);
  var img = gulp.watch([conf.dev.img], ['img']);
  var html = gulp.watch([conf.dev.html], ['html']).on('change', browserSync.reload);
});

gulp.task('browser-sync', () => {
    browserSync.init([conf.destination], {
        proxy: conf.bs.proxy,
        browser: conf.bs.browser,
        port: conf.bs.port,
        injectChanges: true,
        notify: true,
        reloadOnRestart: true,
        reloadDebounce: 100
    });
});



// Group tasks
gulp.task('dev', ['base', 'css', 'js', 'img', 'fonts', 'html', 'watch',  'browser-sync']);
gulp.task('build', ['base', 'css', 'js', 'img','fonts','html', 'watch']);