const gulp = require('gulp')
const babel = require('gulp-babel')
const standard = require('gulp-standard')

gulp.task('default', ['standard'], () =>
  gulp.src('lib/**/*.js')
    .pipe(babel({
      presets: [
        'babel-preset-es2015',
        'babel-preset-react'
      ]
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('standard', () =>
  gulp.src(['lib/**/*.js', 'test/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
)
