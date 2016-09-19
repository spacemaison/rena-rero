const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('default', () => {
  return gulp.src('lib/**/*.js')
    .pipe(babel({
	  presets: [
		'babel-preset-es2015',
		'babel-preset-react'
	  ]
	}))
    .pipe(gulp.dest('dist'))
})
