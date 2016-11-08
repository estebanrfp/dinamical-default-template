var gulp = require('gulp')
var webserver = require('gulp-webserver')
var stylus = require('gulp-stylus')
var nib = require('nib')
var minifyCSS = require('gulp-minify-css')
var rename = require('gulp-rename')

var config = {
  styles: {
    main: './lib/styles.styl',
    watch: './lib/**/*.styl',
    output: './dist'
  },
  html: {
    watch: './build/*.html'
  }
}

gulp.task('server', function() {
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      livereload: true
    }))
})

gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(minifyCSS())
    .pipe(rename('template.min.css'))
    .pipe(gulp.dest(config.styles.output))
})

gulp.task('watch', function() {
  gulp.watch(config.styles.watch, ['build:css'])
  gulp.watch(config.html.watch, ['build'])
})

gulp.task('build', ['build:css'])
gulp.task('default', ['server', 'watch', 'build'])
